import React, { useEffect, useState } from 'react';
import { useModal } from '@/components/modal-views/context';
import { disconectWallet } from '../../redux/Blockchain/blockchainAction';
import { useDispatch, useSelector } from 'react-redux';

import WalletConnectProvider from '@walletconnect/web3-provider';
import { connectWallet } from '../../redux/Blockchain/blockchainAction';
import Button from '@/components/ui/button';
import cn from 'classnames';
import CoinInput from '@/components/ui/coin-input';
import { SwapIcon } from '@/components/icons/swap-icon';
import { ethers } from 'ethers';
import { setISODay } from 'date-fns';
import { uStaking, uInvertion } from '../../redux/Blockchain/blockchainAction';
import { useWindowScroll } from 'react-use';
import { useAccount, useProvider } from 'wagmi';

export default function ModalSubasta() {
  const { closeModal } = useModal();
  const [valor, setValor] = useState(0);
  const [loading, setLoading] = useState(false);
  const [approvedToken, setApprovedToken] = useState(0);
  const [id, setId] = useState(0);
  const [succes, setSuccess] = useState(false);
  const { inversionMinter, staking, tokenContract, accountAddress } =
    useSelector((state) => state.blockchain);
  const dispatch = useDispatch<AppDispatch>();
  const [statusW, setStatusW] = useState(0);
  const [alertMsg, setAlertMsg] = useState('');

  const getInfo = async () => {
    const _id = window.localStorage.getItem('WithdrawID');
    const _val = await inversionMinter.getPrice(_id);
    const _valor = parseInt(ethers.utils.formatUnits(_val, 6));
    const lastValor = parseInt(_valor * (10 / 100));
    setId(_id);
    setValor(lastValor);
  };

  const verifyApprove = async () => {
    try {
      const usdt = await tokenContract.allowance(
        accountAddress,
        staking.address
      );
      //MarketPlace
      //setApprovedUsdt(ethers.utils.formatUnits(usdt, 18));
      setApprovedToken(ethers.utils.formatUnits(usdt, 6));
    } catch (e) {}
  };

  const approve = async () => {
    setLoading(true);

    try {
      const decimals = 6;

      const tx = await tokenContract.approve(
        staking.address,
        ethers.utils.parseUnits(valor.toString(), decimals)
      );
      await tx.wait();
      await verifyApprove();
      setLoading(false);
      setAlertMsg('Aprobado');
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

  const provider = useProvider();
  const { address } = useAccount();

  const withdraw = async () => {
    setLoading(true);
    try {
      const tx = await staking.withdrawP(id, tokenContract.address);
      await tx.wait();

      dispatch(uStaking(accountAddress));
      dispatch(uInvertion(address));
      setStatusW(200);
      setLoading(false);
      closeModal('Withdraw_VIEW');
      setAlertMsg('Transaccion completada correctamente');
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

  const close = () => {
    window.localStorage.removeItem('WithdrawID');
    closeModal('Withdraw_VIEW');
  };

  useEffect(() => {
    getInfo();
    verifyApprove();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.localStorage.removeItem('WithdrawID');
      setStatusW(0);
    }, 5000);
  }, [statusW]);
  return (
    <>
      <div className="relative z-50 mx-auto h-auto w-[400px] max-w-full rounded-lg bg-white px-6 py-16 dark:bg-light-dark">
        <button
          className="absolute right-[20px] top-[20px] flex h-[20px] w-[20px] items-center justify-center rounded-[50%] bg-black text-center   text-2xl font-medium uppercase dark:text-white"
          onClick={close}
        >
          <span className="blockbg-transparent text-sm text-white outline-none focus:outline-none">
            X
          </span>
        </button>
        <p className="row mb-4 flex w-[100%] justify-center  text-lg font-semibold">
          Subasta
        </p>
        <div className="mb-6">
          <label className="mb-4 block text-sm font-bold text-gray-700 dark:text-white">
            Por favor ingresa el valor inicial de tu nft.
          </label>

          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="username"
            type="text"
            placeholder="Name"
            value={valor}
            disabled
          />
        </div>

        <div className="mb-6">
          <label className="mb-4 block text-sm font-bold text-gray-700 dark:text-white">
            Por favor ingresa cuantos dias quieres que dure la.
          </label>

          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="username"
            type="text"
            placeholder="Name"
            value={valor}
            disabled
          />
        </div>
        {!loading && approvedToken < valor && (
          <div className="row flex w-[100%]  justify-between">
            <Button onClick={approve}>Aprobar</Button>
          </div>
        )}

        {!loading && approvedToken >= valor && (
          <div className="row flex w-[100%]  justify-center">
            <Button onClick={withdraw}>Aprobar</Button>
          </div>
        )}

        {loading && (
          <div className="row flex w-[100%]  justify-between">
            <Button>Cargando...</Button>
          </div>
        )}
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
