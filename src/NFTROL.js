import NftsRol from './NftsRol.json';
import { ethers } from 'ethers';

export const NFTROL = new ethers.Contract(
  '0x75d5Fb26ACe0b373DC38273E7441370a3BB0f81a',
  NftsRol.abi
);

export let provider;

export function setProvider(_provider) {
  provider = _provider;
}

export const mint = async (address, type, range) => {
  let tx;

  const signer = provider.getSigner();
  const NFTROLPROVIDER = NFTROL.connect(signer);
  tx = await NFTROLPROVIDER.mint(address, type, range);
  const txReceipt = await provider.waitForTransaction(tx.hash, 3);
  return { status: txReceipt.status, txHash: tx.hash };
};

export const getType = async (address) => {
  const signer = provider.getSigner();
  const NFTROLPROVIDER = NFTROL.connect(signer);
  const Type = await NFTROLPROVIDER.getType(address);
  return Type;
};

export const getRange = async (address) => {
  const signer = provider.getSigner();
  const NFTROLPROVIDER = NFTROL.connect(signer);
  const Range = await NFTROLPROVIDER.getRange(address);
  return Range;
};
