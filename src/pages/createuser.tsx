import type { NextPageWithLayout } from '@/types';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import DashboardLayout from '@/layouts/_dashboard';
import { useState, useEffect } from 'react';
import { getRange, mint, getType } from '@/NFTROL';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@/components/ui/button';
import validator from 'validator';
import Banner from '@/assets/images/Banner/Banner-Profile.jpg';
import PeerX from '@/assets/images/profile/PEER-X.jpg';
import BlockCreator from '@/assets/images/profile/BLOCKCREATOR.jpg';
import BlockElite from '@/assets/images/profile/BLOCKELITE.jpg';
import BlockMaster from '@/assets/images/profile/BLOCKMASTER.jpg';
import Generic from '@/assets/images/profile/GENERIC.jpg';

// static data
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const CreateUser: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);

  const NewUser = {
    Nombre: '',
    Correo: '',
    Address: '',
    Categoria: 'Agente X',
    Rango: 'peerx',
    Fecha: hoy.toLocaleDateString(),
    Rol: 'usuario',
    Perfil: '',
    Banner: '',
    Descripcion: '',
  };

  const Err = {
    ErrNombre: '',
    ErrCorreo: '',
    ErrAddress: '',
  };

  const [value, setValue] = useState(NewUser);
  const Usuario = useSelector((state: any) => state.Usuario);
  const [status, setStatus] = useState(0);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(Err);
  const [exist, setExist] = useState(false);

  useEffect(() => {
    if (Usuario.rol !== 'Admin') {
      window.location.href = '/';
    }
  });

  async function encodeFileAsBase64URL(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('loadend', () => {
        resolve(reader.result);
      });
      reader.readAsDataURL(file);
    });
  }

  const ChangeInfo = (Dato: string, valor: string) => {
    if (Dato == 'Nombre') {
      setValue((prevState) => ({ ...prevState, Nombre: valor }));
    } else if (Dato == 'Correo') {
      setValue((prevState) => ({ ...prevState, Correo: valor }));
    } else if (Dato == 'Address') {
      setValue((prevState) => ({ ...prevState, Address: valor }));
    } else if (Dato == 'Categoria') {
      setValue((prevState) => ({ ...prevState, Categoria: valor }));
    } else {
      setValue((prevState) => ({ ...prevState, Rango: valor }));
    }
  };

  const registerUser = async () => {
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

    if (!validator.isEthereumAddress(value.Address)) {
      setError(true);
      setErrorMsg((prevState) => ({
        ...prevState,
        ErrAddress: 'address invalidad',
      }));
    } else if (validator.isEthereumAddress(value.Address)) {
      setErrorMsg((prevState) => ({ ...prevState, ErrAddress: '' }));
    }

    if (
      validator.isEmail(value.Correo) &&
      value.Nombre.length >= 3 &&
      validator.isAlpha(value.Nombre) &&
      validator.isEthereumAddress(value.Address)
    ) {
      setError(false);

      await CrearUsuario();
    }
  };

  const update = async () => {
    const newAccount = {
      Categoria: value.Categoria,
      Rango: value.Rango,
      Fecha: hoy.toLocaleDateString(),
      Rol: 'usuario',
    };
    fetch(
      `https://shark-app-w9pvy.ondigitalocean.app/api/updateAccount/${value.Address}`,
      {
        method: 'PUT',
        body: JSON.stringify(newAccount),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => {
        res.json();
        if (res.status == 200) {
          setStatus(res.status);
        } else {
          setStatus(100);
        }
      })
      .then(() => {});
  };

  const login = async () => {
    fetch(
      `https://shark-app-w9pvy.ondigitalocean.app/api/login/${value.Address}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response?.Address == value.Address) {
          setExist(true);
        } else if (response == null) {
          setExist(false);
        }
      });
  };

  const registrar = async () => {
    fetch(`https://shark-app-w9pvy.ondigitalocean.app/api/CrearUsuario`, {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        res.json();
        setStatus(res.status);
      })
      .then(() => {})
      .catch((error) => console.error('Error:', error));
  };

  const CrearUsuario = async () => {
    login();
    try {
      let address = value.Address;
      let categoria = value.Categoria;
      let rango = value.Rango;

      //const txResult = await mint(address, categoria, rango);
      //const a = await getType(address);
      //const b = await getRange(address);

      if (/*txResult.status*/ 1 == 1) {
        if (exist == true) {
          await update();
        } else {
          await registrar();
        }
      } else {
        setStatus(100);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setStatus(0);
    }, 5000);
  }, [status]);

  return (
    <>
      <NextSeo
        title="Create new user"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <div className="mx-auto flex  w-full justify-center self-center text-sm md:pt-14 4xl:pt-24 ">
        <div className=" w-full max-w-xs  justify-center">
          <form className="mb-4 rounded  bg-white px-8 pt-6 pb-8 shadow-md dark:bg-dark ">
            <div className="mb-3">
              <label className="mb-1 block text-sm font-bold text-gray-700 dark:text-white">
                Name
              </label>
              {errorMsg.ErrNombre.length == 0 ? (
                <input
                  onChange={(e) => ChangeInfo('Nombre', e.target.value)}
                  className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  id="username"
                  type="text"
                  placeholder="Name"
                />
              ) : (
                <input
                  onChange={(e) => ChangeInfo('Nombre', e.target.value)}
                  className="focus:shadow-outline w-full appearance-none rounded border border-red-500 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  id="username"
                  type="text"
                  placeholder="Name"
                />
              )}
            </div>

            {error == true && errorMsg.ErrNombre.length > 0 && (
              <span className="flex items-center text-xs font-medium tracking-wide text-red-500">
                {errorMsg.ErrNombre}
              </span>
            )}

            <div className="mb-3">
              <label className="mb-1 block text-sm font-bold text-gray-700 dark:text-white">
                Correo
              </label>

              {errorMsg.ErrCorreo.length == 0 ? (
                <input
                  onChange={(e) => ChangeInfo('Correo', e.target.value)}
                  className="focus:shadow-outline  w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  type="text"
                  id="Correo"
                  placeholder="Correo"
                />
              ) : (
                <input
                  onChange={(e) => ChangeInfo('Correo', e.target.value)}
                  className="focus:shadow-outline  w-full appearance-none rounded border border-red-500 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  type="text"
                  id="Correo"
                  placeholder="Correo"
                />
              )}
            </div>

            {error == true && errorMsg.ErrCorreo.length > 0 && (
              <span className="flex items-center text-xs font-medium tracking-wide text-red-500">
                {errorMsg.ErrCorreo}
              </span>
            )}

            <div className="mb-3">
              <label className="mb-1 block text-sm font-bold text-gray-700 dark:text-white">
                Address Wallet
              </label>

              {errorMsg.ErrAddress.length == 0 ? (
                <input
                  onChange={(e) => ChangeInfo('Address', e.target.value)}
                  className="focus:shadow-outline  w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  type="text"
                  id="wallet"
                  placeholder="Address Wallet"
                />
              ) : (
                <input
                  onChange={(e) => ChangeInfo('Address', e.target.value)}
                  className="focus:shadow-outline  w-full appearance-none rounded border border-red-500 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  type="text"
                  id="wallet"
                  placeholder="Address Wallet"
                />
              )}
            </div>

            {error == true && errorMsg.ErrAddress.length > 0 && (
              <span className="mt-0 flex items-center text-xs font-medium tracking-wide text-red-500">
                {errorMsg.ErrAddress}
              </span>
            )}

            <div className="mb-6">
              <label className="mb-1 block text-sm font-bold text-gray-700 dark:text-white">
                Categoria NFT
              </label>
              <select
                onChange={(e) => ChangeInfo('Categoria', e.target.value)}
                name="select"
                className="focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                id="wallet"
              >
                <option value="Agente X">Agente X </option>
                <option value="BlockMaker">BlockMaker</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="mb-1 block text-sm font-bold text-gray-700 dark:text-white">
                Rango NFT
              </label>
              <select
                onChange={(e) => ChangeInfo('Rango', e.target.value)}
                name="select"
                className="focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                id="wallet"
              >
                <option value="peerx">Peerx</option>
                <option value="blockelite">BlockElite</option>
                <option value="blockmaster">BlockMaster</option>
                <option value="blockcreator">BlockCreator</option>
              </select>
            </div>

            <div className="flex items-center justify-center">
              <Button
                onClick={() => registerUser()}
                className="focus:shadow-outline  rounded"
                type="button"
              >
                Crear Usuario
              </Button>
            </div>
          </form>
        </div>
      </div>

      {status == 200 && (
        <div
          className="mb-4 ml-[610px] mt-[30px] flex w-[300px] justify-center self-center rounded-lg bg-green-200 p-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          <span className="font-medium">Usuario creado correctamente</span>
        </div>
      )}

      {status == 100 && (
        <div
          className="mb-4 ml-[580px] mt-[30px] w-[300px] justify-center self-center rounded-lg bg-red-200  p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          <span className="font-medium">operacion fallo en el minteo</span>
        </div>
      )}
    </>
  );
};

CreateUser.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateUser;
