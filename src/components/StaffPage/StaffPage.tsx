import { Header, HeroLayout } from '@/components';
import { Routes } from '@/constants';

export const StaffPage = () => {
  return (
    <HeroLayout>
      <Header.Root>
        <Header.Title>Staff</Header.Title>
        <Header.Breadcrumbs parent="Dashboard" page="Staff" parentRoute={Routes.Dashboard} />
      </Header.Root>
    </HeroLayout>
  );
};
