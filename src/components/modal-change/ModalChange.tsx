import React, { useEffect, useState } from 'react';
import { useModal } from '@/components/modal-views/context';
import Button from '../ui/button/button';
import { getRange, mint, getType } from '@/NFTROL';

export default function ModalChange() {
  const { closeModal } = useModal();
  const [wa, setWa] = useState('');
  const [status, setStatus] = useState(0);
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [tipo, setTipo] = useState('');
  const [rango, setRango] = useState('');

  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);

  //botton y state

  useEffect(() => {
    const w = window.localStorage.getItem('CHA');
    setWa(w);
  }, []);

  const remove = () => {
    window.localStorage.removeItem('CHA');
    closeModal();
  };

  const update = async () => {
    const newAccount = {
      Categoria: tipo,
      Rango: rango,
      Fecha: hoy.toLocaleDateString(),
      Rol: 'usuario',
    };
    fetch(
      `https://shark-app-w9pvy.ondigitalocean.app/api/updateAccount/${address}`,
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

  const Update = async () => {
    try {
      let _address = address;
      let categoria = tipo;
      let _rango = rango;
      await mint(_address, categoria, _rango);

      update();
    } catch (error) {
      console.log(error);
    }
  };

  const validador = () => {
    if (wa == address) {
      Update();
      setError('');
    } else {
      setError('wallet incorrecta');
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setStatus(0);
    }, 5000);
  }, [status]);
  return (
    <>
      <div className="relative z-50 mx-auto h-auto w-[400px] max-w-full rounded-lg bg-white px-9 py-16 dark:bg-light-dark">
        <button
          className="absolute right-[25px] top-[25px] mb-2 flex h-[20px] w-[20px] items-center justify-center rounded-[50%] bg-black text-center   text-2xl font-medium uppercase dark:text-white"
          onClick={() => remove()}
        >
          <span className="blockbg-transparent text-sm text-white outline-none focus:outline-none">
            X
          </span>
        </button>

        <p className=" mb-6 block text-sm  font-bold text-gray-700 dark:text-white">
          {`Estas seguro que quieres realizar esta accion,  para confirmar esta accion debes escribir la wallet de nuevo ${wa}`}
        </p>

        <label className=" block text-sm font-bold text-gray-700 dark:text-white">
          Address
        </label>

        {error.length == 0 ? (
          <input
            onChange={(e) => setAddress(e.target.value)}
            className="focus:shadow-outline m mb-1 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="username"
            type="text"
            placeholder="Address"
          />
        ) : (
          <input
            onChange={(e) => setAddress(e.target.value)}
            className="focus:shadow-outline  w-full appearance-none rounded border border-red-500 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="username"
            type="text"
            placeholder="Address"
          />
        )}

        {error.length > 0 && (
          <span className="flex items-center text-xs font-medium tracking-wide text-red-500">
            {error}
          </span>
        )}

        <div className="mb-1">
          <label className="mb-1 block text-sm font-bold text-gray-700 dark:text-white">
            Categoria NFT
          </label>
          <select
            onChange={(e) => setTipo(e.target.value)}
            name="select"
            className="focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="wallet"
          >
            <option value="Agente X">Agente X </option>
            <option value="BlockMaker">BlockMaker</option>
          </select>
        </div>

        <div className="mb-2">
          <label className="mb-1 block text-sm font-bold text-gray-700 dark:text-white">
            Rango NFT
          </label>
          <select
            onChange={(e) => setRango(e.target.value)}
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

        <Button
          onClick={() => validador()}
          className=" color-primary mt-[20px] flex h-14 w-full cursor-pointer items-center justify-center rounded-lg bg-gradient-to-l"
        >
          <span>Aceptar</span>
          <span className="h-auto w-9"></span>
        </Button>
      </div>

      {status == 200 && (
        <div
          className="mb-4  mt-[30px] flex w-[400px] justify-center self-center rounded-lg bg-green-200 p-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          <span className="font-small">Usuario actualizado correctamente</span>
        </div>
      )}

      {status == 100 && (
        <div
          className="m mb-4 mt-[30px] w-[400px]  justify-center self-center rounded-lg bg-red-200  p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          <span className="font-small">
            Error no se pudo completar esta accion
          </span>
        </div>
      )}
    </>
  );
}
