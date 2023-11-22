import { ReturnTo, Header } from '@/components';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #66d;
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 25px;
`;

type Room = {
  number: number;
  description: string;
  capacity: number;
  ac: boolean;
  wifi: boolean;
  num_bathrooms: number;
  jacuzzi: boolean;
  price: number;
};

export default function AddRoomPage() {
  const [listData, setListData] = useState<Room[]>([]);

  const getListData = useCallback(async () => {
    const { data } = await axios.get<Room[]>('http://localhost:4000/rooms');
    setListData(data);
  }, []);

  const getRoomIcon = (roomItem: boolean) => {
    return roomItem ? '✓' : '✕';
  };

  useEffect(() => {
    getListData();
  }, [getListData]);

  return (
    <>
      <Header>
        <ReturnTo to={'dashboard'} />
      </Header>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', marginTop: '10px' }}>
        {listData.length > 0
          ? listData.map((room) => (
              <Card key={room.number}>
                <span>
                  {room.number} - {room.description} - N° banheiros: {room.num_bathrooms} - Lotação: {room.capacity}
                </span>
                <span>
                  Ar condicionado {getRoomIcon(room.ac)} Wifi {getRoomIcon(room.wifi)} Jacuzzi{' '}
                  {getRoomIcon(room.jacuzzi)}
                </span>
                <span>{room.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
              </Card>
            ))
          : 'Nenhum quarto encontrado'}
      </div>
    </>
  );
}
