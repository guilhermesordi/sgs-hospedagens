import { Button, Card, Header, HeroLayout, Table } from '@/components';
import { Routes } from '@/constants';
import { format } from 'date-fns';
import { StatusChip } from './StatusChip';
import { useRouter } from 'next/router';

export const BookingsPage = () => {
  const mockTable = [
    {
      customer: '123.456.789-01',
      room: 2,
      numPeople: 2,
      checkinDate: '2023-01-15',
      checkoutDate: '2023-01-20',
      status: 'COMPLETE',
      totalAmount: 900,
    },
    {
      customer: '789.012.345-10',
      room: 3,
      numPeople: 7,
      checkinDate: '2023-02-10',
      checkoutDate: '2023-02-20',
      status: 'COMPLETE',
      totalAmount: 3300,
    },
    {
      customer: '567.890.123-08',
      room: 1,
      numPeople: 2,
      checkinDate: '2023-03-23',
      checkoutDate: '2023-03-25',
      status: 'ONGOING',
      totalAmount: 400,
    },
    {
      customer: '321.098.765-04',
      room: 1,
      numPeople: 3,
      checkinDate: '2023-04-12',
      checkoutDate: '2023-04-18',
      status: 'PENDING',
      totalAmount: 1200,
    },
    {
      customer: '456.789.012-03',
      room: 5,
      numPeople: 1,
      checkinDate: '2023-05-23',
      checkoutDate: '2023-05-27',
      status: 'PENDING',
      totalAmount: 400,
    },
    {
      customer: '100.000.000-11',
      room: 1,
      numPeople: 2,
      checkinDate: '2023-11-21',
      checkoutDate: '2023-11-30',
      status: 'PENDING',
      totalAmount: 1000,
    },
  ];

  const router = useRouter();

  return (
    <HeroLayout>
      <Header.Root>
        <Header.Title>Agendamentos</Header.Title>
        <Header.Breadcrumbs parent="Dashboard" page="Agendamentos" parentRoute={Routes.Dashboard} />
      </Header.Root>
      <div className="w-full flex flex-col gap-5">
        <div className="w-full flex justify-end">
          <Button onClick={() => router.push(Routes.AddBooking)}>Cadastrar Novo</Button>
        </div>
        <Card>
          <Table.Root>
            <Table.Head>
              <Table.HeadItem>Cliente</Table.HeadItem>
              <Table.HeadItem>Quarto</Table.HeadItem>
              <Table.HeadItem>Data</Table.HeadItem>
              <Table.HeadItem>N° Pessoas</Table.HeadItem>
              <Table.HeadItem>Status</Table.HeadItem>
              <Table.HeadItem>Valor</Table.HeadItem>
            </Table.Head>
            <Table.Body>
              {mockTable.map((item, index) => (
                <Table.Row key={index}>
                  <Table.RowItem>{item.customer}</Table.RowItem>
                  <Table.RowItem>{item.room}</Table.RowItem>
                  <Table.RowItem>
                    {format(item.checkinDate, 'dd/MM/yyyy')} - {format(item.checkoutDate, 'dd/MM/yyyy')}
                  </Table.RowItem>
                  <Table.RowItem>{item.numPeople}</Table.RowItem>
                  <Table.RowItem>
                    <StatusChip status={item.status as any /* TODO: input a type */} />
                  </Table.RowItem>
                  <Table.RowItem>
                    {item.totalAmount.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                  </Table.RowItem>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Card>
      </div>
    </HeroLayout>
  );
};
