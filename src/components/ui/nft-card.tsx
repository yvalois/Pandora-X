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
import ActiveLink from './links/active-link';
import Button from '@/components/ui/button';
import pandorax from '@/assets/images/Pandora-X-icon-04.svg';

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
  tipo,
}) {
  //const { isConnect, account } = useSelector((state) => state.Usuario);
  const {
    productoMinter,
    inversionMinter,
    isConnect,
    accountAddress,
    tokenContract,
    usdtContract,
  } = useSelector((state) => state.blockchain);

  const { referidor } = useSelector((state) => state.Usuario);

  /*const signer = provider?.getSigner();
  console.log(signer);
  const usdtContract = new ethers.Contract(
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

  const CButton = styled.div`
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

  return (
    <div className="relative  w-[140px] overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark xs:w-[220px] sm:w-[260px] md:w-[220px] xl:w-[280px] 2xl:w-[240px] 3xl:w-[340px]">
      <div className="p-4">
        <div className="flex items-center text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
          {
            <Avatar
              image={pandorax}
              alt={name}
              size="xs"
              className="self-center text-ellipsis rtl:mr-3  rtl:ml-3 dark:border-gray-500"
            />
          }
          <span className="overflow-hidden text-ellipsis">@PandoraX</span>
        </div>
      </div>
      {type == 'comprap' ? (
        <AnchorLink
          href={`/productosbd/nft-detailsP${number}`}
          className="relative block w-full pb-full"
        >
          <Image src={image} layout="fill" objectFit="cover" alt="" />
        </AnchorLink>
      ) : type == 'compraI' ? (
        <AnchorLink
          href={`/inversionbd/nft-detailsI${number}`}
          className="relative block w-full pb-full"
        >
          <Image src={image} layout="fill" objectFit="cover" alt="" />
        </AnchorLink>
      ) : type == 'productos' ? (
        <AnchorLink
          href={`/info/${number}`}
          className="relative block w-full pb-full"
        >
          <Image src={image} layout="fill" objectFit="cover" alt="" />
        </AnchorLink>
      ) : type == 'Frenchies Blues' ? (
        <AnchorLink
          href={`/infoFrenchies/${number}`}
          className="relative block w-full pb-full"
        >
          <Image src={image} layout="fill" objectFit="cover" alt="" />
        </AnchorLink>
      ) : (
        <AnchorLink
          href={`/infoinv/${number}`}
          className="relative block w-full pb-full"
        >
          <Image src={image} layout="fill" objectFit="cover" alt="" />
        </AnchorLink>
      )}

      <div className="p-5">
        {type == 'comprap' ? (
          <AnchorLink
            href={`/productosbd/nft-detailsP${number}`}
            className="text-sm font-medium text-black dark:text-white"
          >
            {name}
          </AnchorLink>
        ) : type == 'compraI' ? (
          <AnchorLink
            href={`/inversionbd/nft-detailsI${number}`}
            className="text-sm font-medium text-black dark:text-white"
          >
            {name}
          </AnchorLink>
        ) : type == 'productos' ? (
          <AnchorLink
            href={`/info/${number}`}
            className="text-sm font-medium text-black dark:text-white"
          >
            {name}
          </AnchorLink>
        ) : (
          <AnchorLink
            href={`/infoinv/${number}`}
            className="text-sm font-medium text-black dark:text-white"
          >
            {name}
          </AnchorLink>
        )}

        <div className="mt-1.5 flex">
          {type == 'comprap' && (
            <AnchorLink
              href={`/productosbd/nft-detailsP${number}`}
              className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400"
            >
              Productos
              <Verified className="ltr:ml-1 rtl:mr-1" />
            </AnchorLink>
          )}

          {type == 'compraI' && (
            <AnchorLink
              href={`/inversionbd/nft-detailsI${number}`}
              className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400"
            >
              Inversiones
              <Verified className="ltr:ml-1 rtl:mr-1" />
            </AnchorLink>
          )}
        </div>

        <div className="mt-1.5 flex">
          {type == 'productos' && (
            <div
              href={`/infoinv/${number}`}
              className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400"
            >
              Productos
              <Verified className="ltr:ml-1 rtl:mr-1" />
            </div>
          )}

          {type == 'staking' && (
            <div
              href={`/infoinv/${number}`}
              className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400"
            >
              Inversiones
              <Verified className="ltr:ml-1 rtl:mr-1" />
            </div>
          )}
        </div>

        {alldata && (
          <div className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            ${price} USDT
          </div>
        )}

        {/*<div>
          {loading && (
            <Button size="small" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </Button>
          )}
          {alldata && !loading && !isConnect && (
            <Button
              size="small"
              onClick={() => {
                dispatch(connectWallet());
              }}
            >
              Connect Wallet
            </Button>
          )}

          {alldata && isConnect && !loading && price > approvedToken && (
            <Button size="small" onClick={approve}>
              Approve
            </Button>
          )}

          {alldata &&
            isConnect &&
            !loading && tokenAddress === '0xB797D01EA243bCBFAd70c1c57fB12953e5e4043F' &&
            price <= approvedToken && (
              <Button size="small" onClick={() => buyNft(number)}>
                Buy
              </Button>
            )}

          {type == 'staking' && (
            <div className=" row ml-[-10px] mt-2   flex justify-evenly">
              <ActiveLink href={`/staking/${number}`}>
                <Button size="small">Stake</Button>
              </ActiveLink>
              <ActiveLink href={`/infoinv/${number}`}>
                <Button size="small">Ver mas...</Button>
              </ActiveLink>
            </div>
          )}

          {type == 'productos' && (
            <ActiveLink href={`/info/${number}`}>
              <Button size="small" className="mt-2">
                Ver mas...
              </Button>
            </ActiveLink>
          )}
        </div>*/}
      </div>
    </div>
  );
}
