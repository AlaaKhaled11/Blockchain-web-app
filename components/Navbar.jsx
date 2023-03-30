import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import Link from 'next/link';
import useAuth from '../hooks/useAuth';

import { loggedInState } from '../atoms/user';

function Navbar() {
  const { user, logout } = useAuth();
  const [temp, setTemp] = useState('');
  const [loggedIn] = useAtom(loggedInState);

  useEffect(() => {
    setTemp(loggedIn);
  }, [loggedIn]);

  return (
    <nav className="bg-gray-600 py-2">
      <div className="container flex justify-between">
        <Link href={user.metamaskId ? '/' : '/login'}>
          <a rel="noopener noreferrer" className="text-gray-50">
            Cars Chain
          </a>
        </Link>
        <Link href={`/user/${user.account}`}>
          <a className="text-gray-50">
            <small><span id="account">{user.account}</span></small>
          </a>
        </Link>
        <button className={temp ? 'text-gray-50 opacity-100' : 'opacity-0'} disabled={!temp} onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
