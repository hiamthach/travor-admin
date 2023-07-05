'use client';

import Link from 'next/link';

import { Button } from '@mantine/core';

export default async function Home() {
  return (
    <main className="flex justify-center items-center h-screen">
      <h1 className="font-sans text-white">Hello Travor Admin</h1>

      <Link href="/auth/sign-in">
        <Button>Sign In</Button>
      </Link>
    </main>
  );
}
