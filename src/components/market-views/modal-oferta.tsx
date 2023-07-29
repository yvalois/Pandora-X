import React, { useEffect, useState } from 'react';
import { useModal } from '@/components/modal-views/context';

import { useDispatch, useSelector } from 'react-redux';

import Button from '@/components/ui/button';

import { ethers } from 'ethers';

import { useAccount } from 'wagmi';

export default function ModalOferta() {
  const { closeModal, openModal } = useModal();
  const [valor, setValor] = useState(0);
  const [loading, setLoading] = useState(false);
  const [approvedToken, setApprovedToken] = useState(0);
  const [id, setId] = useState(0);
  const [succes, setSuccess] = useState(false);
  const {
    staking,
    tokenContract,
    accountAddress,
    frenchiesMinter,
    ofertasContract,
    chainId,
  } = useSelector((state) => state.blockchain);
  const dispatch = useDispatch<AppDispatch>();
  const [statusW, setStatusW] = useState(0);
  const [alertMsg, setAlertMsg] = useState('');
  const [ap, setAp] = useState(false);
  const [precio, setPrecio] = useState(0);

  const getInfo = async () => {
    const _id = window.localStorage.getItem('OfertaId');

    setId(_id);
  };

  const verifyApproved = async () => {
    let tx = await frenchiesMinter.isApprovedForAll(
      accountAddress,
      ofertasContract.address
    );
    if (tx == true) {
      setAp(true);
    }
  };

  const approve = async () => {
    setLoading(true);
    if (chainId == 1) {
      try {
        let tx = await frenchiesMinter.setApprovalForAll(
          ofertasContract.address,
          'true'
        );
        await tx.wait();
        verifyApproved();
        setLoading(false);
        setStatusW(200);
        setAlertMsg('Aprobado correctamente');
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
      }
    } else {
      openModal('NETWORK_VIEW');
      setLoading(false);
    }
  };

  const { address } = useAccount();

  const ofertar = async () => {
    if (chainId == 1) {
      setLoading(true);
      try {
        if (
          parseFloat(nft.max).toFixed(3) < parseFloat(precio) ||
          nft.max == undefined
        ) {
          const options = {
            value: ethers.utils.parseUnits(precio.toString(), 'ether'),
          };
          const tx = await ofertasContract.bidOfertas(id, options);
          await tx.wait();

          setStatusW(200);
          setLoading(false);
          setAlertMsg('Transaccion completada correctamente');
        } else {
          setStatusW(100);
          setLoading(false);
          setAlertMsg('Tu oferta debe ser mayor a la oferta actual');
        }
      } catch (err) {
        setLoading(false);
        setStatusW(100);
        const mess = err.message.split('[');
        const rejected = mess[0].split(' ');
        console.log(err);
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
    window.localStorage.removeItem('VentaId');
    closeModal('Withdraw_VIEW');
  };

  useEffect(() => {
    getInfo();
    verifyApproved();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (statusW != 0 && statusW != 100) {
        window.localStorage.removeItem('OfertaId');
        setStatusW(0);
        window.location.href = '/frenchies';
      }
    }, 5000);
  }, [statusW]);

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
      setPrecio(0);
    } else if (precio == 0 && !value.includes('.')) {
      setPrecio(parseFloat(precio) + parseFloat(precio + newValue));
    } else {
      setPrecio(newValue);
    }
  };

  const nftdata = {
    active: null,
    currentWinner: '',
    id: 0,
    image: '',
    max: 0,
    name: '',
    owner: '',
    tokenId: 0,
    type: '',
  };

  const [nft, setNft] = useState(nftdata);

  useEffect(() => {
    const fetch = async () => {
      const storedJsonString = window.localStorage.getItem('nft');
      const storedObject = JSON.parse(storedJsonString);
      setNft(storedObject);
    };
    fetch();
  }, []);

  return (
    <>
      <div className="relative z-50 mx-auto h-auto w-[400px] max-w-full rounded-lg bg-white px-6 py-16 dark:bg-light-dark">
        <button
          className="absolute right-[20px] top-[20px] mb-2 flex h-[20px] w-[20px] items-center justify-center rounded-[50%] bg-black text-center   text-2xl font-medium uppercase dark:text-white"
          onClick={close}
        >
          <span className="blockbg-transparent text-sm text-white outline-none focus:outline-none">
            X
          </span>
        </button>
        <p className="row mb-4 flex w-[100%] justify-center  text-lg font-semibold">
          Ofertar
        </p>
        <div className="mb-6">
          <label className="mb-4 block text-sm font-bold text-gray-700 dark:text-white">
            Recuerda que el valor de la oferta debe ser mayor a la antigua
            oferta ${parseFloat(nft?.max / 1000000000000000000).toFixed(3)} ETH.
          </label>

          <input
            onChange={(e) => changeCantidadM(e)}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="username"
            type="text"
            placeholder="Precio"
            value={precio}
          />
        </div>
        {/*!loading && !ap && (
          <div className="row flex w-[100%]  justify-center">
            <Button onClick={approve}>Aprobar</Button>
          </div>
        )*/}

        {!loading && (
          <div className="row flex w-[100%]  justify-center">
            <Button onClick={ofertar}>Ofertar</Button>
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
