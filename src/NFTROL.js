import NftsRol from './NftsRol.json';
import { ethers } from 'ethers';

export const NFTROL = new ethers.Contract(NftsRol.address, NftsRol.abi);

export let provider;

export function setProvider(_provider) {
  provider = _provider;
}

export const mint = async (address, type, range) => {
  let tx;

  //const signer = provider.getSigner();
  const NFTROLPROVIDER = NFTROL.connect(provider);
  tx = await NFTROLPROVIDER.mint(address, type, range);
  await tx.wait();
  const txReceipt = await provider.waitForTransaction(tx.hash, 3);
  return { status: txReceipt.status, txHash: tx.hash };
};

export const getType = async (address) => {
  //const signer = provider.getSigner();
  const NFTROLPROVIDER = NFTROL.connect(provider);
  const Type = await NFTROLPROVIDER.getType(address);
  return Type;
};

export const getRange = async (address) => {
  //const signer = provider.getSigner();
  const NFTROLPROVIDER = NFTROL.connect(provider);
  const Range = await NFTROLPROVIDER.getRange(address);
  return Range;
};

export const exist = async (address) => {
  //const signer = provider.getSigner();
  const NFTROLPROVIDER = NFTROL.connect(provider);
  const _exist = await NFTROLPROVIDER.exist(address);
  return _exist;
};
