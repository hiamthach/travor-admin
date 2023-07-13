import { ReactNode } from 'react';

import Sidebar from '@/components/layout/Sidebar';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative flex">
      <div className="sticky top-0 left-0 right-0 z-50 h-screen bg-card w-[240px]">
        <Sidebar />
      </div>

      <div className="">{children}</div>
    </main>
  );
};

export default MainLayout;
