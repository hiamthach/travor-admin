'use client';

import Link from 'next/link';

import useDocumentTitle from '@/hooks/useDocumentTitle';

import UserTable from '@/components/feature/users/UserTable';

import { Breadcrumbs } from '@mantine/core';

const items = [
  { title: 'Home', href: '/' },
  { title: 'Users', href: '/users' },
].map((item, index) => (
  <Link href={item.href} key={index} className="text-primary hover:underline text-16">
    {item.title}
  </Link>
));

const UsersPage = () => {
  useDocumentTitle('Users');

  return (
    <div>
      <Breadcrumbs>{items}</Breadcrumbs>
      <h1 className="font-bold text-24 text-heading mt-5">Users</h1>

      <UserTable />
    </div>
  );
};

export default UsersPage;
