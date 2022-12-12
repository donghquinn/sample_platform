export interface SignInRes {
  resCode: 200 | 500 | 400;
  dataRes: SignInResponse | null;
  errMsg?: string | string[];
}

export interface SignInResponse {
  queryToken: string;
  queryClientId: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}
