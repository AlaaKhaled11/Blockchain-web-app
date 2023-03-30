import { useAtom } from 'jotai';
import { useState, useRef } from 'react';

import { loggedInState } from '../../atoms/user';

function AdminLogin() {
  const [error, setError] = useState(false);
  const password = useRef();
  const [loggedIn, setLoggedIn] = useAtom(loggedInState);

  return (
    <div className="flex h-96 flex-col items-center justify-center gap-8">
      <h1 className="text-2xl font-bold">Admin Login</h1>
      <input type="password" ref={password} placeholder="Password" />
      <button className="rounded bg-gray-500 px-4 py-1 text-gray-50 hover:bg-gray-600" onClick={() => (password.current.value === 'password' ? setLoggedIn('admin') : setError(true))}>Login</button>
      <p className="text-red-500">{error && 'Incorrect password'}</p>
    </div>
  );
}

export default AdminLogin;
