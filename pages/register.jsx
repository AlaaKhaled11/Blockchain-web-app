import { useRef } from 'react';
import useTruffle from '../hooks/useTruffle';
import useAuth from '../hooks/useAuth';

function Register() {
  const { user } = useTruffle();
  const { createUser } = useAuth();

  const password = useRef();

  return (
    <div className="flex h-96 flex-col items-center justify-center gap-8">
      <h1 className="text-2xl font-bold">Register</h1>
      <h3 className="font-light">{user.account}</h3>
      <input type="password" ref={password} placeholder="Password" />
      <button className="rounded bg-gray-500 px-4 py-1 text-gray-50 hover:bg-gray-600" onClick={() => createUser(user.account, password.current.value)}>Register</button>
    </div>
  );
}

export default Register;
