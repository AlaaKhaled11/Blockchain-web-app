/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';
import useTruffle from '../hooks/useTruffle';

function Login() {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');
  const password = useRef();

  const { user: { account } } = useTruffle();
  const { user, login } = useAuth();

  useEffect(() => {
    if (user.metamaskId) router.push('/');
  }, []);

  return (
    <div className="container flex h-96 flex-col items-center justify-center gap-4 py-6">
      <h1 className="text-2xl font-bold">Login</h1>
      <h3 className="mt-4 font-light">{user.account}</h3>
      <input
        type="password"
        ref={password}
        className="rounded border px-1 py-0.5 shadow"
        placeholder="Password"
        onKeyDown={({ key }) => (key === 'Enter') && login(account, password.current.value)}
      />
      <button onClick={async () => setErrorMsg(await login(account, password.current.value))} className="rounded bg-gray-500 px-4 py-1 text-gray-50 hover:bg-gray-600">Login</button>
      <p>{errorMsg}</p>

      <Link href="/register"><a className="text-blue-500 hover:underline">Don&apos;t have an account?</a></Link>
    </div>
  );
}

export default Login;
