import { Header, HeroLayout } from '@/components';
import { Routes } from '@/constants';

export const RoomsPage = () => {
  return (
    <HeroLayout>
      <Header.Root>
        <Header.Title>Quartos</Header.Title>
        <Header.Breadcrumbs parent="Dashboard" page="Quartos" parentRoute={Routes.Dashboard} />
      </Header.Root>
    </HeroLayout>
  );
};
