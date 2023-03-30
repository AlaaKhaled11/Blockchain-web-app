import useTruffle from '../hooks/useTruffle';

function RegisteredCars() {
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
            <th scope="col" />
          </tr>
        </thead>
        <tbody id="productList" className="divide-y-2">
          {user.products && user.products.map((product) => (product.forSale ? (
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
              <td>

                { product.owner === user.account
                  ? (
                    <button className="rounded bg-gray-500 px-2 py-1 text-gray-50 hover:bg-gray-600" onClick={() => removeFromStore(product.id)}>
                      Remove from store
                    </button>
                  )
                  : (
                    <button className="rounded bg-gray-500 px-2 py-1 text-gray-50 hover:bg-gray-600" onClick={() => purchaseProduct(product.id, product.price)}>
                      Transfer ownership
                    </button>
                  )}

              </td>
            </tr>
          ) : null))}
        </tbody>
      </table>
    </div>
  );
}

export default RegisteredCars;
