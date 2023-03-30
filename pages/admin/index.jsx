import { useRouter } from 'next/router';

function Admin() {
  const router = useRouter();
  return (
    <div className="flex h-96 items-center justify-center gap-8">
      <button className="rounded bg-gray-500 px-4 py-1 text-gray-50 hover:bg-gray-600" onClick={() => router.push('/admin/allCars')}>View all registered cars</button>
      <button className="rounded bg-gray-500 px-4 py-1 text-gray-50 hover:bg-gray-600" onClick={() => router.push('/admin/addCar')}>Register new car</button>
    </div>
  );
}

export default Admin;
