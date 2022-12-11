import { AuthError, MysqlError } from 'error';
import { Context } from 'koa';
import { Logger } from 'utils';
import { setErrorResponse, setResponse } from 'utils/response.utils';
import { defaultRequestValidator } from 'validator/default-request.validator';
import { emotionalOtherTypeCal } from '../libraries/calculate';
import { getClientKey } from '../libraries/common';

// 입맛 외 요소 라우터 첫 단계
export async function otherResult(ctx: Context) {
  try {
    const headerKey = ctx.request.headers?.key;

    if (!headerKey) {
      throw new AuthError('KEY AUTH ERROR', 'No Key Included in Header');
    }

    Logger.info('[OTHER_RESULT_ERROR] Found key from Request headers : %o', headerKey);

    // if (typeof headerKey !== 'string') {
    //   throw new AuthError('KEY AUTH ERROR', 'Given Auth Key Type Is Not String');
    // }

    Logger.info('[OTHER_RESULT] Validate ctx parameters');

    const { clientid } = await defaultRequestValidator.validateAsync(ctx.request.query);

    Logger.info(`[OTHER_RESULT] Validate Complete: ${clientid}. Query Key from DataBase`);

    const key = await getClientKey(clientid);

    if (headerKey !== key) {
      setErrorResponse(ctx, 500, '[OTHER_RESULT] Header Key Is Not Match With Client Key');
    }

    Logger.info('[OTHER_RESULT] Key match with headerKey.');

    const result = await emotionalOtherTypeCal(clientid);

    setResponse(ctx, 200, { result });
  } catch (error) {
    if (error instanceof MysqlError) {
      setErrorResponse(ctx, 500, error.message);
    }

    setErrorResponse(ctx, 500, '[OTHER_RESULT_ERROR]');
  }
}
