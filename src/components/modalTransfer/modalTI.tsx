import React, { useEffect, useState } from 'react';
import { useModal } from '@/components/modal-views/context';
import AnchorLink from '../ui/links/anchor-link';
import Button from '../ui/button';
import { Warning } from '@/components/icons/warning';
import { useSelector, useDispatch } from 'react-redux';
import validator from 'validator';
import { useAccount, useProvider } from 'wagmi';

import { uInvertion } from '../../redux/Blockchain/blockchainAction';

export default function ModalTP() {
  const { closeModal } = useModal();
  const [valor, setValor] = useState(0);
  const [loading, setLoading] = useState(false);
  const [approvedToken, setApprovedToken] = useState(false);
  const [id, setId] = useState(0);
  const [succes, setSuccess] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState(false);
  const { inversionMinter, accountAddress } = useSelector(
    (state) => state.blockchain
  );
  const dispatch = useDispatch<AppDispatch>();

  const close = () => {
    closeModal('TRANSFER_I');
    window.localStorage.removeItem('TransferIId');
  };

  const verifyApprove = async () => {
    const isap = await inversionMinter.getApproved(id); //MarketPlace
    //setApprovedUsdt(ethers.utils.formatUnits(usdt, 18));
    if (isap == value) {
      setApprovedToken(true);
    }
  };

  const Approve = async () => {
    if (validator.isEthereumAddress(value)) {
      setLoading(true);
      setError('');
      const tx = await inversionMinter.approve(value, id);

      await tx.wait();
      await verifyApprove();
      setLoading(false);
    } else {
      setError('Wallet incorrecta');
    }
  };
  const provider = useProvider();
  const { address } = useAccount();

  const transfer = async () => {
    setLoading(true);
    const tx = await inversionMinter.transferFrom(accountAddress, value, id);
    await tx.wait();
    dispatch(uInvertion(provider, address));
    window.localStorage.removeItem('TransferIId');
    setLoading(false);
    setStatus(true);
    setTimeout(() => {
      close();
    }, 3000);
  };

  useEffect(() => {
    const _id = window.localStorage.getItem('TransferIId');
    setId(_id);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setStatus(false);
    }, 5000);
  }, [status]);
  return (
    <>
      <div className="column relative z-50 mx-auto h-auto w-[430px]  max-w-full items-center justify-center rounded-lg bg-white px-8 py-8 dark:bg-light-dark">
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

        <div className="mb-6 mt-2">
          <p className="mb-8">
            Producto Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Velit ipsum consectetur nisi et! Illo, sequi?
          </p>
          <label className="mb-1 block text-sm font-bold text-gray-700 dark:text-white">
            Id
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="username"
            type="text"
            placeholder="Name"
            value={id}
            disabled
          />
        </div>
        <div className="mb-6 mt-2">
          <label className="mb-1 block text-sm font-bold text-gray-700 dark:text-white">
            To
          </label>
          {error.length == 0 ? (
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="username"
              type="text"
              placeholder="0x"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          ) : (
            <input
              className="focus:shadow-outline w-full appearance-none rounded border border-red-500 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="username"
              type="text"
              placeholder="0x"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          )}
          <label className="text-sm text-red-500">{error}</label>
        </div>
        <div>
          {loading && (
            <Button size="small">
              <span className="blockbg-transparent text-sm text-white outline-none focus:outline-none">
                Cargando...
              </span>
            </Button>
          )}
        </div>
        <div className="flex w-full justify-evenly">
          {!loading && approvedToken && (
            <Button onClick={transfer} size="small">
              <span className="blockbg-transparent text-sm text-white outline-none focus:outline-none">
                Transferir
              </span>
            </Button>
          )}

          {!loading && !approvedToken && (
            <Button onClick={Approve} size="small">
              <span className="blockbg-transparent text-sm text-white outline-none focus:outline-none">
                Aprobar
              </span>
            </Button>
          )}
          <AnchorLink href="/">
            {!loading && (
              <Button onClick={close} size="small">
                <span className="blockbg-transparent text-sm text-white outline-none focus:outline-none">
                  Cancelar
                </span>
              </Button>
            )}
          </AnchorLink>
        </div>
      </div>
      {status == true && (
        <div
          className="mb-4 ml-[20px] mt-[30px] flex w-[400px] justify-center self-center rounded-lg bg-green-200 p-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          <span className="text-center font-medium">
            la transferencia se ejecuto correctamente
          </span>
        </div>
      )}
    </>
  );
}
