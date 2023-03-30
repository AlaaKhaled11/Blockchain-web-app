import { useRef } from 'react';
import useTruffle from '../../hooks/useTruffle';

function AddCar() {
  const name = useRef('');
  const price = useRef('');
  const address = useRef('');
  const plates = useRef('');
  const vin = useRef('');
  const engineNo = useRef('');
  const owner = useRef('');
  const { createProduct, loading } = useTruffle();

  if (loading) return <div id="loader"><p>Loading...</p></div>;

  return (
    <div className="container pt-8">
      <main role="main" className="">
        <form
          className="flex flex-col items-center gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            createProduct(
              name.current.value,
              price.current.value,
              address.current.value,
              plates.current.value,
              vin.current.value,
              engineNo.current.value,
              owner.current.value,
            );
          }}
        >
          <h1 className="text-2xl font-bold">Add Car</h1>
          <input
            id="productName"
            type="text"
            ref={name}
            placeholder="Car Name"
            required
          />
          <input
            id="productPrice"
            type="text"
            ref={price}
            placeholder="Gas fees"
            required
          />
          <input
            id="productOwner"
            type="text"
            ref={owner}
            placeholder="Owner Id"
            required
          />
          <input
            id="productAddress"
            type="text"
            ref={address}
            placeholder="Owner Address"
            required
          />
          <input
            id="productplates"
            type="text"
            ref={plates}
            placeholder="Car plates"
            required
          />
          <input
            id="productVIN"
            type="text"
            ref={vin}
            placeholder="Vehicle identification number"
            required
          />
          <input
            id="productengineno"
            type="text"
            ref={engineNo}
            placeholder="Engine number"
            required
          />
          <button type="submit" className="rounded bg-gray-500 px-4 py-1 text-gray-50 hover:bg-gray-600">Add Car</button>
        </form>
      </main>
    </div>
  );
}

export default AddCar;
