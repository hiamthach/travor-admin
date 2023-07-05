'use client';

import { signIn, useSession } from 'next-auth/react';

import React from 'react';

import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

const SignInForm = () => {
  const { data } = useSession();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });
  return (
    <div className="">
      <h1 className="text-center text-2xl">Sign In</h1>
      <form
        className="text-left flex flex-col gap-5"
        onSubmit={form.onSubmit((values) => {
          signIn('credentials', values);
        })}
      >
        <TextInput label="Username" placeholder="Username" {...form.getInputProps('username')} />
        <PasswordInput placeholder="Password" label="Password" withAsterisk {...form.getInputProps('password')} />

        <div className="text-center">
          <Button type="submit">Sign In</Button>
        </div>
      </form>

      {data?.user && <h3>Logged</h3>}
    </div>
  );
};

export default SignInForm;
