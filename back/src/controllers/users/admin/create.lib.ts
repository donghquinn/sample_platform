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

    Logger.info('REGISTER ctx: %o', ctx);

    const requestBody = ctx.request.body;

    Logger.info('[REGISTER] body: %o', requestBody);

    // const requestedEmail = requestBody.split('&')[0];

    // Logger.info('[REGISTER] eamil: %o', requestedEmail);

    // const requestPassword = requestBody.split('&')[1];

    // Logger.info('[REGISTER] password: %o', requestPassword);

    // const requestGender = requestBody.split('&')[2];

    // Logger.info('[REGISTER] gender: %o', requestGender);

    // const requestBirth = requestBody.split('&')[3];

    // Logger.info('[REGISTER] birth: %o', requestBirth);

    // const parsed = {
    //   email: requestedEmail.split('=')[1],
    //   password: requestPassword.split('=')[1],
    //   gender: requestGender.split('=')[1],
    //   birth: requestBirth.split('=')[1],
    // };

    // Logger.info('[REGISTER] Got Request: %o', parsed);

    // Logger.info('[REGISTER] validate start');

    const { email, password, isAdmin, gender, birth } = await adminRequestValidator.validateAsync(requestBody);
    Logger.info('[REGISTER] datas: %o', { email, password, gender, birth });
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
