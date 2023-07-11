import api from '.';
import { LoginReq, LoginRes } from '../types/auth';

const authApi = {
  signIn: (data: LoginReq): Promise<LoginRes> => api.post('/auth/login', data),
};

export default authApi;
