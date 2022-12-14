import { createHash } from 'crypto';
import { Context } from 'koa';
import { Mysql } from 'libraries/database';
import { selectToken } from 'queries/users/client.sql';
import { SignInQuery } from 'types/users/client.type';
import { Logger } from 'utils';
import { setErrorResponse, setResponse } from 'utils/response.utils';
import { signinValidator } from 'validator/signin.validator';

// body에 담긴 패스워드는 프론트단에서 인코딩 시켜 요청
export async function signinController(ctx: Context) {
  try {
    // clientKey === clientid
    Logger.info('[USER_SIGNIN] Got Request. Validate start');

    Logger.info('[USERSIGNIN] Body: %o', ctx.request.body);

    const { data } = await signinValidator.validateAsync(ctx.request.body);

    const parsedEmail = data.email;
    const parsedPassword = data.password;

    Logger.info('[USER_SIGNIN] Start Search User info...');

    const encodedPassword = createHash('sha256').update(parsedPassword).digest('hex');

    Logger.info('[USER_SIGNIN] Password Cryptorize Finished');

    const [result] = await Mysql.query<SignInQuery[]>(selectToken, [parsedEmail, encodedPassword]);

    const { token: queryToken, clientid: queryClientId } = result;

    Logger.info('[USER_SIGNIN] Found Mathcing Data');

    if (!queryToken || !queryClientId) {
      setErrorResponse(ctx, 400, 'Login Failed');
    }

    Logger.info('[USER_SIGNIN] Found User Info');

    Logger.info('[USER_SIGNIN] Login Success');

    // const { token, clientid } = result;

    // 회원 정보 조회 성공 시 토큰과 클라이언트 아이디 값을 리턴
    setResponse(ctx, 200, { queryToken, queryClientId });
  } catch (error) {
    setErrorResponse(ctx, 500, JSON.stringify(error));
  }
}
