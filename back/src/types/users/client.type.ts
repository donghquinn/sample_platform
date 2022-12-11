export interface ClientInfo {
  email: string;
  password: string;
  token: string;
  clientid: string;
  isAdmin: string;
}

export interface SignInQuery {
  token: string;
  clientid: string;
}
