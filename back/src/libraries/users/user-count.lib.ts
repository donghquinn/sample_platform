import { MysqlError } from 'error';
import { Mysql } from 'libraries/database';
import { searchTotalUserCount } from 'queries/users/admin/admin-request.sql';
import { UserCounts } from 'types/users/admin/admin.type';
import { Logger } from 'utils';

// 전체 유저 수 조회
export async function searchUserCount() {
  try {
    Logger.info('[USER_COUNT] Get Count');

    const [totalCount] = await Mysql.query<UserCounts[]>(searchTotalUserCount);

    const { count } = totalCount;

    Logger.info('[USER_COUNT] Got Total Count: %o', count);

    return count;
  } catch (error) {
    if (error instanceof MysqlError) {
      throw new MysqlError('[USER_COUNT]', 'MYSQL ERROR', error.message);
    }

    if (error instanceof Error) {
      throw new MysqlError('[USER_COUNT]', 'NOT MYSQL ERROR', error.message);
    }

    throw new MysqlError('[USER_COUNT]', 'UNHANDABLE ERROR', JSON.stringify(error));
  }
}
