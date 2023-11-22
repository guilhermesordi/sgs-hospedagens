import Link from 'next/link';

export const ReturnTo = ({ to }: { to: string }) => {
  return (
    <Link href={`/${to}`}>
      Retornar à <strong>{to}</strong>
    </Link>
  );
};
