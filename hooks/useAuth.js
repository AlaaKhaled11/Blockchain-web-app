import { useRouter } from 'next/router';
import axios from 'axios';
import { useAtom } from 'jotai';
import { loggedInState, userState } from '../atoms/user';

const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useAtom(userState);
  const [loggedIn, setLoggedIn] = useAtom(loggedInState);

  if (user.metamaskId) {
    return {
      user, createUser: null, login: null, logout() { setUser({}); setLoggedIn(''); },
    };
  }

  if (loggedIn) {
    return { user, logout() { setLoggedIn(''); } };
  }

  return {
    user,
    async createUser(metamaskId, password) {
      const res = await axios.post('/api/createUser', { metamaskId, password });
      setUser((_user) => ({ ..._user, ...res.data.user }));
      setLoggedIn(metamaskId);
      router.push('/');
    },
    async login(metamaskId, password) {
      const res = await axios.get('/api/login', { params: { metamaskId, password } });
      if (!res.data.user) {
        return 'User not found';
      }
      setUser((_user) => ({ ..._user, ...res.data.user }));
      setLoggedIn(metamaskId);
      router.push('/');
      return '';
    },
  };
};

export default useAuth;
