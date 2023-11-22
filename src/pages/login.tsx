import { useCallback, useState } from 'react';
import md5 from 'md5';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      const { data } = await axios.get('http://localhost:4000/staff', {
        params: { username, password: md5(password) },
      });
      if (data.length === 1) {
        const user = data[0];
        const cookies = new Cookies();
        cookies.set('roles', user.roles);
        router.push('/dashboard');
        return;
      }
      alert('Usuário não encontrado');
    },
    [password, router, username],
  );

  return (
    <form>
      <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" onClick={onSubmit}>
        Enviar
      </button>
    </form>
  );
}
