import jwt from 'jsonwebtoken';
import { createToken } from 'libraries/createToken.lib';
import { createUser } from 'libraries/users/create-user.lib';
import { AdminCtx } from 'types/users/admin/admin.type';
import { Logger } from 'utils';
import { setErrorResponse, setResponse } from 'utils/response.utils';
import { adminRequestValidator } from 'validator/admin.validator';

// admin 회원가입 요청
export async function adminController(ctx: AdminCtx) {
  try {
    Logger.info('[REGISTER] Got Request. Validate Start');

    Logger.info('REGISTER ctx data: %o', ctx.request.body);

    // validate의 데이터 값은 문자열
    const { data } = await adminRequestValidator.validateAsync(ctx.request.body);

    const { email, password, gender, birth, isAdmin } = data;

    Logger.info('[REGISTER] Create Token Start...');

    const { uuid, hash, clientKey, secretKey } = createToken();

    Logger.info('[REGISTER] Token Created');

    const payload = { uuid, hash, clientKey };

    Logger.info('[REGISTER] Create JWT Start...');

    // 토큰 생성
    const token = jwt.sign(payload, String(secretKey));

    Logger.info('[REGISTER] JWT Created');

    // 유저 계정 생성
    await createUser(email, password, token, clientKey, gender, birth, isAdmin);

    setResponse(ctx, 200, 'SignUp Success');
  } catch (error) {
    setErrorResponse(ctx, 500, JSON.stringify(error));
  }
}
