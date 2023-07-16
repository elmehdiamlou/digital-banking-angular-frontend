export interface LoginResponse {
  access_token: string;
}

export interface DecodedJwt {
  sub: string;
  scope: string;
}
