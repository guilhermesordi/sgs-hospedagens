import Image from 'next/image';
import * as S from './LoginPage.styles';
import { Button, Input } from '@/components';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { Routes } from '@/constants';
import { postLogin } from '@/services';
import md5 from 'md5';

export const LoginPage = () => {
  const router = useRouter();

  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleSubmit = useCallback(async () => {
    if (username && password) {
      const { isError, data } = await postLogin({ username, password: md5(password) });

      if (!isError) {
        sessionStorage.setItem('user', data.user.id);
        router.push(Routes.Dashboard);
      }
    }
  }, [password, router, username]);

  return (
    <S.Container>
      <div className="w-[60%] h-full position bg-[url('/images/login-banner.png')] bg-center bg-no-repeat bg-cover flex items-center justify-center">
        <Image src={'/images/logo-400x400.png'} width={481} height={396} alt={''} />
      </div>
      <div className="w-[40%] h-full px-20 bg-slate-100 border-l-2 border-secondary flex-col justify-center items-start gap-20 inline-flex">
        <div className="self-stretch h-[69px] flex-col justify-start items-start flex">
          <div className="self-stretch text-secondary text-base font-medium leading-normal">Dashboard</div>
          <div className="w-[450.04px] text-dark text-[33px] font-bold leading-[45px]">Acesse sua conta</div>
        </div>
        <div className="self-stretch h-[300px] flex-col justify-start items-start gap-10 flex">
          <Input label={'Usuário'} placeholder={'Digite o seu usuário aqui'} value={username} onChange={setUsername} />
          <Input
            label={'Senha'}
            placeholder={'Digite a sua senha aqui'}
            value={password}
            onChange={setPassword}
            type="password"
          />
          <Button onClick={handleSubmit} size="fill">
            Acessar
          </Button>
        </div>
      </div>
    </S.Container>
  );
};
