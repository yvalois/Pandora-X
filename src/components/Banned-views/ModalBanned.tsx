import React, { useContext, useEffect, useState } from 'react';
import { useModal } from '@/components/modal-views/context';
import Button from '../ui/button/button';
import { disconectWallet } from '../../redux/Blockchain/blockchainAction';
import { useDispatch } from 'react-redux';
import { WalletContext } from '@/lib/hooks/use-connect';

import WalletConnectProvider from '@walletconnect/web3-provider';
export default function ModalBanned() {
  const { closeModal } = useModal();
  const [wa, setWa] = useState('');
  const [address, setAddress] = useState('');
  const [action, setAction] = useState(true);
  const [status, setStatus] = useState(0);
  const [error, setError] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  //botton y state

  const { disconnectWallet } = useContext(WalletContext);

  return (
    <>
      <div className="relative z-50 mx-auto h-auto w-[400px] max-w-full rounded-lg bg-white px-9 py-16 dark:bg-light-dark">
        <button
          className="absolute right-[25px] top-[25px] mb-2 flex h-[20px] w-[20px] items-center justify-center rounded-[50%] bg-black text-center   text-2xl font-medium uppercase dark:text-white"
          onClick={() => disconnectWallet()}
        >
          <span className="blockbg-transparent text-sm text-white outline-none focus:outline-none">
            X
          </span>
        </button>

        <p className=" mb-6 block text-sm  font-bold text-gray-700 dark:text-white">
          Tu cuenta ha sido suspendida indefinidamente, para mas informacion
          contactate con servicio al cliente
        </p>

        <Button
          onClick={() => disconnectWallet()}
          className=" color-primary mt-[35px] flex h-14 w-full cursor-pointer items-center justify-center rounded-lg bg-gradient-to-l"
        >
          <span>Aceptar</span>
          <span className="h-auto w-9"></span>
        </Button>
      </div>
    </>
  );
}
