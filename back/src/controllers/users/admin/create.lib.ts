import jwt from 'jsonwebtoken';
import { Context } from 'koa';
import { createToken } from 'libraries/createToken.lib';
import { createUser } from 'libraries/users/create-user.lib';
import { Logger } from 'utils';
import { setErrorResponse, setResponse } from 'utils/response.utils';
import { adminRequestValidator } from 'validator/admin.validator';

// admin 회원가입 요청
export async function adminController(ctx: Context) {
  try {
    Logger.info('[REGISTER] Got Request. Validate Start');

    // const requestBody = String(ctx.request.body);

    // const requestedEmail = requestBody.split('&')[0];
    // const requestPassword = requestBody.split('&')[1];
    // const requestGender = requestBody.split('&')[2];
    // const requestBirth = requestBody.split('&')[3];

    // const parsed = {
    //   email: requestedEmail.split('=')[1],
    //   password: requestPassword.split('=')[1],
    //   gender: requestGender.split('=')[1],
    //   birth: requestBirth.split('=')[1],
    // };

    // Logger.info('[REGISTER] Got Request: %o', parsed);

    // Logger.info('[REGISTER] validate start');

    const { email, password, isAdmin, gender, birth } = await adminRequestValidator.validateAsync(ctx.request.body);

    const { uuid, hash, clientKey, secretKey } = createToken();

    Logger.info('[REGISTER] Got Request ClientId: %o', clientKey);

    const payload = { uuid, hash, clientKey };

    const token = jwt.sign(payload, String(secretKey));

    // 유저 계정 생성
    await createUser(email, password, token, clientKey, gender, birth, isAdmin);

    setResponse(ctx, 200, 'SignUp Success');
  } catch (error) {
    setErrorResponse(ctx, 500, JSON.stringify(error));
  }
}
