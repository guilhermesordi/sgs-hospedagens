import { Sidebar } from '@/components';

type HeroLayoutProps = React.PropsWithChildren<{}>;

export const HeroLayout = ({ children }: HeroLayoutProps) => {
  return (
    <div className="w-[100vw] min-h-[100vh] relative">
      <Sidebar />
      <div className="w-[calc(100vw-280px)] ml-[280px] h-full bg-slate-100 p-[50px]">{children}</div>
    </div>
  );
};
