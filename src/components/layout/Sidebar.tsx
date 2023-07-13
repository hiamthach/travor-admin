'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { IconMap2, IconPlaneDeparture } from '@tabler/icons-react';

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

  return (
    <nav className="px-4 py-6">
      <Logo />

      <div className="flex gap-2 flex-col items-center justify-center h-full mt-8">
        {listNav.map((item, index) => (
          <Link
            key={index}
            href={item.url}
            className={clsx(
              'flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-primary hover:bg-gray-200',
              pathname.includes(item.url) && 'bg-primary text-white hover:bg-primary hover:opacity-90',
            )}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
