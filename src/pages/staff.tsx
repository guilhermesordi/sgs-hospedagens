import { ReturnTo, Header, MasterGuard } from '@/components';
import axios from 'axios';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export type Staff = {
  id: string;
  roles: string[];
  name: string;
  username: string;
  password: string;
  active: boolean;
  create_tmz: string;
  update_tmz: string;
};

export default function StaffPage() {
  const [listData, setListData] = useState<Staff[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const getListData = useCallback(async () => {
    const { data } = await axios.get<Staff[]>('http://localhost:4000/staff');
    setListData(data);
    setIsLoading(false);
  }, []);

  const handleEditUser = (staff: Staff) => {
    const params = {
      name: staff.name,
      username: staff.username,
      active: staff.active,
      id: staff.id,
    };

    router.push({ pathname: '/edit-staff', query: params });
  };

  useEffect(() => {
    getListData();
  }, [getListData]);

  if (isLoading) return 'Carregando';

  return (
    <MasterGuard>
      <Header>
        <ReturnTo to="dashboard" />
        <Link href={'/add-staff'}>Cadastrar novo</Link>
      </Header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '35px', marginTop: '10px' }}>
        {listData.length > 0
          ? listData.map(
              (staff) =>
                staff.roles.indexOf('MASTER') === -1 && (
                  <div key={staff.id} style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>
                      <strong>Nome:</strong> {staff.name}
                      <button style={{ marginLeft: '10px' }} onClick={() => handleEditUser(staff)}>
                        Editar
                      </button>
                    </span>
                    <span>
                      <strong>Nome de usuário:</strong> {staff.username}
                    </span>
                    <span>
                      <strong>Ativo:</strong> {staff.active ? 'Sim' : 'Não'}
                    </span>
                  </div>
                ),
            )
          : 'Nenhum staff encontrado'}
      </div>
    </MasterGuard>
  );
}
