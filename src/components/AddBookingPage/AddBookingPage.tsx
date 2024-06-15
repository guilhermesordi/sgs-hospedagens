import { Button, Card, Header, HeroLayout, Input } from '@/components';
import { Routes } from '@/constants';

export const AddBookingPage = () => {
  return (
    <HeroLayout>
      <Header.Root>
        <Header.Title>Cadastro de Agendamentos</Header.Title>
        <Header.Breadcrumbs parent="Agendamentos" page="Cadastro de Agendamentos" parentRoute={Routes.Bookings} />
      </Header.Root>
      <Card removePadding showScroll={false}>
        <div className="px-[50px] py-[15px] text-dark text-base font-medium border-b border-b-[#E2E8F0]">
          Informações do Agendamento
        </div>
        <div className="px-[50px] py-[45px]">
          <div className="w-full h-[395px] flex-col justify-start items-start gap-[30px] inline-flex">
            <div className="w-full justify-start items-start gap-5 inline-flex">
              <Input label="Cliente" placeholder="Ex: 111.111.111-11" />
              <Input label="Quarto" placeholder="Ex: 201" />
            </div>
            <div className="w-full justify-start items-start gap-5 inline-flex">
              <Input label="N° Pessoas" placeholder="Ex: 3" />
              <Input label="Valor total" placeholder="Ex: R$ 1280,05" />
            </div>
            <div className="w-full justify-start items-start gap-5 inline-flex">
              <Input label="Data de checkin" type="date" />
              <Input label="Data de checkout" type="date" />
            </div>
            <div className="self-stretch justify-end items-center gap-2.5 inline-flex">
              <Button size="sm">Enviar</Button>
            </div>
          </div>
        </div>
      </Card>
    </HeroLayout>
  );
};
