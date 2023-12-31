import { LoginReq, LoginRes, RenewTokenReq, RenewTokenRes } from '@/config/types/auth.type';

import api from '.';

const authApi = {
  signIn: (data: LoginReq): Promise<LoginRes> => api.post('/auth/login', data),

  renewAccessToken: (data: RenewTokenReq): Promise<RenewTokenRes> => {
    return api.post('/auth/renew', data);
  },
};

export default authApi;
