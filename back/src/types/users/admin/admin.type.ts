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

export interface AdminSignin {
  email: string;
  password: string;
}
