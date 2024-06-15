type ButtonProps = React.PropsWithChildren<{
  onClick?: () => void;
  disabled?: boolean;
}>;

export const Button = ({ children, disabled, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full h-[50px] py-[15px] bg-primary rounded justify-center items-center gap-2.5 inline-flex text-center text-white text-base font-medium leading-normal"
    >
      {children}
    </button>
  );
};
