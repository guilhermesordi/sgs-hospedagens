/* eslint-disable camelcase */
import { Header, MasterGuard, ReturnTo } from '@/components';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Staff } from './staff';
import md5 from 'md5';

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

const ItemContainerCheck = styled.div`
  display: flex;
  flex-direction: column;

  font-size: 20px;

  input {
    width: 500px;
    height: 40px;
    font-size: 16px;
  }
`;

export default function EditStaffPage() {
  const router = useRouter();
  const [name, setName] = useState<string>(typeof router?.query?.name === 'string' ? router.query.name : '');
  const [username, setUsername] = useState<string>(
    typeof router?.query?.username === 'string' ? router.query.username : '',
  );
  const [password, setPassword] = useState<string>('');
  const [active, setActive] = useState<boolean>(
    typeof router?.query?.active === 'string' ? router.query.active === 'true' : false,
  );

  const onSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (name !== '' && username !== '' && password !== '') {
        const now = new Date();
        const payload = {
          name,
          username,
          password: md5(password),
          active,
          update_tmz: now.toISOString(),
        };
        await axios.patch(`http://localhost:4000/staff/${router.query.id}`, payload);
        router.push('/staff');
      } else {
        alert('Preencha todos os campos corretamente!');
      }
    },
    [active, name, password, router, username],
  );

  return (
    <MasterGuard>
      <Header>
        <ReturnTo to="staff" />
      </Header>
      <Form onSubmit={onSubmit}>
        <h1>Edição de Staff</h1>
        <ItemContainer>
          <label htmlFor="name">Nome</label>
          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </ItemContainer>
        <ItemContainer>
          <label htmlFor="username">Username</label>
          <input type="email" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </ItemContainer>
        <ItemContainer>
          <label htmlFor="password">Senha</label>
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </ItemContainer>
        <ItemContainerCheck>
          <label htmlFor="active">Ativo</label>
          <input type="checkbox" name="active" checked={active} onChange={(e) => setActive(e.target.checked)} />
        </ItemContainerCheck>
        <button type="submit">Enviar</button>
      </Form>
    </MasterGuard>
  );
}
