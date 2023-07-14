'use client';

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';

import DestinationsTable from '@/components/feature/destinations/DestinationsTable';
import destinationApi from '@/config/api/destination.api';
import { Breadcrumbs, Skeleton } from '@mantine/core';

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
  const { data, isLoading, isError } = useQuery(
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

      <h3 className="mt-5 font-bold text-24 text-heading">Destinations</h3>

      <div className="mt-5">
        <Skeleton visible={isLoading}>
          {data?.destinations && data?.destinations.length > 0 && (
            <DestinationsTable destinations={data?.destinations} />
          )}
        </Skeleton>
      </div>
    </div>
  );
};

export default DestinationsPage;
