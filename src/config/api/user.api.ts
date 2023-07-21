import { User, UserStatsRes, UserUpdateReq } from '@/config/types/user.type';

import api from '.';

const userApi = {
  getUsersStats: (): Promise<UserStatsRes> => {
    return api.get('/stats/users');
  },

  updateUserInfo: (
    body: UserUpdateReq,
  ): Promise<{
    success: boolean;
  }> => {
    return api.put(`/users/${body.username}`, body);
  },

  getUserInfo: (
    username: string,
  ): Promise<{
    user: User;
  }> => {
    return api.get(`/users/${username}`);
  },
};

export default userApi;
