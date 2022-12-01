import React, { useEffect, useState } from 'react';
import { useModal } from '@/components/modal-views/context';
import { disconectWallet } from '../../redux/Blockchain/blockchainAction';
import { useDispatch, useSelector } from 'react-redux';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { connectWallet } from '../../redux/Blockchain/blockchainAction';
import validator from 'validator';
import Button from '@/components/ui/button';
import { getType, getRange, exist } from '@/NFTROL';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

export default function ModalRegister() {
  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);
  const { accountAddress } = useSelector((state) => state.blockchain);
  const { rol } = useSelector((state) => state.Usuario);

  const NewUser = {
    Nombre: '',
    Id: '',
    Correo: '',
    Address: accountAddress,
    Fecha: hoy.toLocaleDateString(),
    Rol: 'cliente',
    Telefono: '',
    IsReferido: false,
    Referidor: '',
    Range: '',
    Type: '',
  };

  const Err = {
    ErrNombre: '',
    ErrId: '',
    ErrCorreo: '',
    ErrTelefono: '',
  };

  const [value, setValue] = useState(NewUser);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(Err);
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState(0);
  const [referidor, setReferidor] = useState('');
  const [tipo, setTipo] = useState('');
  const [rango, setRango] = useState('');
  const [value1, setValue1] = useState('');

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
    } else if (Dato == 'Id') {
      setValue((prevState) => ({ ...prevState, Id: valor }));
    }
  };

  const RegistrarBD = async () => {
    try {
      fetch(`https://pandoraxapi1.herokuapp.com/api/CrearUsuario`, {
        method: 'POST',
        body: JSON.stringify(value),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          res.json();
          if (res.status == 200) {
            setStatus(res.status);
          } else {
            setStatus(100);
          }
        })
        .then(() => {
          //ver posibilidad de que primero se mande un alert que diga usuario creado y 5 segundos despues en un timeout se llame esta funcion
          setTimeout(() => {
            dispatch(connectWallet());
            setStatus(0);
            window.localStorage.removeItem('Wallet');
          }, 3000);
        })
        .catch((error) => console.error('Error:', error));
    } catch (error) {
      console.log(error);
    }
  };

  const Registrar = async () => {
    if (value.Nombre.length < 3) {
      setError(true);
      setErrorMsg((prevState) => ({
        ...prevState,
        ErrNombre: 'El nombre debe tener minimo 3 caracteres',
      }));
    } else if (!validator.isAlpha(value.Nombre)) {
      setError(true);
      setErrorMsg((prevState) => ({
        ...prevState,
        ErrNombre: 'solo se permiten letras',
      }));
    } else if (value.Nombre.length >= 3 && validator.isAlpha(value.Nombre)) {
      setErrorMsg((prevState) => ({ ...prevState, ErrNombre: '' }));
    }

    if (!validator.isEmail(value.Correo)) {
      setError(true);
      setErrorMsg((prevState) => ({
        ...prevState,
        ErrCorreo: 'Correo invalido',
      }));
    } else if (validator.isEmail(value.Correo)) {
      setErrorMsg((prevState) => ({ ...prevState, ErrCorreo: '' }));
    }

    if (value1.length < 10) {
      setError(true);
      setErrorMsg((prevState) => ({
        ...prevState,
        ErrTelefono: 'Este campo debe tener minimo 10 caracteres',
      }));
    } else if (!validator.isNumeric(value1)) {
      setError(true);
      setErrorMsg((prevState) => ({
        ...prevState,
        ErrTelefono: 'Solo se permiten numeros',
      }));
    } else if (value1.length >= 10 && validator.isNumeric(value1)) {
      setErrorMsg((prevState) => ({ ...prevState, ErrTelefono: '' }));
    }

    if (referidor.length > 0) {
    }

    if (
      value1 >= 10 &&
      validator.isNumeric(value1) &&
      validator.isEmail(value.Correo) &&
      value.Nombre.length >= 3 &&
      validator.isAlpha(value.Nombre)
    ) {
      alert('a');
      setError(false);
      await RegistrarBD();
    }
  };

  /*const conectar = (accountAddress) => {
    fetch(`https://pandoraxapi1.herokuapp.com/api/login/${accountAddress}`, {
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

  useEffect(() => {
    async function fetchData() {
      const a = window.localStorage.getItem('Wallet');
      let _exist = await exist(a);
      //alert(_exist)
      if (_exist == true) {
        let type = await getType(a);
        let range = await getRange(a);
        setValue((prevState) => ({ ...prevState, Referidor: a }));
        setValue((prevState) => ({ ...prevState, Range: range }));
        setValue((prevState) => ({ ...prevState, Type: type }));
        setValue((prevState) => ({ ...prevState, IsReferido: _exist }));
      } else {
        window.location.href = '/';
      }
    }
    fetchData();
  }, [referidor]);

  //botton y state
  return (
    <>
      <div className="relative z-50 mx-auto h-[480px] w-[400px] max-w-full rounded-lg bg-white px-9 py-16 dark:bg-light-dark">
        <button
          className="absolute right-[25px] top-[25px] mb-2 flex h-[20px] w-[20px] items-center justify-center rounded-[50%] bg-black text-center   text-2xl font-medium uppercase dark:text-white"
          onClick={() => disconnectWallet()}
        >
          <span className="blockbg-transparent text-sm text-white outline-none focus:outline-none">
            X
          </span>
        </button>

        <h2 className="mb-4 text-center text-2xl font-medium uppercase text-gray-900 dark:text-white">
          Registrarse
        </h2>

        <label className=" mt-[20px] block text-sm font-bold text-gray-700 dark:text-white">
          Nombre
        </label>

        {errorMsg.ErrNombre.length == 0 ? (
          <input
            onChange={(e) => ChangeInfo('Nombre', e.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="username"
            type="text"
            placeholder="Nombre"
          />
        ) : (
          <input
            onChange={(e) => ChangeInfo('Nombre', e.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border border-red-500 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="username"
            type="text"
            placeholder="Nombre"
          />
        )}

        {error == true && errorMsg.ErrNombre.length > 0 && (
          <span className="mt-1 ml-1 flex items-center text-xs font-medium tracking-wide text-red-500">
            {errorMsg.ErrNombre}
          </span>
        )}

        {error == true && errorMsg.ErrId.length > 0 && (
          <span className="mt-1 ml-1 flex items-center text-xs font-medium tracking-wide text-red-500">
            {errorMsg.ErrId}
          </span>
        )}

        <label className=" mt-[20px] block text-sm font-bold text-gray-700 dark:text-white">
          Correo
        </label>

        {errorMsg.ErrCorreo.length == 0 ? (
          <input
            onChange={(e) => ChangeInfo('Correo', e.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="username"
            type="text"
            placeholder="Correo"
          />
        ) : (
          <input
            onChange={(e) => ChangeInfo('Correo', e.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border border-red-500 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="username"
            type="text"
            placeholder="Correo"
          />
        )}

        {error == true && errorMsg.ErrCorreo.length > 0 && (
          <span className="mt-1 ml-1 flex items-center text-xs font-medium tracking-wide text-red-500">
            {errorMsg.ErrCorreo}
          </span>
        )}

        <label className=" mt-[20px] block text-sm font-bold text-gray-700 dark:text-white">
          Telefono
        </label>

        {errorMsg.ErrTelefono.length == 0 ? (
          <PhoneInput
            onChange={setValue1}
            value={value1}
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="username"
            type="text"
            placeholder="Numero"
          />
        ) : (
          <PhoneInput
            onChange={setValue1}
            value={value1}
            className="focus:shadow-outline w-full appearance-none rounded border border-red-500 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="username"
            type="text"
            placeholder="Numero"
          />
        )}

        {errorMsg.ErrTelefono.length > 0 && (
          <span className="mt-1 ml-1 flex items-center text-xs font-medium tracking-wide text-red-500">
            {errorMsg.ErrTelefono}
          </span>
        )}

        <Button
          onClick={() => Registrar()}
          className=" color-primary mt-[35px] flex h-14 w-full cursor-pointer items-center justify-center rounded-lg bg-gradient-to-l"
        >
          <span>Registrarse</span>
          <span className="h-auto w-9"></span>
        </Button>
      </div>

      {status == 200 && (
        <div
          className="mb-4 ml-[60px] mt-[30px] flex w-[300px] justify-center self-center rounded-lg bg-green-200 p-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          <span className="font-medium">Usuario creado correctamente</span>
        </div>
      )}

      {status == 100 && (
        <div
          className="mb-4 ml-[60px] mt-[30px] w-[300px]  justify-center self-center rounded-lg bg-red-200  p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          <span className="font-medium">operacion fallo en el minteo</span>
        </div>
      )}
    </>
  );
}
