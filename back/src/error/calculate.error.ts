export class CalculateError extends Error {
  type: string;

  code: string;

  constructor(type: string, code: string, message: string) {
    super(message);

    this.name = '[MVP_PROCESS_ERROR]';

    this.code = code;

    this.type = type;
  }
}
