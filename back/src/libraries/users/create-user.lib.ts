import { MysqlError } from 'error';
import { Mysql } from 'libraries/database';
import { insertAdminUser } from 'queries/users/admin/admin-request.sql';
import { Logger } from 'utils';

// 유저 생성 라이브러리
export async function createUser(
  email: string,
  password: string,
  token: string,
  clientKey: number,
  gender: string,
  birth: string,
  isAdmin: string,
) {
  try {
    Logger.info('[USER_CREATE] Craete User Start...');

    await Mysql.query(insertAdminUser, [email, password, token, clientKey, gender, birth, isAdmin]);

    Logger.info('[USER_CREATE] Create User Success');
  } catch (error) {
    if (error instanceof MysqlError) {
      throw new MysqlError('[MANAGE]', 'MYSQL ERROR', error.message);
    }

    if (error instanceof Error) {
      throw new MysqlError('[MANAGE]', 'NOT MYSQL ERROR', error.message);
    }

    throw new MysqlError('[MANAGE]', 'UNHANDABLE ERROR', JSON.stringify(error));
  }
}
