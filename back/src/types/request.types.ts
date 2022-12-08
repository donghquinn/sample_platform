import { IncomingHttpHeaders } from 'http';
import Jwt from 'jsonwebtoken';
import { Context } from 'koa';

// 일반 결과 요청
export type DefaultCtx = AuthByKeyCtx | AuthByJwtContext;

export interface AuthByKeyCtx extends Context {
  clientid: string;
}

export type StatusCode = 200 | 500 | 400;

export interface HeaderKey extends IncomingHttpHeaders {
  key: string;
}

export interface AuthByJwtPayload extends Jwt.JwtPayload {
  hash: string;
  uuid: string;
  id: string;
}

export interface AuthByJwtContext extends Context {
  isInternal: boolean;
  clientId: number;
  uuid: string;
  body: RespondBody;
}

export type ResponseCode = '200' | '500';

export interface RespondBody {
  resCode: ResponseCode;
  dataRes: KeyableObject | null;
  errMsg: string | string[];
}

export interface KeyableObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
