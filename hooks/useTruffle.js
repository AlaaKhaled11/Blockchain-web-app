/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { useAtom } from 'jotai';
import Marketplace from '../abis/Marketplace.json';
import { userState } from '../atoms/user';

async function loadBlockchainData(setUser, setLoading) {
  const { web3 } = window;
  // Load account
  const accounts = await web3.eth.getAccounts();
  const temp = { account: accounts[0] };
  const networkId = await web3.eth.net.getId();
  const networkData = Marketplace.networks[networkId];
  if (networkData) {
    const marketplace = new web3.eth.Contract(Marketplace.abi, networkData.address, { from: temp.account });
    temp.marketplace = marketplace;
    const productCount = await marketplace.methods.productCount().call();
    temp.productCount = productCount;
    // Load products
    const products = [];
    for (let i = 1; i <= productCount; i += 1) {
      products.push(marketplace.methods.products(i).call());
    }
    temp.products = await Promise.all(products);
    setUser((user) => ({ ...user, ...temp }));
    setLoading(false);
  } else {
    window.alert('Marketplace contract not deployed to detected network.');
  }
}

async function loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
}

function createProduct(name, price, Address, plates, VIN, engineno, owner, user, setLoading) {
  setLoading(true);
  const etherPrice = window.web3.utils.toWei(price, 'Ether');
  user.marketplace.methods.createProduct(name, etherPrice, Address, plates, VIN, engineno, owner).send()
    .on('receipt', () => setLoading(false));
}

function purchaseProduct(id, price, user, setLoading) {
  setLoading(true);
  user.marketplace.methods.purchaseProduct(id).send({ value: price })
    .on('receipt', () => setLoading(false));
}

function transferProduct(id, buyer, user, setLoading) {
  setLoading(true);
  const etherPrice = window.web3.utils.toWei('0.1', 'Ether');
  user.marketplace.methods.transferOwnership(id, buyer).send({ value: etherPrice })
    .on('receipt', () => setLoading(false));
}

function addToStore(id, user, setLoading) {
  setLoading(true);
  const price = window.web3.utils.toWei('0.01', 'Ether');
  user.marketplace.methods.addToStore(id).send({ value: price })
    .on('receipt', () => setLoading(false));
}

function removeFromStore(id, user, setLoading) {
  setLoading(true);
  const price = window.web3.utils.toWei('0.01', 'Ether');
  user.marketplace.methods.removeFromStore(id).send({ value: price })
    .on('receipt', () => setLoading(false));
}

const useTruffle = () => {
  const [user, setUser] = useAtom(userState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await loadWeb3();
      await loadBlockchainData(setUser, setLoading);
    })();
  }, []);

  return {
    user,
    loading,
    createProduct(name, price, Address, plates, VIN, engineno, owner) { createProduct(name, price, Address, plates, VIN, engineno, owner, user, setLoading); },
    purchaseProduct(id, price) { purchaseProduct(id, price, user, setLoading); },
    addToStore(id) { addToStore(id, user, setLoading); },
    removeFromStore(id) { removeFromStore(id, user, setLoading); },
    transferProduct(id, buyer) { transferProduct(id, buyer, user, setLoading); },
  };
};

export default useTruffle;
