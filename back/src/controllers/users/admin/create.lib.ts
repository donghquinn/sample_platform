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
    // const parsedEmail = data.split('&')[0];

    // const parsedPassword = data.split('&')[1];

    // const parsedGender = data.split('&')[2];

    // const parsedBirth = data.split('&')[3];

    // const parsedAdmin = data.split('&')[4];

    // // 파싱한 데이터
    // const parsedData = {
    //   email: parsedEmail.split('=')[1],
    //   password: parsedPassword.split('=')[1],
    //   gender: parsedGender.split('=')[1],
    //   birth: parsedBirth.split('=')[1],
    //   isAdmin: parsedAdmin.split('=')[1],
    // };

    const { uuid, hash, clientKey, secretKey } = createToken();

    const payload = { uuid, hash, clientKey };

    // 토큰 생성
    const token = jwt.sign(payload, String(secretKey));

    // 유저 계정 생성
    await createUser(email, password, token, clientKey, gender, birth, isAdmin);

    setResponse(ctx, 200, 'SignUp Success');
  } catch (error) {
    setErrorResponse(ctx, 500, JSON.stringify(error));
  }
}
