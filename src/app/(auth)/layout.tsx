import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <main className="bg-white h-screen w-full flex justify-center items-center">{children}</main>;
};

export default AuthLayout;
