'use client';

import { Loader } from '@mantine/core';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader size={64} variant="dots" />
    </div>
  );
};

export default Loading;
