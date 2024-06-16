import { Button, Card, Header, HeroLayout, Table } from '@/components';
import { Routes } from '@/constants';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export const StaffPage = () => {
  const mockTable = [
    {
      roles: ['ADMIN', 'MASTER'],
      name: 'Central',
      username: 'admin@central.com',
      active: true,
      id: 'r9ZwsoS',
    },
    {
      roles: ['ADMIN'],
      name: 'Theo Nicolas Duarte',
      username: 'theo_nicolas@central.com',
      active: true,
      id: 'UxX2EDd',
    },
  ];

  const router = useRouter();

  const handleToggleActive = useCallback(() => {}, []);

  return (
    <HeroLayout>
      <Header.Root>
        <Header.Title>Staff</Header.Title>
        <Header.Breadcrumbs parent="Dashboard" page="Staff" parentRoute={Routes.Dashboard} />
      </Header.Root>
      <div className="w-full flex flex-col gap-5">
        <div className="w-full flex justify-end">
          <Button onClick={() => router.push(Routes.AddStaff)}>Cadastrar Novo</Button>
        </div>
        <Card>
          <Table.Root>
            <Table.Head>
              <Table.HeadItem>Nome</Table.HeadItem>
              <Table.HeadItem>Usuário</Table.HeadItem>
              <Table.HeadItem>Ativo</Table.HeadItem>
              <Table.HeadItem></Table.HeadItem>
            </Table.Head>
            <Table.Body>
              {mockTable.map((item, index) => (
                <Table.Row key={index}>
                  <Table.RowItem>{item.name}</Table.RowItem>
                  <Table.RowItem>{item.username}</Table.RowItem>
                  <Table.RowItem>
                    {!item.roles.includes('MASTER') && (
                      <button onClick={handleToggleActive}>
                        {item.active ? (
                          <div className="rounded-full w-5 h-5 bg-[#219653] text-lg text-white flex items-center justify-center select-none material-icons-round">
                            check
                          </div>
                        ) : (
                          <div className="rounded-full w-5 h-5 bg-[#FB5454] text-lg text-white flex items-center justify-center select-none material-icons-round">
                            close
                          </div>
                        )}
                      </button>
                    )}
                  </Table.RowItem>
                  <div className="h-[66px] flex items-center">
                    <Link
                      href={`${Routes.EditStaff}?id=${item.id}`}
                      className="material-icons-round text-[#1C2434] p-1 rounded-full select-none hover:bg-dark/10"
                    >
                      edit
                    </Link>
                  </div>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Card>
      </div>
    </HeroLayout>
  );
};
