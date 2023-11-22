import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

export default function Dashboard() {
  const [isMaster, setIsMaster] = useState<boolean>(false);

  useEffect(() => {
    const cookies = new Cookies();
    const roles = cookies.get('roles');
    const masterRole = roles.indexOf('MASTER');

    setIsMaster(masterRole !== -1);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Link href={'/rooms'}>Ver quartos</Link>
      <Link href={'/customers'}>Ver clientes</Link>
      <Link href={'/bookings'}>Ver agendamentos</Link>
      {isMaster ? <Link href={'/staff'}>Ver staff</Link> : null}
    </div>
  );
}
