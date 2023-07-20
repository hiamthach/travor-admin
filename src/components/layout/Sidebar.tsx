'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { IconLogout, IconMap2, IconPlaneDeparture } from '@tabler/icons-react';

import AuthConsumer from '@/hooks/useAuth';

import Logo from '../shared/Logo';

import { clsx } from '@mantine/core';

const listNav = [
  {
    name: 'Destinations',
    url: '/destinations',
    icon: <IconMap2 />,
  },

  {
    name: 'Packages',
    url: '/packages',
    icon: <IconPlaneDeparture />,
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  const { signOut } = AuthConsumer();

  return (
    <nav className="px-4 py-6 h-full flex flex-col">
      <Logo />

      <div className="flex gap-2 flex-col mt-8 flex-1">
        {listNav.map((item, index) => (
          <Link
            key={index}
            href={item.url}
            className={clsx(
              'flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-heading hover:bg-gray-200',
              pathname.includes(item.url) && 'bg-primary text-white hover:bg-primary hover:opacity-90',
            )}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>

      <div
        onClick={signOut}
        className="flex items-center gap-3 w-full h-fit px-4 py-3 rounded-2xl text-red-600 hover:bg-red-100 cursor-pointer"
      >
        <IconLogout />
        <span>Logout</span>
      </div>
    </nav>
  );
};

export default Sidebar;
