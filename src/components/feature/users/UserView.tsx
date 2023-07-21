'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';

import userApi from '@/config/api/user.api';

import { Loader } from '@mantine/core';

interface Props {
  username: string;
}

const { getUserInfo } = userApi;

const UserView = ({ username }: Props) => {
  const { data, isLoading, isError } = useQuery(['user', username], () => {
    return getUserInfo(username);
  });

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <Loader variant="dots" />;
  }

  return (
    <div>
      {data && data.user && (
        <div className="grid grid-cols-2 gap-3">
          <div className="">
            <h5 className="text-16 text-heading">Username</h5>
            <p className="text-14 text-pgr">{data.user.username}</p>
          </div>
          <div className="">
            <h5 className="text-16 text-heading">Full name</h5>
            <p className="text-14 text-pgr">{data.user.full_name}</p>
          </div>
          <div className="">
            <h5 className="text-16 text-heading">Email</h5>
            <p className="text-14 text-pgr">{data.user.email}</p>
          </div>
          <div className="">
            <h5 className="text-16 text-heading">Phone</h5>
            <p className="text-14 text-pgr">{data.user.phone}</p>
          </div>
          <div className="col-span-2">
            <h5 className="text-16 text-heading">Trips</h5>
            <p className="text-14 text-pgr">Coming soon...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserView;
