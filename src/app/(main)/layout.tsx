'use client';

import { ReactNode } from 'react';

import { withAuth } from '@/hocs/withAuth';

import Sidebar from '@/components/layout/Sidebar';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative flex">
      <div className="sticky top-0 left-0 right-0 z-50 h-screen bg-card w-[240px]">
        <Sidebar />
      </div>

      <div className="flex-1 py-6 px-10">{children}</div>
    </main>
  );
};

export default withAuth(MainLayout);
