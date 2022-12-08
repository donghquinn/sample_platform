import { MysqlError } from 'error';
import { Mysql } from 'libraries/database';
import { searchTotalUserCount } from 'queries/users/admin/admin-request.sql';
import { UserCounts } from 'types/users/admin/admin.type';

// 전체 유저 수 조회
export async function searchUserCount() {
  try {
    const { count } = await Mysql.query<UserCounts>(searchTotalUserCount);

    return count;
  } catch (error) {
    if (error instanceof MysqlError) {
      throw new MysqlError('USER_COUNT]', 'MYSQL ERROR', error.message);
    }

    if (error instanceof Error) {
      throw new MysqlError('[USER_COUNT]', 'NOT MYSQL ERROR', error.message);
    }

    throw new MysqlError('[USER_COUNT]', 'UNHANDABLE ERROR', JSON.stringify(error));
  }
}
