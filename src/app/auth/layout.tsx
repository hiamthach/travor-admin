import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-[320px] px-6 py-3 rounded-xl border border-solid border-[#f1f1f1] bg-white">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
