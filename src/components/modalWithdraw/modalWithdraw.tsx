import React, { useState } from 'react';
import { useModal } from '@/components/modal-views/context';
import { disconectWallet } from '../../redux/Blockchain/blockchainAction';
import { useDispatch, useSelector } from 'react-redux';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { connectWallet } from '../../redux/Blockchain/blockchainAction';
import Button from '@/components/ui/button';
import cn from 'classnames';
import CoinInput from '@/components/ui/coin-input';
import { SwapIcon } from '@/components/icons/swap-icon';

export default function ModalWithdraw() {
  let [toggleCoin, setToggleCoin] = useState(false);
  const { openModal, closeModal } = useModal();

  return (
    <>
      <div className="relative z-50 mx-auto h-[400px] w-[400px] max-w-full rounded-lg bg-white px-9 py-16 dark:bg-light-dark">
        <button
          className="absolute right-[20px] top-[20px] mb-2 flex h-[20px] w-[20px] items-center justify-center rounded-[50%] bg-black text-center   text-2xl font-medium uppercase dark:text-white"
          onClick={() => closeModal('Withdraw_VIEW')}
        >
          <span className="blockbg-transparent text-sm text-white outline-none focus:outline-none">
            X
          </span>
        </button>
        <p className="mb-8">
          Aun no cumples con la fecha de staking como castigo debes pagar 10%
          del valor de tu nft para evitar este castigo solo debes esperar a que
          tu stakeo se cumpla
        </p>
        <div className="mb-6">
          <label className="mb-1 block text-sm font-bold text-gray-700 dark:text-white">
            Valor
          </label>

          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="username"
            type="text"
            placeholder="Name"
            value={'10usd'}
            disabled
          />
        </div>

        <div className="row flex w-[100%]  justify-evenly">
          <Button>Approve</Button>

          <Button disabled>Paid</Button>
        </div>
      </div>
    </>
  );
}
