import { searchUserCount } from 'libraries/users/user-count.lib';
import { DefaultCtx } from 'types/request.types';
import { Logger } from 'utils';
import { setErrorResponse, setResponse } from 'utils/response.utils';

export async function searchTotalUsers(ctx: DefaultCtx) {
  try {
    const count = await searchUserCount();

    Logger.info('[USER_COUNT] Total Count: %o', count);

    setResponse(ctx, 200, count);
  } catch (error) {
    setErrorResponse(ctx, 500, JSON.stringify(error));
  }
}
