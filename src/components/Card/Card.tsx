type CardProps = React.PropsWithChildren<{}>;

export const Card = ({ children }: CardProps) => {
  return (
    <div className="w-full bg-white p-[30px] rounded-sm	border border-[#E2E8F0] drop-shadow-xl overflow-auto max-w-full">
      {children}
    </div>
  );
};
