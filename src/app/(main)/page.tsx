'use client';

import { IconMap2, IconPlaneDeparture, IconUser } from '@tabler/icons-react';

import { withAuth } from '@/hocs/withAuth';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import { Center, Group, Paper, SimpleGrid, Text } from '@mantine/core';

interface IStat {
  name: string;
  value: number;
  icon: JSX.Element;
}

const stats: IStat[] = [
  {
    name: 'Destinations',
    value: 10,
    icon: <IconMap2 size={24} className="text-secondary" />,
  },
  {
    name: 'Packages',
    value: 20,
    icon: <IconPlaneDeparture size={24} className="text-primary" />,
  },
  {
    name: 'Users',
    value: 30,
    icon: <IconUser size={24} className="text-green-400" />,
  },
];

const HomePage = () => {
  useDocumentTitle('Dashboard');

  return (
    <div className="w-full max-w-5xl">
      <SimpleGrid cols={3} className="w-full">
        {stats.map((stat, index) => {
          return (
            <Paper
              withBorder
              radius="md"
              key={index}
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
          );
        })}
      </SimpleGrid>
    </div>
  );
};

export default withAuth(HomePage);
