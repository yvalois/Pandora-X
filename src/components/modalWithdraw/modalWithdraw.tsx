import React, { useEffect, useState } from 'react';
import { useModal } from '@/components/modal-views/context';
import { disconectWallet } from '../../redux/Blockchain/blockchainAction';
import { useDispatch, useSelector } from 'react-redux';
import Web3Modal from 'web3modal';
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

export default function ModalWithdraw() {
  const { closeModal } = useModal();
  const [valor, setValor] = useState(0);
  const [loading, setLoading] = useState(false);
  const [approvedToken, setApprovedToken] = useState(0);
  const [id, setId] = useState(0);
  const [succes, setSuccess] = useState(false);
  const { inversionMinter, staking, tokenContract, accountAddress } =
    useSelector((state) => state.blockchain);
  const dispatch = useDispatch<AppDispatch>();

  const getInfo = async () => {
    const _id = window.localStorage.getItem('WithdrawID');
    const _val = await inversionMinter.getPricePlusFee(_id);
    const _valor = parseFloat(ethers.utils.formatUnits(_val, 6)).toFixed(2);
    const lastValor = parseFloat(_valor * (10 / 1000)).toFixed(3);
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
    } catch (e) {
      setLoading(false);
    }
  };

  const withdraw = async () => {
    setLoading(true);
    const tx = await staking.withdrawP(id);
    await tx.wait();

    dispatch(uStaking());
    dispatch(uInvertion());
    setLoading(false);
    closeModal('Withdraw_VIEW');
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      window.localStorage.removeItem('WithdrawID');
    }, 3000);
  };

  const close = () => {
    window.localStorage.removeItem('WithdrawID');
    closeModal('Withdraw_VIEW');
  };

  useEffect(() => {
    getInfo();
  }, []);
  return (
    <>
      <div className="relative z-50 mx-auto h-[400px] w-[400px] max-w-full rounded-lg bg-white px-6 py-16 dark:bg-light-dark">
        <button
          className="absolute right-[20px] top-[20px] mb-2 flex h-[20px] w-[20px] items-center justify-center rounded-[50%] bg-black text-center   text-2xl font-medium uppercase dark:text-white"
          onClick={close}
        >
          <span className="blockbg-transparent text-sm text-white outline-none focus:outline-none">
            X
          </span>
        </button>
        <p className="mb-8">
          Aun no cumples con la fecha de staking como castigo debes pagar 10%
          del valor de tu nft para evitar este castigo solo debes esperar a que
          tu stakeo se cumpla
        </p>
        <div className="mb-6">
          <label className="mb-1 block text-sm font-bold text-gray-700 dark:text-white">
            Valor
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
          <div className="row flex w-[100%]  justify-between">
            <Button onClick={withdraw}>Pagar</Button>
          </div>
        )}

        {loading && (
          <div className="row flex w-[100%]  justify-between">
            <Button>Cargando...</Button>
          </div>
        )}
      </div>
      {succes && (
        <div
          className="absolute top-[430px] right-[50px] mb-4 mt-[0px] w-[300px] justify-center self-center rounded-lg bg-green-200  p-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          <span className="font-medium">Transaccion exitosa</span>
        </div>
      )}
    </>
  );
}
