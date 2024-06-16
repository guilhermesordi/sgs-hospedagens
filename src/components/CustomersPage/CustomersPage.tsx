import { Button, Card, Header, HeroLayout, Table } from '@/components';
import { Routes } from '@/constants';
import { format } from 'date-fns';
import { useRouter } from 'next/router';

export const CustomersPage = () => {
  const mockTable = [
    {
      id: '123.456.789-01',
      name: 'João Silva',
      dateOfBirth: '1980-05-15',
      email: 'joao.silva@email.com',
      cellphone: '+55123456789',
    },
    {
      id: '987.654.321-02',
      name: 'Maria Oliveira',
      dateOfBirth: '1992-08-20',
      email: 'maria.oliveira@email.com',
      cellphone: '+5511987654321',
    },
    {
      id: '456.789.012-03',
      name: 'Carlos Santos',
      dateOfBirth: '1975-12-03',
      email: 'carlos.santos@email.com',
      cellphone: '+5511123456789',
    },
    {
      id: '321.098.765-04',
      name: 'Ana Pereira',
      dateOfBirth: '1988-04-27',
      email: 'ana.pereira@email.com',
      cellphone: '+5511987654321',
    },
    {
      id: '654.321.098-05',
      name: 'Ricardo Oliveira',
      dateOfBirth: '1995-10-10',
      email: 'ricardo.oliveira@email.com',
      cellphone: '+5511123456789',
    },
    {
      id: '890.123.456-06',
      name: 'Fernanda Lima',
      dateOfBirth: '1983-07-18',
      email: 'fernanda.lima@email.com',
      cellphone: '+5511987654321',
    },
    {
      id: '234.567.890-07',
      name: 'Pedro Almeida',
      dateOfBirth: '1970-01-05',
      email: 'pedro.almeida@email.com',
      cellphone: '+5511123456789',
    },
    {
      id: '567.890.123-08',
      name: 'Camila Santos',
      dateOfBirth: '1990-06-22',
      email: 'camila.santos@email.com',
      cellphone: '+5511987654321',
    },
    {
      id: '012.345.678-09',
      name: 'Roberto Silva',
      dateOfBirth: '1986-09-14',
      email: 'roberto.silva@email.com',
      cellphone: '+5511123456789',
    },
    {
      id: '789.012.345-10',
      name: 'Mariana Oliveira',
      dateOfBirth: '1982-03-30',
      email: 'mariana.oliveira@email.com',
      cellphone: '+5511987654321',
    },
  ];

  const router = useRouter();

  return (
    <HeroLayout>
      <Header.Root>
        <Header.Title>Clientes</Header.Title>
        <Header.Breadcrumbs parent="Dashboard" page="Clientes" parentRoute={Routes.Dashboard} />
      </Header.Root>
      <div className="w-full flex flex-col gap-5">
        <div className="w-full flex justify-end">
          <Button onClick={() => router.push(Routes.AddCustomer)}>Cadastrar Novo</Button>
        </div>
        <Card>
          <Table.Root>
            <Table.Head>
              <Table.HeadItem>Cliente</Table.HeadItem>
              <Table.HeadItem>Nome</Table.HeadItem>
              <Table.HeadItem>Data de nascimento</Table.HeadItem>
              <Table.HeadItem>Email</Table.HeadItem>
              <Table.HeadItem>Celular</Table.HeadItem>
            </Table.Head>
            <Table.Body>
              {mockTable.map((item, index) => (
                <Table.Row key={index}>
                  <Table.RowItem>{item.id}</Table.RowItem>
                  <Table.RowItem>{item.name}</Table.RowItem>
                  <Table.RowItem>{format(item.dateOfBirth, 'dd/MM/yyyy')}</Table.RowItem>
                  <Table.RowItem>{item.email}</Table.RowItem>
                  <Table.RowItem>{item.cellphone}</Table.RowItem>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Card>
      </div>
    </HeroLayout>
  );
};
