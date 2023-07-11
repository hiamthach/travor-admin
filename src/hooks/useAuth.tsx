import { ReactNode, createContext, useContext, useState } from 'react';

import authApi from '@/config/api/auth.api';
import toastHelpers from '@/config/helpers/toast';
import { LoginReq } from '@/config/types/auth';

const { signIn } = authApi;

interface IAuthValue {
  isAuth: boolean;
  currentUser: any;
  loading: boolean;
  signIn(body: LoginReq): Promise<void>;
  signOut(): Promise<void>;
}

interface IAuthProvider {
  children: JSX.Element | JSX.Element[] | ReactNode;
}

export const AuthContext = createContext<IAuthValue>({
  isAuth: false,
  currentUser: null,
  loading: false,
  signIn: async () => {},
  signOut: async () => {},
});

function useAuth() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const values: IAuthValue = {
    isAuth,
    currentUser,
    loading,
    signIn: async (body: LoginReq) => {
      try {
        const res = await signIn(body);
        if (res) {
          setIsAuth(true);
          setCurrentUser(res);

          toastHelpers.success('Login successfully');
        } else {
          toastHelpers.error('Login failed');
        }
      } catch (error) {
        toastHelpers.error('Login failed');
      }
    },

    signOut: async () => {
      setIsAuth(false);
      setCurrentUser(null);
    },
  };

  return values;
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
export default function AuthConsumer() {
  return useContext(AuthContext);
}
