import SignInForm from '@/components/feature/auth/SignInForm';

export default async function Home() {
  return (
    <main className="bg-white h-screen w-full flex justify-center items-center">
      <SignInForm />
    </main>
  );
}
