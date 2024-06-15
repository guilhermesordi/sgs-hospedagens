import { Header, HeroLayout } from '@/components';
import { Routes } from '@/constants';

export const CustomersPage = () => {
  return (
    <HeroLayout>
      <Header.Root>
        <Header.Title>Clientes</Header.Title>
        <Header.Breadcrumbs parent="Dashboard" page="Clientes" parentRoute={Routes.Dashboard} />
      </Header.Root>
    </HeroLayout>
  );
};
