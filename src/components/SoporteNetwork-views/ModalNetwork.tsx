import React, { useContext, useEffect, useState } from 'react';
import { useModal } from '@/components/modal-views/context';
import Button from '../ui/button/button';
import { useDispatch, useSelector } from 'react-redux';
import { WalletContext } from '@/lib/hooks/use-connect';
import WalletConnectProvider from '@walletconnect/web3-provider';
export default function ModalBanned() {
  const { closeModal } = useModal();
  const [red, setRed] = useState('');
  const { chainId } = useSelector((state) => state.blockchain);

  //botton y state

  const { disconnectWallet } = useContext(WalletContext);
  useEffect(() => {
    if (chainId != 1) {
      setRed('Ethereum');
    } else if (chainId == 1) {
      setRed('Polygon');
    }
  }, []);

  const aceptar = () => {
    if (chainId == 1) {
      window.localStorage.setItem('ChainId', 137);
      disconnectWallet();
      closeModal();
    } else if (chainId == 137) {
      window.localStorage.setItem('ChainId', 1);
      disconnectWallet();
      closeModal();
    }
  };

  return (
    <>
      <div className="relative z-50 mx-auto h-auto w-[400px] rounded-lg bg-white px-9 py-16 dark:bg-light-dark">
        <button
          className="absolute right-[25px] top-[25px] mb-2 flex h-[20px] w-[20px] items-center justify-center rounded-[50%] bg-black text-center   text-2xl font-medium uppercase dark:text-white"
          onClick={() => closeModal()}
        >
          <span className="blockbg-transparent text-sm text-white outline-none focus:outline-none">
            X
          </span>
        </button>

        <p className=" mb-6 block text-sm  font-bold text-gray-700 dark:text-white">
          No puedes realizar esta accion en esta network por favor cambiala{' '}
          {red}, ¿deseas cambiar de red?
        </p>

        <div className=" space-between flex justify-center">
          <Button
            onClick={() => aceptar()}
            className=" color-primary mt-[35px] mr-[15px] cursor-pointer  rounded-lg bg-gradient-to-l"
          >
            <span>Aceptar</span>
            <span className="h-auto w-9"></span>
          </Button>

          <Button
            onClick={() => closeModal()}
            className=" color-primary mt-[35px] ml-[15px] cursor-pointer  rounded-lg bg-gradient-to-l"
          >
            <span>Cancelar</span>
            <span className="h-auto w-9"></span>
          </Button>
        </div>
      </div>
    </>
  );
}
