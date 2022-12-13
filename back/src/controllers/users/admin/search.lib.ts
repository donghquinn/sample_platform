import { AuthError, MysqlError } from 'error';
import { Mysql } from 'libraries';
import { searchUserCount } from 'libraries/users/user-count.lib';
import { selectClientIdByToken } from 'queries/users/client.sql';
import { AdminCtx } from 'types/users/admin/admin.type';
import { TokenAuthorize } from 'types/users/client.type';
import { Logger } from 'utils';
import { setErrorResponse, setResponse } from 'utils/response.utils';

export async function searchTotalUsers(ctx: AdminCtx) {
  Logger.info('[GET COUNt] Found Count Request');

  try {
    const token = ctx.headers?.authorization;
    const clientKey = ctx.headers?.clientid;

    // const token = canSplit(authHeader, 'Bearer ') ? authHeader?.split('Bearer ')[1] : '';

    if (!token) {
      throw new AuthError('[GET COUNT]', 'No Token Provided');
    }

    Logger.info('[GET COUNT] Got ClientId: %o', clientKey);
    Logger.info('[GET COUNT] Got token: %o', token);

    const [client] = await Mysql.query<TokenAuthorize[]>(selectClientIdByToken, [token]);

    const { clientid } = client;

    Logger.info('[GET COUNT] Found ClientId: %o', clientid);

    if (clientid === undefined || !clientid) {
      throw new MysqlError('[GET COUNT]', 'MYSQL ERROR', 'No Match ClientKey Found');
    }

    if (clientKey !== clientid) {
      throw new AuthError('[GET COUNT]', 'Header ClientId does not match with queried clientKey');
    }

    const count = await searchUserCount();

    // Logger.info('[USER_COUNT] Total Count: %o', count);

    setResponse(ctx, 200, count);
  } catch (error) {
    setErrorResponse(ctx, 500, JSON.stringify(error));
  }
}
