export interface DefaultResponse {
  resCode: 200 | 500 | 400;
  dataRes: KeyableObject | null;
  errMsg?: string | string[];
}

export interface KeyableObject {
  [key: string]: string;
}
