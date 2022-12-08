import { MysqlError } from 'error';
import { isMysqlError } from 'guard/database.guard';
import Joi from 'joi';
import { DefaultCtx, StatusCode } from 'types/request.types';
import { Logger } from './logger.utils';

export function setResponse(ctx: DefaultCtx, status: StatusCode, data?: unknown) {
  ctx.status = 200;

  const body = {
    resCode: status.toString(),
    dataRes: data ?? null,
    errMsg: [],
  };

  ctx.body = body;

  Logger.info('[Response] %o', body);
}

// 500: 에러 발생
// 400: 로그인 실패
export function setErrorResponse(ctx: DefaultCtx, errorStatus: StatusCode, errorData: string | string[]) {
  ctx.status = 500 || 400;

  const errors: string[] = [];

  if (typeof errorData === 'string') errors.push(errorData);
  else errors.push(...errorData);

  ctx.body = {
    resCode: errorStatus.toString(),
    data: null,
    errMsg: errors,
  };
}

export function handleApi(error: unknown, ctx: DefaultCtx) {
  const messages = [];

  if (error instanceof MysqlError) {
    messages.push(error.type);
    messages.push(error.message);
  }

  if (error instanceof Joi.ValidationError) {
    messages.push(...error.details.map((item) => item.message));

    return setErrorResponse(ctx, 500, messages);
  }

  if (isMysqlError(error)) {
    messages.push('Internal Database Error');
    Logger.error('%o', { error });

    return setErrorResponse(ctx, 500, messages);
  }

  if (error instanceof Error) {
    // vault key 찾을 수 없는 경우
    if (error.message === 'Requested address not in vault') {
      messages.push(error.message);
      Logger.error('Error requested address not in vault');

      return setErrorResponse(ctx, 500, messages);
    }

    // 핸들링하지 않았지만 Error instance 일 경우
    messages.push(error.message);
    Logger.error('Unhandled error: %o', error);

    return setErrorResponse(ctx, 500, messages);
  }

  // throw 된 객체가 error 객체가 아닌 경우
  messages.push('Unhandled non-error thrown');
  Logger.error('Is not instanceof error, %o', error);

  return setErrorResponse(ctx, 500, messages);
}
