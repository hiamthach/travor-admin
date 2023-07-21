import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';

import CustomInput from '@/components/shared/CustomInput';

import userApi from '@/config/api/user.api';
import toastHelpers from '@/config/helpers/toast.helper';

import { Button, Loader } from '@mantine/core';
import { useForm } from '@mantine/form';

interface Props {
  username: string;
  close: () => void;
  refetchData: () => void;
}

const { getUserInfo, updateUserInfo } = userApi;

const UserEditForm = ({ username, close, refetchData }: Props) => {
  const { data, isLoading, isError, refetch } = useQuery(['users', username], () => {
    return getUserInfo(username);
  });

  const form = useForm({
    initialValues: {
      fullName: data && data.user ? data.user.full_name : '',
      phone: data && data.user ? data.user.phone : '',
    },
  });

  useEffect(() => {
    if (data && data.user) {
      form.setFieldValue('fullName', data.user.full_name);
      form.setFieldValue('phone', data.user.phone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <Loader variant="dots" />;
  }

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={form.onSubmit((values) => {
        updateUserInfo({
          username: username,
          full_name: values.fullName,
          phone: values.phone,
        }).then(() => {
          toastHelpers.success('Update user info successfully!');
          refetch();
          refetchData();
          close();
        });
      })}
    >
      <CustomInput label="Full name" {...form.getInputProps('fullName')} />
      <CustomInput label="Phone" {...form.getInputProps('phone')} />

      <div className="flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default UserEditForm;
