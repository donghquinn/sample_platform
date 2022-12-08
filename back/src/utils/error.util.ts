/**
 * 에러 메세지 파싱
 * @param error
 * @returns
 */
export function parseErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;

  // 에러 객체가 아닐 경우 stringify
  return JSON.stringify(error);
}
