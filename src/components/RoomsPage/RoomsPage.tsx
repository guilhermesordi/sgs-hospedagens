import { Card, Header, HeroLayout, Table } from '@/components';
import { Routes } from '@/constants';
import { Modal } from './Modal';
import { useCallback, useState } from 'react';

type Amenities = { label: string; icon: string }[];

export type Room = {
  number: number;
  description: string;
  capacity: number;
  numBathrooms: number;
  price: number;
  amenities: Amenities;
};

export const RoomsPage = () => {
  const mockTable: Room[] = [
    {
      number: 1,
      description: 'Quarto de Apolo',
      capacity: 5,
      numBathrooms: 3,
      price: 200,
      amenities: [
        { label: 'Ar condicionado', icon: 'ac_unit' },
        { label: 'Wifi', icon: 'wifi' },
        { label: 'Jacuzzi', icon: 'bathtub' },
      ],
    },
    {
      number: 2,
      description: 'Quarto de Artemis',
      capacity: 4,
      numBathrooms: 2,
      price: 150,
      amenities: [
        { label: 'Ar condicionado', icon: 'ac_unit' },
        { label: 'Wifi', icon: 'wifi' },
      ],
    },
    {
      number: 3,
      description: 'Quarto de Athena',
      capacity: 8,
      numBathrooms: 4,
      price: 300,
      amenities: [
        { label: 'Wifi', icon: 'wifi' },
        { label: 'Jacuzzi', icon: 'bathtub' },
      ],
    },
    {
      number: 4,
      description: 'Quarto de Hermes',
      capacity: 6,
      numBathrooms: 2,
      price: 250,
      amenities: [
        { label: 'Ar condicionado', icon: 'ac_unit' },
        { label: 'Wifi', icon: 'wifi' },
      ],
    },
    {
      number: 5,
      description: 'Quarto de Hades',
      capacity: 2,
      numBathrooms: 1,
      price: 100,
      amenities: [{ label: 'Wifi', icon: 'wifi' }],
    },
  ];

  const [modalData, setModalData] = useState<Room | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback((item: Room) => {
    setModalData(item);
    setIsModalOpen(true);
  }, []);

  return (
    <HeroLayout>
      <Header.Root>
        <Header.Title>Quartos</Header.Title>
        <Header.Breadcrumbs parent="Dashboard" page="Quartos" parentRoute={Routes.Dashboard} />
      </Header.Root>
      <div className="w-full flex flex-col gap-5">
        <Card>
          <Table.Root>
            <Table.Head>
              <Table.HeadItem>N°</Table.HeadItem>
              <Table.HeadItem>Descrição</Table.HeadItem>
              <Table.HeadItem>Banheiros</Table.HeadItem>
              <Table.HeadItem>Lotação</Table.HeadItem>
              <Table.HeadItem>Preço</Table.HeadItem>
              <Table.HeadItem></Table.HeadItem>
            </Table.Head>
            <Table.Body>
              {mockTable.map((item, index) => (
                <Table.Row key={index}>
                  <Table.RowItem>{item.number}</Table.RowItem>
                  <Table.RowItem>{item.description}</Table.RowItem>
                  <Table.RowItem>{item.numBathrooms}</Table.RowItem>
                  <Table.RowItem>{item.capacity}</Table.RowItem>
                  <Table.RowItem>
                    {item.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                  </Table.RowItem>
                  <div className="h-[66px] flex items-center">
                    <button
                      onClick={() => handleOpenModal(item)}
                      className="material-icons-round text-[#1C2434] p-1 rounded-full hover:bg-dark/10"
                    >
                      visibility
                    </button>
                  </div>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Card>
      </div>
      <Modal item={modalData} isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} />
    </HeroLayout>
  );
};
