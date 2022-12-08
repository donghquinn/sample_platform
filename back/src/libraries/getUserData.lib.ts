import { MysqlError } from 'error';
import { selectUserTokenAndClientKey } from 'queries/users/signin.sql';
import { Mysql } from './database';

export async function getUserInfo(clientid: string) {
  try {
    const userQueryResult = await Mysql.query(selectUserTokenAndClientKey, [clientid]);

    return;
  } catch (error) {
    if (error instanceof MysqlError) {
      throw new MysqlError('[USER_INFO]', 'MYSQL ERROR', error.message);
    }

    if (error instanceof Error) {
      throw new MysqlError('[USER_INFO]', 'NOT MYSQL ERROR', error.message);
    }

    throw new MysqlError('[USER_INFO]', 'UNHANDABLE ERROR', JSON.stringify(error));
  }
}
