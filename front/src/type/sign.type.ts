export interface SignInRes {
  resCode: 200 | 500 | 400;
  dataRes: SignInResponse | null;
  errMsg?: string | string[];
}

export interface SignInResponse {
  token: string;
  clientid: string;
}
