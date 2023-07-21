export type User = {
  username: string;
  full_name: string;
  email: string;
  phone: string;
  role: number;
  created_at: string;
};

export type UserStats = {
  username: string;
  full_name: string;
  email: string;
  role: number;
};

export type UserStatsRes = {
  users: UserStats[];
};

export type UserUpdateReq = {
  username: string;
  full_name: string;
  phone: string;
};

export type CreateUserForm = {
  username: string;
  full_name: string;
  email: string;
  phone: string;
  password: string;
};
