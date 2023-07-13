import { ReactNode } from 'react';

import Sidebar from '@/components/layout/Sidebar';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Sidebar />
      {children}
    </main>
  );
};

export default MainLayout;
