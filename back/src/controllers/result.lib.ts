import { AuthError, MysqlError } from 'error';
import { getClientKey } from 'libraries';
import { DefaultCtx } from 'types/request.types';
import { Logger } from 'utils';
import { setErrorResponse, setResponse } from 'utils/response.utils';
import { defaultRequestValidator } from 'validator/default-request.validator';
import { calculateType } from '../libraries/calculate/result/type-calculate.lib';

// 입맛 유형 라우터 타고 들어와 제일 처음 마주하는 곳
export async function firstResult(ctx: DefaultCtx) {
  try {
    const headerKey = ctx.request.headers?.key;

    if (!headerKey) {
      throw new AuthError('KEY AUTH ERROR', 'No Key Included in Header');
    }

    Logger.info('[RESULT_ROUTER] Found key from Request headers: %o', headerKey);

    // if (typeof headerKey !== 'string') {
    //   throw new AuthError('KEY AUTH ERROR', 'Given Auth Key Type Is Not String');
    // }

    Logger.info('[RESULT_ROUTER] Validate ctx parameters');

    const { clientid } = await defaultRequestValidator.validateAsync(ctx.request.query);

    Logger.info(`[RESULT_ROUTER] Validate Complete: ${clientid}. Query Key from DataBase`);

    const key = await getClientKey(clientid);

    if (headerKey !== key) {
      setErrorResponse(ctx, 500, 'Header Key Is Not Match With Client Key');
    }

    const result = await calculateType(clientid);

    setResponse(ctx, 200, { result });
  } catch (error) {
    if (error instanceof MysqlError) {
      setErrorResponse(ctx, 500, error.message);
    }

    setErrorResponse(ctx, 500, '[RESULT_ROUTER] Error Occured');
  }
}
