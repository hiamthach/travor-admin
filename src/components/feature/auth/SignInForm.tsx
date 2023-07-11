'use client';

import AuthConsumer from '@/hooks/useAuth';
import ThemeProvider from '@/theme/ThemeProvider';
import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

const SignInForm = () => {
  const { signIn } = AuthConsumer();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  return (
    <ThemeProvider>
      <div className="bg-card px-10 py-16 rounded-3xl  text-center">
        <h1 className="text-primary text-36 font-bold">Login</h1>
        <form
          className="flex flex-col gap-8 mt-8 min-w-[414px]"
          onSubmit={form.onSubmit((values) => {
            signIn(values);
          })}
        >
          <TextInput placeholder="Username*" {...form.getInputProps('username')} />
          <TextInput placeholder="Password*" type="password" {...form.getInputProps('password')} />
          <Button type="submit" className="mx-auto leading-content">
            Submit
          </Button>
        </form>
      </div>
    </ThemeProvider>
  );
};

export default SignInForm;
