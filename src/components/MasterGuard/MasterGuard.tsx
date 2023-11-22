import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';

type MasterGuardProps = React.PropsWithChildren<{}>;

export const MasterGuard = ({ children }: MasterGuardProps) => {
  const router = useRouter();
  useEffect(() => {
    const cookies = new Cookies();
    const roles = cookies.get('roles');
    const masterRole = roles.indexOf('MASTER');
    if (masterRole === -1) {
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
};
