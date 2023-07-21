'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { IconEdit, IconPlus, IconSearch } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import useDocumentTitle from '@/hooks/useDocumentTitle';

import PackagesTable from '@/components/feature/packages/PackagesTable';
import TypesMgm from '@/components/feature/packages/TypesMgm';

import packageApi from '@/config/api/package.api';
import { PAGINATION_LIMIT } from '@/config/constants/general.const';

import { Breadcrumbs, Button, Modal, Pagination, Skeleton, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const { getPackages } = packageApi;

const items = [
  { title: 'Home', href: '/' },
  { title: 'Packages', href: '/packages' },
].map((item, index) => (
  <Link href={item.href} key={index} className="text-primary hover:underline text-16">
    {item.title}
  </Link>
));

const PackagesPage = () => {
  useDocumentTitle('Packages');

  const [opened, { open, close }] = useDisclosure(false);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const searchParams = useSearchParams();

  const keyword = searchParams.get('keyword');

  // create handleSearch function when user press Enter
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // set query string ?keyword=
      router.push('/packages?keyword=' + e.currentTarget.value);
    }
  };

  const { data, isLoading, isError, refetch } = useQuery(
    ['packages', page, keyword],
    async () => {
      const res = await getPackages({
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

      <h1 className="font-bold text-24 text-heading mt-5">Packages</h1>
      <div className="flex justify-between items-center my-5">
        <TextInput
          placeholder="Search"
          width={360}
          icon={<IconSearch size={18} />}
          className="w-[300px]"
          onKeyDown={handleSearch}
          defaultValue={keyword || ''}
        />
        <div className="flex items-center gap-3">
          <Link href="/packages/create">
            <Button leftIcon={<IconPlus size={20} />}>New</Button>
          </Link>
          <Button leftIcon={<IconEdit size={20} />} color="teal" onClick={open}>
            Types
          </Button>
        </div>
      </div>

      <div className="">
        <Skeleton visible={isLoading}>
          <span className="text-14 mb-4">Total: {data?.pagination.total ? data?.pagination.total : 0}</span>
          {data?.packages && data?.packages.length > 0 && <PackagesTable packages={data?.packages} refetch={refetch} />}
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

      <Modal opened={opened} onClose={close} size={'xl'} title="Types Management">
        <TypesMgm />
      </Modal>
    </div>
  );
};

export default PackagesPage;
