'use client';

import { useRouter } from 'next/navigation';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { CookiesProvider } from 'react-cookie';
import { useCookies } from 'react-cookie';

import authApi from '@/config/api/auth.api';
import { USER_ADMIN } from '@/config/constants/user.const';
import toastHelpers from '@/config/helpers/toast.helper';
import { LoginReq } from '@/config/types/auth.type';

const { signIn, renewAccessToken } = authApi;

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
  const [loading, setLoading] = useState<boolean>(true);

  const [cookies, setCookie, removeCookie] = useCookies(['refreshToken', 'accessToken', 'currentUser']);

  const router = useRouter();

  const handleSignOut = async () => {
    setIsAuth(false);
    setCurrentUser(null);
    toastHelpers.success('Logout');

    // remove cookie
    removeCookie('refreshToken', { path: '/' });
    removeCookie('accessToken', { path: '/' });
    removeCookie('currentUser', { path: '/' });
  };

  useEffect(() => {
    if (cookies.refreshToken && cookies.accessToken && cookies.currentUser) {
      setIsAuth(true);
      setCurrentUser(cookies.currentUser);
      setLoading(false);
    } else if (cookies.refreshToken && !cookies.accessToken) {
      renewAccessToken({
        refresh_token: cookies.refreshToken,
      })
        .then((res) => {
          setCookie('accessToken', res.access_token, {
            path: '/',
            expires: new Date(res.access_token_expires_at),
          });
          setIsAuth(true);
          setLoading(false);
          setCurrentUser(cookies.currentUser);
          router.push('/');
        })
        .catch(() => {
          handleSignOut();
        });
    } else {
      setIsAuth(false);
      setCurrentUser(null);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.accessToken, cookies.currentUser, cookies.refreshToken]);

  const values: IAuthValue = {
    isAuth,
    currentUser,
    loading,
    signIn: async (body: LoginReq) => {
      try {
        const res = await signIn(body);
        if (res && res.user.role === USER_ADMIN) {
          setIsAuth(true);
          setCurrentUser(res.user);

          // set cookie
          setCookie('refreshToken', res.refresh_token, {
            path: '/',
            expires: new Date(res.refresh_token_expires_at),
          });

          setCookie('accessToken', res.access_token, {
            path: '/',
            expires: new Date(res.access_token_expires_at),
          });

          setCookie('currentUser', JSON.stringify(res), {
            path: '/',
            expires: new Date(res.refresh_token_expires_at),
          });

          toastHelpers.success('Login successfully');

          router.push('/');
        } else {
          toastHelpers.error('No permission');
        }
      } catch (error) {
        toastHelpers.error('Wrong username or password');
      }
    },

    signOut: async () => {
      handleSignOut();
    },
  };

  return values;
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const auth = useAuth();

  return (
    <CookiesProvider>
      <AuthContext.Provider value={auth}>{!auth.loading ? children : null}</AuthContext.Provider>
    </CookiesProvider>
  );
};

export default function AuthConsumer() {
  return useContext(AuthContext);
}
