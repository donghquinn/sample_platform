import { MysqlError } from 'error';
import { queryKey } from 'queries/query-score';
import { QueryKey } from 'types/query';
import { Logger } from 'utils';
import { Mysql } from '../database';

export async function getClientKey(clientid: string) {
  try {
    Logger.info('[QUERY] Searching Client key by Client Id...');

    const keyArray = await Mysql.query<QueryKey[]>(queryKey, [clientid]);

    const result = keyArray.find((item) => item.key);

    if (!result || result.key === undefined) {
      Logger.info('[Query] Key Found Error: %o', result?.key);

      throw new MysqlError('[QUERY]', 'Not Mysql Error', 'Could Not Found Client Key');
    }

    Logger.info('[QUERY] Got Client Key: %o', result.key);

    return result.key;
  } catch (error) {
    if (error instanceof MysqlError) {
      throw new MysqlError('[QUERY]', 'MYSQL ERROR', error.message);
    }

    if (error instanceof Error) {
      throw new MysqlError('[QUERY]', 'NOT MYSQL ERROR', error.message);
    }

    throw new MysqlError('[QUERY]', 'UNHANDABLE ERROR', JSON.stringify(error));
  }
}
