import type { NextPageWithLayout } from '@/types';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import DashboardLayout from '@/layouts/_dashboard';
import { useState, useEffect } from 'react';
import { getRange, mint, getType } from '@/NFTROL';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useDispatch, useSelector } from 'react-redux';

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
  };
  const [value, setValue] = useState(NewUser);

  const Usuario = useSelector((state: any) => state.Usuario);

  useEffect(() => {
    if (Usuario.rol !== 'Admin') {
      window.location.href = '/';
    }
  });

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

  async function CrearUsuario() {
    try {
      let address = value.Address;
      let categoria = value.Categoria;
      let rango = value.Rango;

      const txResult = await mint(address, categoria, rango);
      const a = await getType(address);
      const b = await getRange(address);
      console.log(a);
      console.log(b);
      console.log(txResult.status);

      if (txResult.status === 1) {
        fetch(`https://pandoraxapi1.herokuapp.com/api/CrearUsuario`, {
          method: 'POST',
          body: JSON.stringify(value),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then(() => {
            alert('listo');
            console.log(value);
          })
          .catch((error) => console.error('Error:', error));
      } else {
        alert('Transaccion fracaso');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <NextSeo
        title="Create new user"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <div className="mx-auto w-full max-w-[1160px] justify-center self-center text-sm md:pt-14 4xl:pt-24 ">
        <div className="grid w-full grid-cols-1 gap-6 xs:grid-cols-2 lg:grid-cols-3 ">
          <div className="ml-60 w-full max-w-xs ">
            <form className="mb-4 rounded  bg-white px-8 pt-6 pb-8 shadow-md dark:bg-dark  ">
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-white">
                  Name
                </label>
                <input
                  onChange={(e) => ChangeInfo('Nombre', e.target.value)}
                  className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  id="username"
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-white">
                  Correo
                </label>
                <input
                  onChange={(e) => ChangeInfo('Correo', e.target.value)}
                  className="focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  type="text"
                  id="Correo"
                  placeholder="Correo"
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-white">
                  Address Wallet
                </label>
                <input
                  onChange={(e) => ChangeInfo('Address', e.target.value)}
                  className="focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  type="text"
                  id="wallet"
                  placeholder="Address Wallet"
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-white">
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
                <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-white">
                  Rango NFT
                </label>
                <select
                  onChange={(e) => ChangeInfo('Rango', e.target.value)}
                  name="select"
                  className="focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  id="wallet"
                >
                  <option value="Peerx">Peerx</option>
                  <option value="BlockElite">BlockElite</option>
                  <option value="BlockMaster">BlockMaster</option>
                  <option value="BlockCreator">BlockCreator</option>
                </select>
              </div>

              <div className="flex items-center justify-center">
                <button
                  onClick={() => CrearUsuario()}
                  className="focus:shadow-outline  rounded bg-dark py-2 px-4 font-bold text-white focus:outline-none dark:bg-white dark:text-dark"
                  type="button"
                >
                  Crear Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

CreateUser.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateUser;
