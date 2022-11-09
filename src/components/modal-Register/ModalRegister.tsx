import React, { useState } from 'react';
import { useModal } from '@/components/modal-views/context';
import { disconectWallet } from '../../redux/Blockchain/blockchainAction';
import { useDispatch, useSelector } from 'react-redux';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { connectWallet } from '../../redux/Blockchain/blockchainAction';

export default function ModalRegister() {
  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);
  const { accountAddress } = useSelector((state) => state.blockchain);

  const NewUser = {
    Nombre: '',
    Correo: '',
    Address: accountAddress,
    Fecha: hoy.toLocaleDateString(),
    Rol: 'cliente',
    Telefono: 0,
  };

  const [value, setValue] = useState(NewUser);

  const { closeModal } = useModal();

  const dispatch = useDispatch<AppDispatch>();

  //const Usuario = useSelector((state: any) => state.Usuario);

  const ChangeInfo = (Dato: string, valor: string) => {
    if (Dato == 'Nombre') {
      setValue((prevState) => ({ ...prevState, Nombre: valor }));
    } else if (Dato == 'Correo') {
      setValue((prevState) => ({ ...prevState, Correo: valor }));
    } else if (Dato == 'Telefono') {
      setValue((prevState) => ({ ...prevState, Telefono: valor }));
    }
  };

  const Registrar = async () => {
    alert(accountAddress);
    try {
      fetch(`https://pandoraxapi1.herokuapp.com/api}/CrearUsuario`, {
        method: 'POST',
        body: JSON.stringify(value),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then(() => {
          dispatch(connectWallet());
        })
        .catch((error) => console.error('Error:', error));
    } catch (error) {
      console.log(error);
    }
  };

  /*const conectar = (accountAddress) => {
    fetch(`https://pandoraxapi1.herokuapp.com/api}/login/${accountAddress}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response !== null) {
          dispatch(
            connectSuccessToMongo({
              rol: response.Rol,
              nombre: response.Nombre,
            })
  
          );
          
        } else {
          dispatch(
            register()
          );
        }
      });
  };*/

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        chainId: 31337,
      },
    },
  };

  const web3Modal =
    typeof window !== 'undefined' &&
    new Web3Modal({ cacheProvider: true, providerOptions }); //agregar provider options

  const disconnectWallet = async () => {
    //setAddress('');
    web3Modal && web3Modal.clearCachedProvider();
    dispatch(disconectWallet());
    closeModal();
    //disconect();
  };

  //botton y state
  return (
    <>
      <div className="relative z-50 mx-auto h-[580px] w-[880px] max-w-full rounded-lg bg-white px-9 py-16 dark:bg-light-dark">
        <button
          className="absolute right-[25px] top-[25px] mb-4 flex h-[40px] w-[40px] items-center justify-center rounded-[50%] bg-black text-center   text-2xl font-medium uppercase dark:text-white"
          onClick={() => disconnectWallet()}
        >
          <span className="block h-6 w-6 bg-transparent text-2xl text-white outline-none focus:outline-none">
            X
          </span>
        </button>

        <h2 className="mb-4 text-center text-2xl font-medium uppercase text-gray-900 dark:text-white">
          Registrarse
        </h2>

        <label className="mb-2 mt-[40px] block text-sm font-bold text-gray-700 dark:text-white">
          Nombre
        </label>
        <input
          onChange={(e) => ChangeInfo('Nombre', e.target.value)}
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          id="username"
          type="text"
          placeholder="Nombre"
        />
        <label className="mb-2 mt-[20px] block text-sm font-bold text-gray-700 dark:text-white">
          Correo
        </label>
        <input
          onChange={(e) => ChangeInfo('Correo', e.target.value)}
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          id="username"
          type="text"
          placeholder="Correo"
        />
        <label className="mb-2 mt-[20px] block text-sm font-bold text-gray-700 dark:text-white">
          Numero
        </label>
        <input
          onChange={(e) => ChangeInfo('Telefono', e.target.value)}
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          id="username"
          type="text"
          placeholder="Numero"
        />

        <button
          onClick={() => Registrar()}
          className=" mt-[70px] flex h-14 w-full cursor-pointer items-center justify-center rounded-lg bg-gradient-to-l from-[#ffdc24] to-[#ff5c00] px-4 text-base text-white transition-all hover:-translate-y-0.5"
        >
          <span>Registrarse</span>
          <span className="h-auto w-9"></span>
        </button>
      </div>
    </>
  );
}
