'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { IconPlus, IconSearch } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import useDocumentTitle from '@/hooks/useDocumentTitle';

import DestinationsTable from '@/components/feature/destinations/DestinationsTable';

import destinationApi from '@/config/api/destination.api';
import { PAGINATION_LIMIT } from '@/config/constants/general.const';

import { Breadcrumbs, Button, Pagination, Skeleton, TextInput } from '@mantine/core';

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
  const [page, setPage] = useState(1);
  const router = useRouter();

  const searchParams = useSearchParams();

  const keyword = searchParams.get('keyword');

  // create handleSearch function when user press Enter
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // set query string ?keyword=
      router.push('/destinations?keyword=' + e.currentTarget.value);
    }
  };

  const { data, isLoading, isError, refetch } = useQuery(
    ['destinations', page, keyword],
    async () => {
      const res = await getDestinations({
        page: page,
        page_size: PAGINATION_LIMIT,
        keyword: keyword || '',
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

      <h1 className="font-bold text-24 text-heading mt-5">Destinations</h1>
      <div className="flex justify-between items-center my-5">
        <TextInput
          placeholder="Search"
          width={360}
          icon={<IconSearch size={18} />}
          className="w-[300px]"
          onKeyDown={handleSearch}
          defaultValue={keyword || ''}
        />
        <Link href="/destinations/create">
          <Button leftIcon={<IconPlus size={20} />}>New</Button>
        </Link>
      </div>

      <div className="">
        <Skeleton visible={isLoading}>
          <span className="text-14 mb-4">Total: {data?.pagination.total ? data?.pagination.total : 0}</span>
          {data?.destinations && data?.destinations.length > 0 && (
            <DestinationsTable destinations={data?.destinations} refetch={refetch} />
          )}
          {data?.pagination && data?.pagination.total > 0 && (
            <div className="flex justify-center mt-10 mx-auto">
              <Pagination
                value={page}
                onChange={setPage}
                total={Math.ceil(data?.pagination.total / PAGINATION_LIMIT)}
              />
            </div>
          )}
        </Skeleton>
      </div>
    </div>
  );
};

export default DestinationsPage;
