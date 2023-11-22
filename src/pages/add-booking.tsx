/* eslint-disable camelcase */
import { Header, ReturnTo } from '@/components';
import { Customer } from './customers';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
import { Booking } from './bookings';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  
  button {
    all: unset;
    height: 40px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: lightblue;
    background-color: #66d;

    &:hover {
      background-color: #55c;
    }
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;

  font-size: 20px;

  input {
    all: unset;
    width: 500px;
    height: 40px;
    font-size: 16px;
    background-color: lightblue;
    padding: 5px 10px;
    border-radius: 20px;
  }

  label{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

`;


export default function AddCustomerPage() {
  const [customer, setCustomer] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [numPeople, setNumPeople] = useState<string>('');
  const [checkinDate, setCheckinDate] = useState<string>('');
  const [checkoutDate, setCheckoutDate] = useState<string>('');
  const [totalAmount, setTotalAmount] = useState<string>('');

  const router = useRouter();

  const onSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      const cookies = new Cookies();
      const roles = cookies.get('roles');

      const staffRole = roles.indexOf('ADMIN');
      if (staffRole !== -1) {
        if (
          customer !== '' &&
          room !== '' &&
          numPeople !== '' &&
          checkinDate !== '' &&
          checkoutDate !== '' &&
          totalAmount !== ''
        ) {
          const now = new Date();

          const payload: Omit<Booking, 'id'> = {
            customer,
            room: +room,
            num_people: +numPeople,
            checkin_date: checkinDate,
            checkout_date: checkoutDate,
            created_tmz: now.toISOString(),
            updated_tmz: now.toISOString(),
            status: 'PENDING',
            total_amount: +totalAmount,
          };
          await axios.post('http://localhost:4000/bookings', payload);
          router.push('/bookings');
        } else {
          alert('Preencha todos os campos corretamente!');
        }
      }
    },
    [checkinDate, checkoutDate, customer, numPeople, room, router, totalAmount],
  );

  return (
    <>
      <Header>
        <ReturnTo to="bookings" />
      </Header>
      <Form onSubmit={onSubmit}>
        <h1>Cadastro de agendamentos</h1>
        <ItemContainer>
          <label htmlFor="customer">Cliente</label>
          <input type="text" name="customer" value={customer} onChange={(e) => setCustomer(e.target.value)} />
        </ItemContainer>
        <ItemContainer>
          <label htmlFor="room">Quarto</label>
          <input type="text" name="room" value={room} onChange={(e) => setRoom(e.target.value)} />
        </ItemContainer>
        <ItemContainer>
          <label htmlFor="numPeople">N° pessoas</label>
          <input type="text" name="numPeople" value={numPeople} onChange={(e) => setNumPeople(e.target.value)} />
        </ItemContainer>
        <ItemContainer>
          <label htmlFor="checkinDate">Data de checking</label>
          <input type="text" name="checkinDate" value={checkinDate} onChange={(e) => setCheckinDate(e.target.value)} />
        </ItemContainer>
        <ItemContainer>
          <label htmlFor="checkoutDate">Data de checkout</label>
          <input
            type="text"
            name="checkoutDate"
            value={checkoutDate}
            onChange={(e) => setCheckoutDate(e.target.value)}
          />
        </ItemContainer>
        <ItemContainer>
          <label htmlFor="totalAmount">Valor total</label>
          <input type="text" name="totalAmount" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} />
        </ItemContainer>
        <button type="submit">Enviar</button>
      </Form>
    </>
  );
}
