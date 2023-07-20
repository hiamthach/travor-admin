'use client';

import Link from 'next/link';

import React from 'react';

import useDocumentTitle from '@/hooks/useDocumentTitle';

import PackagesForm from '@/components/feature/packages/PackagesForm';

import { Breadcrumbs } from '@mantine/core';

const items = [
  { title: 'Home', href: '/' },
  { title: 'Packages', href: '/packages' },
  { title: 'Create Package', href: '/packages/create' },
].map((item, index) => (
  <Link href={item.href} key={index} className="text-primary hover:underline text-16">
    {item.title}
  </Link>
));

const CreatePackagePage = () => {
  useDocumentTitle('Create Package');

  return (
    <div>
      <Breadcrumbs>{items}</Breadcrumbs>

      <h3 className="my-5 font-bold text-24 text-heading">Create Package</h3>

      <PackagesForm />
    </div>
  );
};

export default CreatePackagePage;
