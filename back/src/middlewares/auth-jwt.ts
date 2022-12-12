import { createHash } from 'crypto';
import { AuthError } from 'error';
import Jwt from 'jsonwebtoken';
import { Next } from 'koa';
import { Mysql } from 'libraries/database/mysql.lib';
import qs from 'qs';
import { findToken } from 'queries/users/client.sql';
import { AuthByJwtContext, AuthByJwtPayload } from 'types/request.types';
import { ClientInfo } from 'types/users/client.type';
import { Logger } from 'utils';
import { parseErrorMessage } from 'utils/error.util';
import { verifyAsync } from 'utils/jwt.util';
import { setErrorResponse } from 'utils/response.utils';
import { canSplit } from 'utils/string.util';
import { validate } from 'uuid';

// 요청 헤더에 담긴 JWT 를 이용해 유저 인증
export default async function authByJwt(ctx: AuthByJwtContext, next: Next) {
  const authHeader = ctx.headers?.authorization;
  const clientId = ctx.headers?.clientid;

  const token = canSplit(authHeader, 'Bearer ') ? authHeader?.split('Bearer ')[1] : '';

  try {
    // 토큰 자체가 있는지 먼저 체크
    if (!token) throw new AuthError('AUTH_NO_JWT_TOKEN_PROVIDED_ERROR', 'No auth token inside header.');

    if (!clientId) throw new AuthError('AUTH_NO_CLIENT_ID_PROVIDED_ERROR', 'No Client Id inside header.');

    const { uuid, hash, id } = Jwt.decode(token) as Partial<AuthByJwtPayload>;
    const { request } = ctx;

    Logger.debug('[authByJwt] %o', { header: request.header, body: request.body, uuid, hash, id });

    // 토큰 내용 검증: id는 clientkey === clientid === id
    if (!uuid || !hash || !id) throw new AuthError('AUTH_PAYLOAD_INSUFFICIENT_ERROR', 'Insufficient token payload.');
    if (!validate(uuid)) throw new AuthError('AUTH_INCOMPATIBLE_UUID_FORMAT_ERROR', 'Incompatible uuid format.');

    if (clientId !== id) {
      throw new AuthError('AUTH_CLIENT_KEY_ERROR', 'Client Id does not match with client key');
    }

    // DB에서 token 항목 조회
    const clientInfo = await Mysql.query<ClientInfo[]>(findToken, [id]);

    Logger.debug('clientInfo: %o', { clientInfo });

    if (clientInfo.length === 0)
      throw new AuthError('AUTH_CLIENT_ID_CERT_KEY_NOT_FOUND_ERROR', 'Auth token not found. ');

    // 활성화 된 클라이언트가 아니면(is_enabled = 0) 에러 던지기
    if (!clientInfo[0].isAdmin) throw new AuthError('AUTH_NOT_ALLOWED_TOKEN_OR_KEY_ERROR', 'Auth token is disabled.');

    try {
      Logger.debug('JWT detail: %o', Jwt.decode(token));

      // JWT verify 에러 발생 시 에러 코드 일원화
      await verifyAsync(token, clientInfo[0].token);
    } catch (error) {
      const message = parseErrorMessage(error);

      Logger.error('JWT verify error %o', { error });

      throw new AuthError('AUTH_JWT_AUTH_FAILED_ERROR', message);
    }

    Logger.debug('JWT verified');

    // clientId 와 uuid 를 다음 미들웨어에서 사용할 수 있도록 주입
    ctx.clientId = Number(id);
    ctx.uuid = uuid;

    // 해시 비교를 위한 베이스 생성
    const bodyHashBase = createHash('sha512');
    const queryHashBase = createHash('sha512');

    Logger.debug('Created hashbase');

    // 해시 업데이트
    // body와 queryString이 비어있을 경우, 같은 값을 생성함
    // 하지만 JWT payload의 uuid 값이 매번 달라지는것으로 체크를 대신할 수 있으므로 보안상 문제는 없음
    const queryString = ctx.querystring;
    const bodyString = qs.stringify(request.body);

    const queryHash = queryHashBase.update(queryString, 'utf-8').digest('hex');
    const bodyHash = bodyHashBase.update(bodyString, 'utf-8').digest('hex');

    const isQueryVerified = queryHash === hash;
    const isBodyVerified = bodyHash === hash;

    Logger.debug('[authByJwt]');
    Logger.debug('bodyString : %o', bodyString);
    Logger.debug('queryString : %o', queryString);
    Logger.debug('isQueryVerified : %o', isQueryVerified);
    Logger.debug('isBodyVerified : %o', isBodyVerified);
    Logger.debug('queryHash : %o', queryHash);
    Logger.debug('bodyHash : %o', bodyHash);

    // bodyString과 queryString이 존재하지 않을 경우 jwt verify 여부만 체크
    if (!bodyString && !queryString) {
      Logger.debug('no body no qs');
      // eslint-disable-next-line @typescript-eslint/return-await
      return next();
    }

    // queryString이 존재할 경우 queryHash 체크
    if (!bodyString && queryString && isQueryVerified) {
      Logger.debug('no body yes qs qs confirmed');
      // eslint-disable-next-line @typescript-eslint/return-await
      return next();
    }

    // bodyString이 존재할 경우 bodyHash 체크
    if (bodyString && !queryString && isBodyVerified) {
      Logger.debug('yes body no qs body confirmed');
      // eslint-disable-next-line @typescript-eslint/return-await
      return next();
    }

    // queryHash, bodyHash 둘 다 맞지 않는 경우 데이터 오염
    throw new AuthError('AUTH_HASH_MALFORMED_ERROR', 'BodyHash or queryHash malformed');
  } catch (error) {
    // 핸들링된 인증 에러
    if (error instanceof AuthError) return setErrorResponse(ctx, 500, [error.type, error.message]);

    // 나머지 핸들링 불가 에러
    Logger.error('Unknown error while authentication: %o', error);

    return setErrorResponse(ctx, 500, 'Unknown JWT Authentication Error.');
  }
}
