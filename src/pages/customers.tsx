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

export type Customer = {
  id: string;
  name: string;
  date_of_birth: string;
  email: string;
  cellphone: string;
};

export default function CustomersPage() {
  const [listData, setListData] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getListData = useCallback(async () => {
    const { data } = await axios.get<Customer[]>('http://localhost:4000/customers');
    setListData(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getListData();
  }, [getListData]);

  if (isLoading) return 'Carregando';

  return (
    <>
      <Header>
        <ReturnTo to="dashboard" />
        <Link href={'/add-customer'}>Cadastrar novo</Link>
      </Header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '35px', marginTop: '10px' }}>
        {listData.length > 0
          ? listData.map((customer) => (
              <Card key={customer.id}>
                <span>
                  <strong>CPF:</strong> {customer.id}
                </span>
                <span>
                  <strong>Nome:</strong> {customer.name}
                </span>
                <span>
                  <strong>Data nascimento:</strong> {customer.date_of_birth}
                </span>
                <span>
                  <strong>Email:</strong> {customer.email}
                </span>
                <span>
                  <strong>Celular:</strong> {customer.cellphone}
                </span>
              </Card>
            ))
          : 'Nenhum cliente encontrado'}
      </div>
    </>
  );
}
