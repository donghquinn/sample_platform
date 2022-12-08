import { MysqlError } from 'error';

export function isMysqlError(unknownError: unknown): unknownError is MysqlError {
  const isError = unknownError instanceof Error;

  return isError && 'code' in unknownError;
}
