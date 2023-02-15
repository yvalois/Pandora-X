import React, { useEffect, useState } from 'react';
import { useModal } from '@/components/modal-views/context';
import Button from '../ui/button/button';

export default function ModalBan() {
  const { closeModal } = useModal();
  const [wa, setWa] = useState('');
  const [address, setAddress] = useState('');
  const [action, setAction] = useState(true);
  const [status, setStatus] = useState(0);
  const [error, setError] = useState('');
  //botton y state

  useEffect(() => {
    const w = window.localStorage.getItem('Add');
    setWa(w);
    const ac = window.localStorage.getItem('Action');
    if (ac == 'ban') {
      setAction(true);
    } else {
      setAction(false);
    }
  }, []);

  const remove = () => {
    window.localStorage.removeItem('Add');
    window.localStorage.removeItem('Action');

    closeModal();
  };

  const ban = async () => {
    const value = {
      Ban: action,
    };

    fetch(`${process.env.BACKEND_API}/ban/${address}`, {
      method: 'PUT',
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

  const validador = () => {
    if (wa == address) {
      ban();
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

        <Button
          onClick={() => validador(true)}
          className=" color-primary mt-[35px] flex h-14 w-full cursor-pointer items-center justify-center rounded-lg bg-gradient-to-l"
        >
          <span>Bannear</span>
          <span className="h-auto w-9"></span>
        </Button>
      </div>

      {status == 200 && (
        <div
          className="mb-4 ml-[60px] mt-[30px] flex w-[300px] justify-center self-center rounded-lg bg-green-200 p-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          <span className="text-center font-medium">
            Ban aplicado correctamente
          </span>
        </div>
      )}

      {status == 100 && (
        <div
          className="mb-4 ml-[60px] mt-[30px] w-[300px]  justify-center self-center rounded-lg bg-red-200  p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          <span className="text-center font-medium">Error en la operacion</span>
        </div>
      )}
    </>
  );
}
