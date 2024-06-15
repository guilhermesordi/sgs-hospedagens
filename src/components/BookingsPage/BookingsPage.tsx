import { Header, HeroLayout } from '@/components';
import { Routes } from '@/constants';

export const BookingsPage = () => {
  return (
    <HeroLayout>
      <Header.Root>
        <Header.Title>Agendamentos</Header.Title>
        <Header.Breadcrumbs parent="Dashboard" page="Agendamentos" parentRoute={Routes.Dashboard} />
      </Header.Root>
      <div></div>
    </HeroLayout>
  );
};
