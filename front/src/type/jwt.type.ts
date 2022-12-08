export interface DefaultResponse {
  resCode: 200 | 500 | 400;
  dataRes: KeyableObject | SignInResponse | null;
  errMsg?: string | string[];
}

export interface KeyableObject {
  [key: string]: string;
}

export interface SignInResponse {
  token: string;
  clientid: string;
}
