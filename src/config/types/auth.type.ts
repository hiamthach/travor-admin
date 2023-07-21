export interface LoginReq {
  username: string;
  password: string;
}

export interface LoginRes {
  user: {
    username: string;
    email: string;
    phone: string;
    full_name: string;
    created_at: string;
    password_changed_at: string;
  };

  session_id: string;
  access_token: string;
  refresh_token: string;
  access_token_expires_at: string;
  refresh_token_expires_at: string;
}

export interface RenewTokenReq {
  refresh_token: string;
}

export interface RenewTokenRes {
  access_token: string;
  access_token_expires_at: string;
}
