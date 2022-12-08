export class AuthError extends Error {
  name: string;

  type: string;

  /**
   * Web3Error 생성
   * @param type 에러 타입
   * @param message 말로 풀어 쓴 오류 메세지
   */
  constructor(type: string, message: string) {
    super(message);

    this.name = 'AuthError';

    this.type = type;
  }
}
