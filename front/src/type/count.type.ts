export interface CountRes {
  resCode: 200 | 500 | 400;
  dataRes: CountResponse | null;
  errMsg?: string | string[];
}

export interface CountResponse {
  count: string;
}
