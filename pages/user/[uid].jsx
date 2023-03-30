import { useState } from 'react';
import { useRouter } from 'next/router';
import useTruffle from '../../hooks/useTruffle';
import TransferCarModal from '../../components/TransferCarModal';

function UserPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [product, setProduct] = useState('');
  const { user } = useTruffle();

  const router = useRouter();

  const { uid } = router.query;
  return (
    <>
      <TransferCarModal active={modalOpen} setActive={setModalOpen} product={product} />
      <div className="container pt-6">
        <h2 className="text-2xl font-bold">Registered cars</h2>
        <table className="mt-2 w-full table-auto">
          <thead className="border-b">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col">Address</th>
              <th scope="col">Plates</th>
              <th scope="col">VIN</th>
              <th scope="col">Engine No.</th>
              <th scope="col">For Sale</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody id="productList" className="divide-y-2">
            { user.products && user.products.map((_product) => (
              _product.owner === uid ? (
                <tr key={_product.id.toString()}>
                  <th scope="row">{_product.id.toString()}</th>
                  <td>{_product.name}</td>
                  <td>
                    {window.web3.utils.fromWei(_product.price.toString(), 'Ether')}
                    {' '}
                    Eth
                  </td>
                  <td>{_product.owner}</td>
                  <td>{_product.Address}</td>
                  <td>{_product.plates}</td>
                  <td>{_product.VIN}</td>
                  <td>{_product.engineno}</td>
                  <td>{_product.forSale ? 'Yes' : 'No'}</td>
                  <td>
                    <button className="rounded bg-gray-500 px-4 py-1 text-gray-50 hover:bg-gray-600" onClick={() => { setProduct(_product.id); setModalOpen(true); }}>Transfer Ownership</button>
                  </td>
                </tr>
              ) : null
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserPage;
