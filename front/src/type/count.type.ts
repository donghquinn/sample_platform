export interface CountRes {
  resCode: 200 | 500 | 400;
  dataRes: string | null;
  errMsg?: string | string[] | null;
}

// export interface CountResponse {
//   count: string;
// }
