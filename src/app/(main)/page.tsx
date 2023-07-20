'use client';

import Link from 'next/link';

import { IconMap2, IconPlaneDeparture, IconUser } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';

import useDocumentTitle from '@/hooks/useDocumentTitle';

import { withAuth } from '@/hocs/withAuth';

import destinationApi from '@/config/api/destination.api';
import packageApi from '@/config/api/package.api';

import { Center, Group, Paper, SimpleGrid, Text } from '@mantine/core';

interface IStat {
  name: string;
  value: number;
  icon: JSX.Element;
  href: string;
}

const HomePage = () => {
  useDocumentTitle('Dashboard');

  const { data: desList } = useQuery(['destinations', 'stats'], () => {
    return destinationApi.getStats();
  });

  const { data: pkgList } = useQuery(['packages', 'stats'], () => {
    return packageApi.getStats();
  });

  const stats: IStat[] = [
    {
      name: 'Destinations',
      value: desList?.destinations.length || 0,
      icon: <IconMap2 size={24} className="text-secondary" />,
      href: '/destinations',
    },
    {
      name: 'Packages',
      value: pkgList?.packages.length || 0,
      icon: <IconPlaneDeparture size={24} className="text-primary" />,
      href: '/packages',
    },
    {
      name: 'Users',
      value: 30,
      icon: <IconUser size={24} className="text-green-400" />,
      href: '/users',
    },
  ];

  return (
    <div className="w-full max-w-desktop">
      <SimpleGrid cols={3} className="w-full">
        {stats.map((stat, index) => {
          return (
            <Link href={stat.href} key={index}>
              <Paper
                withBorder
                radius="md"
                className="flex-1 px-5 py-2 cursor-pointer hover:-translate-y-1 ease-in duration-200"
              >
                <Group className="gap-6" noWrap>
                  <Center>{stat.icon}</Center>
                  <div>
                    <Text color="dimmed" size="xs" className="uppercase font-bold">
                      {stat.name}
                    </Text>
                    <Text size="xl" className="font-bold">
                      {stat.value}
                    </Text>
                  </div>
                </Group>
              </Paper>
            </Link>
          );
        })}
      </SimpleGrid>
    </div>
  );
};

export default withAuth(HomePage);
