import useTruffle from '../../hooks/useTruffle';

function AllCars() {
  const { user, purchaseProduct, removeFromStore } = useTruffle();

  return (
    <div className="container pt-6">
      <h2 className="text-2xl font-bold">Registered cars</h2>
      <table className="mt-4 w-full table-auto">
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
          </tr>
        </thead>
        <tbody id="productList" className="divide-y-2">
          {user.products && user.products.map((product) => (
            <tr key={product.id.toString()}>
              <td>{product.id.toString()}</td>
              <td>{product.name}</td>
              <td>
                {window.web3.utils.fromWei(product.price.toString(), 'Ether')}
                {' '}
                Eth
              </td>
              <td>{product.owner}</td>
              <td>{product.Address}</td>
              <td>{product.plates}</td>
              <td>{product.VIN}</td>
              <td>{product.engineno}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllCars;
