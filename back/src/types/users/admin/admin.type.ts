import { Context } from 'koa';

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
}

export interface AdminSignin {
  email: string;
  password: string;
}

export interface AdminRegisterCtx extends Context {
  body: AdminRegisterBody;
}
