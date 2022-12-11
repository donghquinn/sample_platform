import { createHash } from 'crypto';
import { Context } from 'koa';
import { Mysql } from 'libraries/database';
import { selectToken } from 'queries/users/client.sql';
import { ClientInfo } from 'types/users/client.type';
import { Logger } from 'utils';
import { setErrorResponse, setResponse } from 'utils/response.utils';
import { signinValidator } from 'validator/signin.validator';

// body에 담긴 패스워드는 프론트단에서 인코딩 시켜 요청
export async function signinController(ctx: Context) {
  try {
    // clientKey === clientid
    Logger.info('[USER_SIGNIN] Got Request. Validate start');

    Logger.info('[USERSIGNIN] Body: %o', ctx.request.body);
    // const parsed = String(ctx.request.body);

    // const requestedEmail = parsed.split('&')[0];
    // const requestedPassword = parsed.split('&')[1];

    // const requestedData = {
    //   email: requestedEmail.split('=')[1],
    //   password: requestedPassword.split('=')[1],
    // };

    // Logger.info('[USER_SIGNIN] Requested Data: %o', requestedData);

    const { data } = await signinValidator.validateAsync(ctx.request.body);

    const parsedEmail = data.email;
    const parsedPassword = data.password;

    Logger.info('[USER_SIGNIN] Start Search User info...');

    const encodedPassword = createHash('sha256').update(parsedPassword).digest('hex');

    Logger.info('[USER_SIGNIN] encoded Password: %o', encodedPassword);

    const result = await Mysql.query<ClientInfo>(selectToken, [parsedEmail, encodedPassword]);

    Logger.info('[USER_SIGNIN] queried data: %o', { email: result.email, password: result.password });

    if (!result) {
      setErrorResponse(ctx, 400, 'Login Failed');
    }

    Logger.info('[USER_SIGNIN] Found User Info');

    Logger.info('[USER_SIGNIN] Login Success');

    const { token, clientid } = result;

    // 회원 정보 조회 성공 시 토큰과 클라이언트 아이디 값을 리턴
    setResponse(ctx, 200, { token, clientid });
  } catch (error) {
    setErrorResponse(ctx, 500, JSON.stringify(error));
  }
}
