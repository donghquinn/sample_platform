import jwt from 'jsonwebtoken';
import { createToken } from 'libraries/createToken.lib';
import { createUser } from 'libraries/users/create-user.lib';
import { DefaultCtx } from 'types/request.types';
import { setErrorResponse, setResponse } from 'utils/response.utils';
import { adminRequestValidator } from 'validator/admin.validator';

// admin 회원가입 요청
export async function adminController(ctx: DefaultCtx) {
  try {
    const { email, password, isAdmin, gender, birth } = await adminRequestValidator.validateAsync(ctx.request.body);

    const { uuid, hash, clientKey, secretKey } = createToken();

    const payload = { uuid, hash, clientKey };

    const token = jwt.sign(payload, String(secretKey));

    // 유저 계정 생성
    await createUser(email, password, token, clientKey, gender, birth, isAdmin);

    setResponse(ctx, 200, 'SignUp Success');
  } catch (error) {
    setErrorResponse(ctx, 500, JSON.stringify(error));
  }
}
