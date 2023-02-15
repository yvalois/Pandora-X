import React, { useEffect, useState } from 'react';
import { useModal } from '@/components/modal-views/context';
import AnchorLink from '../ui/links/anchor-link';
import Button from '../ui/button';
import { Warning } from '@/components/icons/warning';
import { useDispatch, useSelector } from 'react-redux';
import { uInvertion } from '@/redux/Blockchain/blockchainAction';

export default function ModalWithdraw() {
  const { closeModal, openModal } = useModal();
  const [valor, setValor] = useState(0);
  const [loading, setLoading] = useState(false);
  const [approvedToken, setApprovedToken] = useState(0);
  const [id, setId] = useState(0);
  const [succes, setSuccess] = useState(false);
  const [msg, setMsg] = useState(false);
  const [msg2, setMsg2] = useState(false);
  const [statusW, setStatusW] = useState(0);
  const [alertMsg, setAlertMsg] = useState('');

  const { inventorys, staking, tokenContract, chainId } = useSelector(
    (state) => state.blockchain
  );
  const [alert, setAlert] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const close = () => {
    closeModal();
  };

  const verify = async () => {
    const value = window.localStorage.getItem('WithdrawID');
    setLoading(true);
    try {
      //
      const isOutTime = await staking.isOutTime(value);
      if (isOutTime) {
        window.localStorage.setItem('WithdrawID', value.toString());
        openModal('WITHDRAW_VIEW');
        setLoading(false);
      } else {
        const tx = await staking.withdraw(value);
        await tx.wait();

        dispatch(uInvertion(provider, address));
        setLoading(false);
        setStatusW(200);
        setAlertMsg('Transacion cumplida');
      }
    } catch (err) {
      setLoading(false);
      setStatusW(100);
      //console.log(err)
      const mess = err.message.split('[');
      //const messa = mess[1].split(":")
      //const messag = messa[3].split(",")
      //const messag_ = messag[0].split("-")
      const rejected = mess[0].split(' ');

      if (mess[0] == 'insufficient funds for intrinsic transaction cost ') {
        setAlertMsg('Fondos insuficientes');
      } else if (rejected[0] == 'user' && rejected[1] == 'rejected') {
        setAlertMsg('Transacion rechazada');
      } else {
        setAlertMsg('Error');
      }
      //
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setStatusW(0);
    }, 5000);
  }, [statusW]);

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
        <center>
          <h1 className="mb-4 font-bold">Cancel Staking</h1>
        </center>
        <p className="mb-8">
          Once you confirm your request to unstake, the NFT will be returned to
          your account and you will not earn any more rewards.
        </p>

        <div className="mb-6">
          {' '}
          {!msg && alert.length > 0 && (
            <label className="ml-6 text-xs text-red-500">{alert}</label>
          )}
        </div>
        <div className="flex w-full justify-evenly">
          {!loading && (
            <Button onClick={verify} size="small">
              <span className="blockbg-transparent text-sm text-white outline-none focus:outline-none">
                aceptar
              </span>
            </Button>
          )}
          {loading && (
            <Button size="small">
              <span className="blockbg-transparent text-sm text-white outline-none focus:outline-none">
                cargando...
              </span>
            </Button>
          )}
          <AnchorLink href="/">
            {!loading && (
              <Button size="small">
                <span className="blockbg-transparent text-sm text-white outline-none focus:outline-none">
                  Cancelar
                </span>
              </Button>
            )}
            {loading && (
              <Button size="small">
                <span className="blockbg-transparent text-sm text-white outline-none focus:outline-none">
                  cargando...
                </span>
              </Button>
            )}
          </AnchorLink>
        </div>
      </div>
      <div className="mt-12 flex w-full justify-center align-middle">
        {statusW == 200 && (
          <div
            className="absolute mb-8  w-[300px] justify-center self-center rounded-lg rounded-l bg-green-200  p-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800"
            role="alert"
          >
            <center>
              <span className="font-medium ">{alertMsg}</span>
            </center>
          </div>
        )}

        {statusW == 100 && (
          <div
            className=" absolute mb-8  w-[300px] justify-center self-center rounded-lg rounded-l bg-red-200  p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
            role="alert"
          >
            <center>
              <span className="font-medium ">{alertMsg}</span>
            </center>
          </div>
        )}
      </div>
    </>
  );
}
