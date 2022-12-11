import { Context } from 'koa';

export type AdminCtx = AdminRegisterCtx | Context;
export interface AdminRequest {
  email: string;
  password: string;
  isAdmin: string;
  gender: string;
  birth: string;
}

export interface UserCounts {
  count: string;
}

export interface AdminRegisterBody {
  email: string;
  password: string;
  gender: string;
  birth: string;
  isAdmin: string;
}

export interface AdminSigninCtx extends Context {
  data: string;
}

export interface AdminRequestBodyData {
  body: AdminRequestData;
}

export interface AdminRegisterCtx extends Context {
  data: string;
}

export interface AdminRequestData {
  data: AdminRegisterBody;
  headers: object;
}
