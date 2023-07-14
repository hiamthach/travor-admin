'use client';

import Link from 'next/link';

import { IconPlus } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';

import DestinationsTable from '@/components/feature/destinations/DestinationsTable';
import destinationApi from '@/config/api/destination.api';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import { Breadcrumbs, Button, Skeleton } from '@mantine/core';

const items = [
  { title: 'Home', href: '/' },
  { title: 'Destinations', href: '/destinations' },
].map((item, index) => (
  <Link href={item.href} key={index} className="text-primary hover:underline text-16">
    {item.title}
  </Link>
));

const { getDestinations } = destinationApi;

const DestinationsPage = () => {
  useDocumentTitle('Destinations');

  const { data, isLoading, isError, refetch } = useQuery(
    ['destinations'],
    async () => {
      const res = await getDestinations({
        page: 1,
        page_size: 10,
      });

      return res;
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <Breadcrumbs>{items}</Breadcrumbs>

      <div className="flex justify-between items-center my-5">
        <h3 className="font-bold text-24 text-heading">Destinations</h3>
        <Link href="/destinations/create">
          <Button leftIcon={<IconPlus size={20} />}>New</Button>
        </Link>
      </div>

      <div className="">
        <Skeleton visible={isLoading}>
          {data?.destinations && data?.destinations.length > 0 && (
            <DestinationsTable destinations={data?.destinations} refetch={refetch} />
          )}
        </Skeleton>
      </div>
    </div>
  );
};

export default DestinationsPage;
