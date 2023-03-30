import React, { useEffect, useState } from 'react';
import { useModal } from '@/components/modal-views/context';
import {
  disconectWallet,
  uFrench2,
} from '../../redux/Blockchain/blockchainAction';
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
import validator from 'validator';
import frenchiesAbi2 from '../../abi/FrenchiesBlues2.json';

export default function ModalPuja() {
  const { closeModal, openModal } = useModal();
  const [valor, setValor] = useState(0);
  const [loading, setLoading] = useState(false);
  const [approvedToken, setApprovedToken] = useState(0);
  const [id, setId] = useState(0);
  const [succes, setSuccess] = useState(false);
  const { accountAddress, frenchiesMinter, auctionContract, chainId } =
    useSelector((state) => state.blockchain);
  const dispatch = useDispatch<AppDispatch>();
  const [statusW, setStatusW] = useState(0);
  const [alertMsg, setAlertMsg] = useState('');
  const [ap, setAp] = useState(false);
  const [subastado, setSubastado] = useState(false);
  const [dias, setDias] = useState(0);
  const [initPrice, setInitPrice] = useState(0);

  const getInfo = async () => {
    const _id = window.localStorage.getItem('pujaId');
    setId(_id);
  };

  const rpc_ETH =
    'https://eth-goerli.g.alchemy.com/v2/vMRJQCaauogYOxluxt-rWvqPPemy_fzG';
  const provider_ETH = new ethers.providers.JsonRpcProvider(rpc_ETH);

  const frenchiesMinterContract = new ethers.Contract(
    '0x18bdD7A20134d0e3eF544aD57513bEDC0728Ca61',
    //'0x32bfb6790B3536a7269185278B482A0FA0385362',
    frenchiesAbi2,
    provider_ETH
  );

  const nftdata = {
    tokenId: '',
    seller: '',
    startBlock: 0,
    endBlock: 0,
    startPrice: 0,
    currentPrice: 0,
    currentWinner: '',
    active: false,
    name: '',
    image: '',
    id: 0,
    type: '',
    description: '',
  };

  const [nft, setNft] = useState(nftdata);

  useEffect(() => {
    const storedJsonString = window.localStorage.getItem('nft');
    const storedObject = JSON.parse(storedJsonString);
    setNft(storedObject);
  }, []);

  const provider = useProvider();
  const { address } = useAccount();

  const Pujar = async () => {
    if (chainId == 5) {
      setLoading(true);
      try {
        if (parseFloat(nft.currentPrice) > parseFloat(initPrice)) {
          const options = {
            value: ethers.utils.parseUnits(initPrice.toString(), 'ether'),
          };
          const tx = await auctionContract.bidApuestas(nft.tokenId, options);
          await tx.wait();
          setStatusW(200);
          setLoading(false);
          setAlertMsg('Transaccion completada correctamente');
        } else {
          setStatusW(100);
          setLoading(false);
          setAlertMsg(
            `Valor debe ser mayor a ${parseFloat(
              nft.currentPrice / 1000000000000000000
            ).toFixed(3)}`
          );
        }
      } catch (err) {
        setLoading(false);
        setStatusW(100);
        const mess = err.message.split('[');
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
    } else {
      openModal('NETWORK_VIEW');
      setLoading(false);
    }
  };
  const close = () => {
    window.localStorage.removeItem('SubastaId');
    closeModal();
  };

  useEffect(() => {
    getInfo();
  }, []);

  const changeCantidadM = (e) => {
    const { value } = e.target;
    let newValue = '';

    if (!isNaN(value)) {
      newValue = value;
    } else if (value.endsWith('.') && !value.includes('.')) {
      newValue = value;
    } else if (!value.endsWith('.') && !value.includes('.')) {
      newValue = parseFloat(value).toString();
    } else if (value.includes('.')) {
      const parts = value.split('.');
      const integerPart = parts[0].replace(/[^0-9]/g, '');
      const decimalPart = parts[1].replace(/[^0-9]/g, '');
      newValue = `${integerPart}.${decimalPart}`;
    }

    if (newValue == '') {
      setInitPrice(0);
    } else if (initPrice == 0 && !value.includes('.')) {
      setInitPrice(parseFloat(initPrice) + parseFloat(initPrice + newValue));
    } else {
      setInitPrice(newValue);
    }
  };

  const changeCantidadD = (e) => {
    let cant = e.target.value;
    if (validator.isNumeric(cant)) {
      if (dias == 0) {
        setDias(dias + parseInt(cant));
        const cant_ = dias + parseInt(cant);
      } else {
        setDias(parseInt(cant));
      }
    } else if (cant == '') {
      setDias(0);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (statusW != 0 && subastado) {
        window.localStorage.removeItem('SubastaId');
        setStatusW(0);
        window.location.href = '/frenchies';
      } else {
        setStatusW(0);
      }
    }, 5000);
  }, [statusW]);
  return (
    <>
      <div className="relative z-50 mx-auto h-auto w-[350px] max-w-full rounded-lg bg-white px-6 py-16 dark:bg-light-dark">
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
        <div className="mb-10">
          <label className="mb-4 block text-sm font-bold text-gray-700 dark:text-white">
            Recuerda que el valor debe ser mayor a: $
            {parseFloat(nft.currentPrice / 1000000000000000000).toFixed(3)} eth
          </label>

          <input
            onChange={(e) => changeCantidadM(e)}
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="username"
            type="text"
            placeholder="Precio"
            value={initPrice}
          />
        </div>

        {/*<div className="mb-6">
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
  </div>*/}

        {!loading && (
          <div className="row flex w-[100%]  justify-center">
            <Button onClick={Pujar}>Pujar</Button>
          </div>
        )}

        {loading && (
          <div className="row flex w-[100%]  justify-center">
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
