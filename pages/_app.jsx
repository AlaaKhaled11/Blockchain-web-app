/* eslint-disable react-hooks/exhaustive-deps */
import '../styles/globals.css';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import axios from 'axios';
import Image from 'next/future/image';
import Navbar from '../components/Navbar';
import useTruffle from '../hooks/useTruffle';
import { loggedInState, userState } from '../atoms/user';

import HandShakeImage from '../assets/WhatsApp Image 2022-07-13 at 9.17.41 PM.jpeg';

function AppRoot({ children }) {
  const router = useRouter();
  const [user, setUser] = useAtom(userState);
  const [loggedIn, setLoggedIn] = useAtom(loggedInState);
  const { user: { account } } = useTruffle();

  const getUser = async () => {
    const res = await axios.post('/api/getUser', { metamaskId: account });
    setUser((_user) => ({ ..._user, ...res.data.user }));
    setLoggedIn(account);
    router.push('/');
  };

  useEffect(() => {
    switch (router.route) {
      case '/admin/addCar':
      case '/admin/allCars':
        if (loggedIn !== 'admin') { if (user.metamaskId) router.push('/'); else router.push('/login'); }
        break;
      case '/admin':
        if (loggedIn !== 'admin') router.push('/login');
        break;
      case '/admin/login':
        if (loggedIn === 'admin') { router.push('/admin'); break; }
        setLoggedIn('');
        break;
      case '/register':
        if (account !== loggedIn) setLoggedIn('');
        break;
      default:
        if (loggedIn === account && !user.metamaskId) getUser();
        else if (loggedIn === 'admin') router.push('/admin');
        else if (!loggedIn) router.push('/login');
        break;
    }
  }, [router.route, loggedIn]);

  return children;
}

function MyApp({ Component, pageProps }) {
  return (
    <AppRoot>
      <Image alt="Handshake" src={HandShakeImage} className="fixed z-[-10] h-screen object-cover opacity-25" />
      <Navbar />
      <Component {...pageProps} />
    </AppRoot>
  );
}

export default MyApp;
