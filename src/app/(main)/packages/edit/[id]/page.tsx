'use client';

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import React from 'react';

import useDocumentTitle from '@/hooks/useDocumentTitle';

import PackagesForm from '@/components/feature/packages/PackagesForm';

import packageApi from '@/config/api/package.api';

import { Breadcrumbs, Loader } from '@mantine/core';

const { getPackageById } = packageApi;

const items = [
  { title: 'Home', href: '/' },
  { title: 'Packages', href: '/packages' },
  { title: 'Edit Package', href: '/packages/edit' },
].map((item, index) => (
  <Link href={item.href} key={index} className="text-primary hover:underline text-16">
    {item.title}
  </Link>
));

const EditPackage = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  useDocumentTitle('Edit Package');

  const { data, isFetching, isError, refetch } = useQuery(['packages', params.id], () => {
    return getPackageById(params.id);
  });

  if (isError) {
    return null;
  }

  return (
    <div>
      <Breadcrumbs>{items}</Breadcrumbs>

      <h1 className="my-5 font-bold text-24 text-heading">Edit Package</h1>

      {isFetching && (
        <div className="min-h-[50vh] w-full flex justify-center items-center">
          <Loader variant="dots" />
        </div>
      )}
      {data && <PackagesForm isEdit={true} data={data} refetch={refetch} />}
    </div>
  );
};

export default EditPackage;
