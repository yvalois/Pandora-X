import React, { useEffect, useState } from 'react';
import { useModal } from '@/components/modal-views/context';
import AnchorLink from '../ui/links/anchor-link';
import Button from '../ui/button';
import { Warning } from '@/components/icons/warning';

export default function ModalWithdraw() {
  const { closeModal } = useModal();
  const [valor, setValor] = useState(0);
  const [loading, setLoading] = useState(false);
  const [approvedToken, setApprovedToken] = useState(0);
  const [id, setId] = useState(0);
  const [succes, setSuccess] = useState(false);
  const [msg, setMsg] = useState(false);
  const [msg2, setMsg2] = useState(false);

  const [alert, setAlert] = useState('');

  const close = () => {
    closeModal('Withdraw_VIEW');
  };

  const verify = () => {
    if (msg == true) {
      close();
    } else {
      setAlert('Debes aceptar los terminos');
    }
  };

  const change = () => {
    setMsg(!msg);
  };

  return (
    <>
      <div className="column relative z-50 mx-auto h-auto w-[480px]  max-w-full items-center justify-center rounded-lg bg-white px-8 py-8 dark:bg-light-dark">
        <div className="width-full mb-8 flex items-center justify-center">
          <Warning className="text-[#2a52be] " />
        </div>

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
        <p className="mb-8">
          By participating in NFT staking with NFT Studio by Pandora X you
          acknowledge that you haver read, understood, and accepted all of the
          terms and conditions in these NFT staking terms, and you acknowledge
          and agree that you will be bound by and will comply with these NFT
          staking Terms. If you do not understand and accept these NFT staking
          terms in their entirety, you should not participate.
        </p>
        <div className="mb-0 flex items-center">
          <input
            id="link-checkbox"
            type="checkbox"
            value={msg}
            onChange={change}
            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          <label
            for="link-checkbox"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I have read and I agree to NFT Staking{' '}
            <a
              onClick={() => {
                window.open('https://pandorax.co/terms-nft-staking');
              }}
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              Terms
            </a>
            .
          </label>
        </div>

        <div className="mb-6">
          {' '}
          {!msg && alert.length > 0 && (
            <label className="ml-6 text-xs text-red-500">{alert}</label>
          )}
        </div>
        <div className="flex w-full justify-evenly">
          <Button onClick={verify} size="small">
            <span className="blockbg-transparent text-sm text-white outline-none focus:outline-none">
              Aceptar
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
