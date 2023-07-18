'use client';

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import React from 'react';

import useDocumentTitle from '@/hooks/useDocumentTitle';

import DestinationsForm from '@/components/feature/destinations/DestinationsForm';

import destinationApi from '@/config/api/destination.api';
import galleriesApi from '@/config/api/gallery.api';

import { Breadcrumbs, Loader } from '@mantine/core';

const { getDestinationById } = destinationApi;
const { getGalleries } = galleriesApi;

const items = [
  { title: 'Home', href: '/' },
  { title: 'Destinations', href: '/destinations' },
  { title: 'Edit Destination', href: '/destinations/edit' },
].map((item, index) => (
  <Link href={item.href} key={index} className="text-primary hover:underline text-16">
    {item.title}
  </Link>
));

const EditDestination = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  useDocumentTitle('Edit Destination');

  const { data, isFetching, isError, refetch } = useQuery(['destinations', params.id], () => {
    return getDestinationById(params.id);
  });

  const { data: galleries, refetch: refetchGallery } = useQuery(['galleries', params.id], async () => {
    return getGalleries(params.id);
  });

  if (isError) {
    return null;
  }

  return (
    <div>
      <Breadcrumbs>{items}</Breadcrumbs>

      <h3 className="my-5 font-bold text-24 text-heading">Create Destination</h3>

      {isFetching && (
        <div className="min-h-[50vh] w-full flex justify-center items-center">
          <Loader variant="dots" />
        </div>
      )}
      {data && (
        <DestinationsForm
          isEdit={true}
          data={data}
          refetch={refetch}
          galleries={galleries?.images || []}
          refetchGallery={refetchGallery}
        />
      )}
    </div>
  );
};

export default EditDestination;
