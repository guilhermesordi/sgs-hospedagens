import { Routes } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

type ItemProps = {
  icon: string;
  label: string;
  to: string;
};

const Item = ({ icon, label, to }: ItemProps) => {
  const router = useRouter();

  const isCurrent = router.pathname === to;

  return (
    <Link
      href={to}
      className={`${isCurrent ? 'bg-white/10' : 'bg-dark'} hover:bg-white/10 transition-all duration-200 w-[230px] px-[15px] py-2 rounded-[3px] justify-start items-center gap-2.5 inline-flex`}
    >
      <span className={`material-icons-round ${isCurrent ? 'text-secondary' : 'text-white'}`}>{icon}</span>
      <div className={`text-base font-medium leading-normal ${isCurrent ? 'text-secondary' : 'text-slate-200'}`}>
        {label}
      </div>
    </Link>
  );
};

export const Sidebar = () => {
  return (
    <div className="w-[280px] h-full px-[25px] pt-[50px] pb-[25px] left-0 top-0 fixed bg-dark flex-col justify-start items-center gap-10 inline-flex">
      <Image width={105} height={86} src="/images/logo-100x100.png" alt="" />
      <div className="flex-col justify-start items-start gap-[25px] flex">
        <div className="flex-col justify-start items-start gap-1.5 flex">
          <Item icon={'dashboard'} label={'Dashboard'} to={Routes.Dashboard} />
          <Item icon={'bookmark'} label={'Agendamentos'} to={Routes.Bookings} />
          <Item icon={'person'} label={'Clientes'} to={Routes.Customers} />
          <Item icon={'door_front'} label={'Quartos'} to={Routes.Rooms} />
          <Item icon={'admin_panel_settings'} label={'Staff'} to={Routes.Staff} />
        </div>
      </div>
      <button onClick={() => sessionStorage.clear()}>
        <Item icon={'logout'} label={'Sair'} to={Routes.Login} />
      </button>
    </div>
  );
};
