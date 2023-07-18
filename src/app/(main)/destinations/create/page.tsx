'use client';

import Link from 'next/link';

import React from 'react';

import useDocumentTitle from '@/hooks/useDocumentTitle';

import DestinationsForm from '@/components/feature/destinations/DestinationsForm';

import { Breadcrumbs } from '@mantine/core';

const items = [
  { title: 'Home', href: '/' },
  { title: 'Destinations', href: '/destinations' },
  { title: 'Create Destination', href: '/destinations/create' },
].map((item, index) => (
  <Link href={item.href} key={index} className="text-primary hover:underline text-16">
    {item.title}
  </Link>
));

const CreateDestination = () => {
  useDocumentTitle('Create Destination');

  return (
    <div>
      <Breadcrumbs>{items}</Breadcrumbs>

      <h3 className="my-5 font-bold text-24 text-heading">Create Destination</h3>

      <DestinationsForm />
    </div>
  );
};

export default CreateDestination;
