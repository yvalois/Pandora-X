import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { Verified } from '@/components/icons/verified';
import Avatar from '@/components/ui/avatar';
import { StaticImageData } from 'next/image';
import styled from 'styled-components';
import { useState } from 'react';
import { tokens } from '../../utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { provider } from '../../NFTROL';

import abiErc20 from '../../abi/abiERC20.json'; //Buscar
import productoMinterAbi from '../../abi/productoMinter.json';
import inversionMinterAbi from '../../abi/inversionMinter.json';
import { connectWallet } from '../../redux/Blockchain/blockchainAction';

type NFTGridProps = {
  image: StaticImageData;
  name: string;
  number: number;
  price: number;
  alldata: boolean;
  type: string;
  nftInfo?: object;
};

export default function NFTGrid({
  //author,
  //authorImage,
  image,
  name,
  number,
  price,
  alldata,
  type,
  nftInfo,
  setNftInfo,
}) {
  //const { isConnect, account } = useSelector((state) => state.Usuario);
  const {
    productoMinter,
    inversionMinter,
    isConnect,
    accountAddress,
    usdtContract,
    tokenContract,
  } = useSelector((state) => state.blockchain);

  const { referidor } = useSelector((state) => state.Usuario);

  /*const signer = provider?.getSigner();
  console.log(signer);
  const tokenContract = new ethers.Contract(
    '0xB797D01EA243bCBFAd70c1c57fB12953e5e4043F',
    abiErc20,
    signer
  );*/
  //token Cambiar ABi solo con fines de prueba
  /*const nudaraMinter = new ethers.Contract(
    '0x6BB9547894806539C1465AeBafb3018adB0a313E',
    nudaraMinterAbi,
    signer
  );*/ //Contracto del marketplace

  const [tokenAddress, setTokenAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [cuenta, setCuenta] = useState('');
  const [approvedUsdt, setApprovedUsdt] = useState(0);
  const [approvedToken, setApprovedToken] = useState(0);

  const Usuario = useSelector((state) => state.Usuario);
  const dispatch = useDispatch<AppDispatch>();

  const GlassCard = styled.div`
    background: rgba(255, 255, 255, 0.093);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5.7px);
    -webkit-backdrop-filter: blur(5.7px);
    border: 1px solid rgba(255, 255, 255, 0.241);
    width: 250px;
    height: 350px;
    overflow: hidden;
  `;
  const BuyButton = styled.button`
    background: #000;
    border: none;
    border-radius: 16px;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    padding: 5px 20px;
    text-transform: uppercase;
    transition: all 0.1s ease-in-out;
    cursor: pointer;
    &:hover {
      background: #fff;
      color: #000;
    }
  `;

  const CBuyButton = styled.div`
    background: #000;
    border: none;
    border-radius: 16px;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    padding: 5px 20px;
    text-transform: uppercase;
    transition: all 0.1s ease-in-out;
    width: 55%;
  `;

  const Options = styled.option`
    color: #fff;
    background: #000;
    font-weight: 600;
    text-transform: uppercase;
    cursor: pointer;
  `;

  const Select = styled.select`
    background: #000;
    border: none;
    border-radius: 16px;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    padding: 5px 20px;
    text-transform: uppercase;
    transition: all 0.1s ease-in-out;
    cursor: pointer;
    &:hover {
      background: #fff;
      color: #000;
    }
  `;

  const buyNft = async (id: number) => {
    setLoading(true);
    try {
      if (type == 'producto') {
        if (!Usuario.isReferido && Usuario.type == 'Agente X') {
          let porcentaje = 0;
          if (Usuario.range == 'peerx') {
            porcentaje = 200;
          } else if (Usuario.range == 'blockelite') {
            porcentaje = 250;
          } else if (Usuario.range == 'blockmaster') {
            porcentaje = 350;
          } else if (Usuario.range == 'blockcreator') {
            porcentaje = 400;
          }

          const tx = await productoMinter.buyTokenWithReferido(
            id.toString(),
            tokenContract.address,
            referidor,
            porcentaje
          );
          //referidos
          await tx.wait();
          setLoading(false);
          setApprovedToken(0);
        } else {
          const tx = await productoMinter.buyToken(
            id.toString(),
            tokenContract.address
          );

          await tx.wait(); //tener en cuenta para los proximos cambios
          setLoading(false);
          setApprovedToken(0);
        }
      } else if (type == 'inversion') {
        const tx = await inversionMinter.buyToken(id.toString());
        await tx.wait();
        setLoading(false);
        setApprovedToken(0);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const verifyApprove = async () => {
    try {
      if (type == 'producto') {
        const usdt = await tokenContract.allowance(
          accountAddress,
          productoMinter.address
        ); //MarketPlace
        //setApprovedUsdt(ethers.utils.formatUnits(usdt, 18));
        setApprovedToken(ethers.utils.formatUnits(usdt, 18));
        alert(approvedToken);
      } else if (type == 'inversion') {
        const usdt = await tokenContract.allowance(
          accountAddress,
          inversionMinter.address
        ); //MarketPlace
        //setApprovedUsdt(ethers.utils.formatUnits(usdt, 18));
        setApprovedToken(ethers.utils.formatUnits(usdt, 18));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const approve = async () => {
    setLoading(true);

    try {
      if (type == 'producto') {
        setTokenAddress(tokenContract.address);
        const decimals = 18;
        console.log(tokenContract);
        const tx = await tokenContract.approve(
          productoMinter.address,
          ethers.utils.parseUnits('999', decimals)
        );

        await tx.wait();
        await verifyApprove();
        setLoading(false);
      } else if (type == 'inversion') {
        setTokenAddress(tokenContract.address);
        const decimals = 18;
        const tx = await tokenContract.approve(
          inversionMinter.address,
          ethers.utils.parseUnits('999', decimals)
        );

        await tx.wait();
        await verifyApprove();
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnect) {
      setCuenta(accountAddress);
    }
  }, [isConnect]);

  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark">
      <div className="p-4">
        <div className="flex items-center text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
          {/*<Avatar
            image={authorImage}
            alt={name}
            size="sm"
            className="text-ellipsis ltr:mr-3 rtl:ml-3 dark:border-gray-500"
          />*/}
          {/*<span className="overflow-hidden text-ellipsis">@{author}</span>*/}
        </div>
      </div>
      <div className="relative block w-full pb-full">
        <Image
          src={image}
          //placeholder="blur"
          layout="fill"
          objectFit="cover"
          alt=""
        />
      </div>

      <div className="p-5">
        <div className="text-sm font-medium text-black dark:text-white">
          {name}
        </div>
        <div className="mt-1.5 flex">
          <div className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400">
            {number + 1}
            <Verified className="ltr:ml-1 rtl:mr-1" />
          </div>
        </div>
        {alldata && (
          <div className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            {price}
          </div>
        )}
        <div>
          {loading && (
            <BuyButton type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </BuyButton>
          )}
          {alldata && !loading && !isConnect && (
            <BuyButton
              onClick={() => {
                dispatch(connectWallet());
              }}
            >
              Connect Wallet
            </BuyButton>
          )}

          {alldata && isConnect && !loading && price > approvedToken && (
            <BuyButton onClick={approve}>Approve</BuyButton>
          )}

          {alldata &&
            isConnect &&
            !loading /*&& tokenAddress === '0xB797D01EA243bCBFAd70c1c57fB12953e5e4043F'*/ &&
            price <= approvedToken && (
              <BuyButton onClick={() => buyNft(number)}>Buy</BuyButton>
            )}

          {type == 'staking' && (
            <BuyButton onClick={() => setNftInfo(name, image, price, number)}>
              Select
            </BuyButton>
          )}
        </div>
      </div>
    </div>
  );
}
