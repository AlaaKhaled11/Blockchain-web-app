import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';

function Home() {
  const router = useRouter();
  const { user } = useAuth();
  return (
    <div className="flex h-96 items-center justify-center gap-4">
      {/* <button className="rounded bg-gray-500 px-4 py-1 text-gray-50 hover:bg-gray-600" onClick={() => router.push('/forSale')}>For Sale</button> */}
      <button className="rounded bg-gray-500 px-4 py-1 text-gray-50 hover:bg-gray-600" onClick={() => router.push(`/user/${user.metamaskId}`)}>View owned cars</button>
    </div>
  );
}

export default Home;
