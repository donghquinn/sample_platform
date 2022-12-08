import { Mysql } from 'libraries/database';
import { selectToken } from 'queries/users/client.sql';
import { DefaultCtx } from 'types/request.types';
import { ClientInfo } from 'types/users/client.type';
import { Logger } from 'utils';
import { setErrorResponse, setResponse } from 'utils/response.utils';
import { signinValidator } from 'validator/signin.validator';

// body에 담긴 패스워드는 프론트단에서 인코딩 시켜 요청
export async function signinController(ctx: DefaultCtx) {
  try {
    // clientKey === clientid
    const { email, password } = await signinValidator.validateAsync(ctx.request.body);

    Logger.info('[USER_SIGNIN] Start Search User info...');

    const result = await Mysql.query<ClientInfo>(selectToken, [email, password]);

    Logger.info('[USER_SIGNIN] Found User Info');

    if (!result) {
      setErrorResponse(ctx, 400, 'Login Failed');
    }

    Logger.info('[USER_SIGNIN] Login Success');

    const { token, clientid } = result;

    // 회원 정보 조회 성공 시 토큰과 클라이언트 아이디 값을 리턴
    setResponse(ctx, 200, { token, clientid });
  } catch (error) {
    setErrorResponse(ctx, 500, JSON.stringify(error));
  }
}
