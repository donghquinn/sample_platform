import { AuthError } from 'error';
import { Next } from 'koa';
import { getClientKey } from 'libraries';
import { DefaultCtx } from 'types/request.types';
import { Logger } from 'utils';
import { setErrorResponse } from 'utils/response.utils';

// API 응답 헤더 유효성 검증
export async function headerAuth(ctx: DefaultCtx, next: Next) {
  try {
    const headerKey = ctx.request.header?.key;

    if (!headerKey) {
      throw new AuthError('KEY AUTH ERROR', 'No Key Included in Header');
    }

    if (typeof headerKey !== 'string') {
      throw new AuthError('KEY AUTH ERROR', 'Given Auth Key Type Is Not String');
    }

    // const {client_id: clientId} = ctx;
    const { clientid } = ctx;

    if (!clientid) {
      throw new AuthError('CTX PARAMETER ERROR', 'NO PARAMETER DETECTED');
    }

    const key = await getClientKey(clientid);

    if (headerKey.toLowerCase() !== key.toLowerCase()) {
      throw new AuthError('KEY AUTH ERROR', 'Key Does Not Match');
    }

    Logger.info('[RESULT_ROUTER] User Key Identified');

    // eslint-disable-next-line @typescript-eslint/return-await
    return next();
  } catch (error) {
    if (error instanceof AuthError) {
      return setErrorResponse(ctx, 500, 'AUTH ERROR ON MIDDLE WARE');
    }

    // 나머진 핸들링 불가 에러
    Logger.error('Unknown error while authentication: %o', error);

    return setErrorResponse(ctx, 500, `Unknown KEY Authentication Error`);
  }
}
