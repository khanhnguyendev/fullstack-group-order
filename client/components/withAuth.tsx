// components/withAuth.tsx
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import SkeletonList from './Skeletion/List';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const ComponentWithAuth = (props: P) => {
    const [user, setUser] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser);
      setIsLoading(false);
    }, []);

    useEffect(() => {
      if (!isLoading) {
        if (!user && pathName !== '/welcome') {
          router.push('/welcome');
        } else if (user && pathName === '/welcome') {
          router.push('/');
        }
      }
    }, [user, pathName, isLoading, router]);

    if (isLoading) {
      return <SkeletonList />
    }
    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithAuth;
};

export default withAuth;
