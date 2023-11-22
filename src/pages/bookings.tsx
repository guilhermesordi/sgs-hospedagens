import { ReturnTo, Header } from '@/components';
import axios from 'axios';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const Card = styled.div`
    background-color: #66d;
    display: flex; 
    flex-direction: column;
    padding: 15px;
    border-radius: 25px;
`;

export type Booking = {
  id: number;
  customer: string;
  room: number;
  num_people: number;
  checkin_date: string;
  checkout_date: string;
  created_tmz: string;
  updated_tmz: string;
  status: string;
  total_amount: number;
};

export default function CustomersPage() {
  const [listData, setListData] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getListData = useCallback(async () => {
    const { data } = await axios.get<Booking[]>('http://localhost:4000/bookings');
    setListData(data);
    setIsLoading(false);
  }, []);

  const handleUpdateStatus = useCallback(
    async (id: number, status: string) => {
      const newStatus = status === 'PENDING' ? 'ONGOING' : status === 'ONGOING' ? 'COMPLETE' : '';

      if (newStatus !== '') {
        const now = new Date();
        await axios.patch<Booking[]>(`http://localhost:4000/bookings/${id}`, {
          status: newStatus,
          // eslint-disable-next-line camelcase
          updated_tmz: now.toISOString(),
        });
        getListData();
      }
    },
    [getListData],
  );

  useEffect(() => {
    getListData();
  }, [getListData]);

  if (isLoading) return 'Carregando';

  return (
    <>
      <Header>
        <ReturnTo to="dashboard" />
        <Link href={'/add-booking'}>Cadastrar novo</Link>
      </Header>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '35px', marginTop: '10px' }}>
        {listData.length > 0
          ? listData.map((booking) => (
              <Card  key={booking.id}>
                <span>
                  <strong>Cliente:</strong> {booking.customer}
                </span>
                <span>
                  <strong>Quarto:</strong> {booking.room}
                </span>
                <span>
                  <strong>Data:</strong> {booking.checkin_date} - {booking.checkout_date}
                </span>
                <span>
                  <strong>N° pessoas:</strong> {booking.num_people}
                </span>
                <span>
                  <strong>Status:</strong> {booking.status}{' '}
                  {booking.status === 'COMPLETE' ? null : (
                    <button type="button" onClick={() => handleUpdateStatus(booking.id, booking.status)}>
                      →
                    </button>
                  )}
                </span>
                <span>
                  <strong>Valor total:</strong>{' '}
                  {booking.total_amount.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                </span>
              </Card>
            ))
          : 'Nenhum agendamento encontrado'}
      </div>
    </>
  );
}
