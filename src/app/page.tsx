'use client';

import { withAuth } from '@/hocs/withAuth';

const HomePage = () => {
  return (
    <>
      <h1>Home Page</h1>
    </>
  );
};

export default withAuth(HomePage);
