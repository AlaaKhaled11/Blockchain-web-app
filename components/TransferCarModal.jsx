import { useRef } from 'react';
import { Dialog } from '@headlessui/react';
import useTruffle from '../hooks/useTruffle';

function TransferCarModal({ active, setActive, product }) {
  const buyer = useRef();
  const { transferProduct } = useTruffle();

  return (
    <Dialog className="fixed inset-0 flex items-center justify-center bg-black/25" open={active} onClose={() => setActive(false)}>
      <Dialog.Panel className="flex w-1/2 flex-col rounded-xl bg-gray-50 p-4">
        <Dialog.Title className="text-2xl font-bold">Transfer car ownership</Dialog.Title>
        <Dialog.Description>
          Enter the buyer&apos;s id below and click transfer
        </Dialog.Description>

        <input type="text" ref={buyer} className="mt-4 border px-2 py-1" placeholder="Buyer's id" />

        <div className="mt-4 flex gap-4 self-end">
          <button className="rounded px-2 py-1 hover:bg-gray-600 hover:text-gray-50" onClick={() => setActive(false)}>Cancel</button>
          <button className="rounded px-2 py-1 hover:bg-gray-600 hover:text-gray-50" onClick={() => transferProduct(product, buyer.current.value)}>Transfer</button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

export default TransferCarModal;
