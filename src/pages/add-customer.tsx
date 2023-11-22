import { Header, ReturnTo } from '@/components';
import { Customer } from './customers';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';

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
`;

export default function AddCustomerPage() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [documentNumber, setDocumentNumber] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [cellphone, setCellphone] = useState<string>('');

  const router = useRouter();

  const onSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      const cookies = new Cookies();
      const roles = cookies.get('roles');

      const staffRole = roles.indexOf('ADMIN');
      if (staffRole !== -1) {
        if (
          cellphone.length === 14 &&
          dateOfBirth !== '' &&
          documentNumber.length === 14 &&
          email !== '' &&
          name !== ''
        ) {
          // eslint-disable-next-line camelcase
          const payload: Customer = { cellphone, date_of_birth: dateOfBirth, id: documentNumber, email, name };
          await axios.post('http://localhost:4000/customers', payload);
          router.push('/customers');
        } else {
          alert('Preencha todos os campos corretamente!');
        }
      }
    },
    [cellphone, dateOfBirth, documentNumber, email, name, router],
  );

  return (
    <>
      <Header>
        <ReturnTo to="customers" />
      </Header>
      <Form onSubmit={onSubmit}>
        <h1>Cadastro de clientes</h1>
        <ItemContainer>
          <label htmlFor="name">Nome</label>
          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </ItemContainer>
        <ItemContainer>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </ItemContainer>
        <ItemContainer>
          <label htmlFor="documentNumber">Numero de documento</label>
          <input
            type="text"
            name="documentNumber"
            value={documentNumber}
            onChange={(e) => setDocumentNumber(e.target.value)}
          />
        </ItemContainer>
        <ItemContainer>
          <label htmlFor="dateOfBirth">Data de nascimento</label>
          <input type="text" name="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        </ItemContainer>
        <ItemContainer>
          <label htmlFor="cellphone">Celular</label>
          <input type="text" name="cellphone" value={cellphone} onChange={(e) => setCellphone(e.target.value)} />
        </ItemContainer>
        <button type="submit">Enviar</button>
      </Form>
    </>
  );
}
