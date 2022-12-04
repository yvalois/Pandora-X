import React, { useEffect, useState } from 'react';
import { useModal } from '@/components/modal-views/context';
import AnchorLink from '../ui/links/anchor-link';
import Button from '../ui/button';

export default function ModalWithdraw() {
  const { closeModal } = useModal();
  const [valor, setValor] = useState(0);
  const [loading, setLoading] = useState(false);
  const [approvedToken, setApprovedToken] = useState(0);
  const [id, setId] = useState(0);
  const [succes, setSuccess] = useState(false);

  const close = () => {
    closeModal('Withdraw_VIEW');
  };

  return (
    <>
      <div className="relative z-50 mx-auto h-[200px] w-[400px] max-w-full rounded-lg bg-white px-8 py-8 dark:bg-light-dark">
        <AnchorLink href="/">
          <button
            className="absolute right-[20px] top-[20px] mb-2 flex h-[20px] w-[20px] items-center justify-center rounded-[50%] bg-black text-center   text-2xl font-medium uppercase dark:text-white"
            onClick={close}
          >
            <span className="blockbg-transparent text-sm text-white outline-none focus:outline-none">
              X
            </span>
          </button>
        </AnchorLink>
        <p className="mb-4">
          Al presionar aceptar, confirmas estar de acuerdo con no poder
          recuperar el token hasta cumplir el tiempo establecido
        </p>
        <div className="flex w-full justify-evenly">
          <Button onClick={close} size="small">
            <span className="blockbg-transparent text-sm text-white outline-none focus:outline-none">
              aceptar
            </span>
          </Button>
          <AnchorLink href="/">
            <Button onClick={close} size="small">
              <span className="blockbg-transparent text-sm text-white outline-none focus:outline-none">
                Cancelar
              </span>
            </Button>
          </AnchorLink>
        </div>
      </div>
    </>
  );
}
