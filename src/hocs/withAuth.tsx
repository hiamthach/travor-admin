'use client';

import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

import AuthConsumer from '@/hooks/useAuth';

// Create HOC for protected routes with a Page component wrapped by this HOC
export const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();
    const { isAuth } = AuthConsumer();

    useEffect(() => {
      if (!isAuth) {
        router.push('/sign-in'); // Redirect to sign-in page if not authenticated
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth]);

    // Render the wrapped component if authenticated
    return <WrappedComponent {...props} />;
  };

  // Set the display name for the wrapped component for better debugging experience
  Wrapper.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return Wrapper;
};
