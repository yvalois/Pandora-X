import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { Verified } from '@/components/icons/verified';
import Avatar from '@/components/ui/avatar';
import { StaticImageData } from 'next/image';
import styled from 'styled-components';
import { useState } from 'react';
import { tokens } from '../../utils/constant';
import { useSelector } from 'react-redux';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { provider } from '../../NFTROL';

import abiErc20 from '../../abi/abiERC20.json'; //Buscar
import nudaraMinterAbi from '../../abi/nudaraMinter.json';

type NFTGridProps = {
  image: StaticImageData;
  name: string;
  number: number;
  price: string;
};

export default function NFTGrid({
  //author,
  //authorImage,
  image,
  name,
  number,
  price,
}: NFTGridProps) {
  const { isConnect, account } = useSelector((state) => state.Usuario);
  const signer = provider?.getSigner();
  console.log(signer);
  const usdtContract = new ethers.Contract(
    '0xB797D01EA243bCBFAd70c1c57fB12953e5e4043F',
    abiErc20,
    signer
  ); //token Cambiar ABi solo con fines de prueba
  const nudaraMinter = new ethers.Contract(
    '0x6BB9547894806539C1465AeBafb3018adB0a313E',
    nudaraMinterAbi,
    signer
  ); //Contracto del marketplace
  console.log(usdtContract);
  const [tokenAddress, setTokenAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [cuenta, setCuenta] = useState('');
  const [approvedUsdt, setApprovedUsdt] = useState(false);
  const [approvedBusd, setApprovedBusd] = useState(0);
  const [approvedUsdc, setApprovedUsdc] = useState(0);
  const [approvedDai, setApprovedDai] = useState(0);

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
      console.log('a');
      const tx = await nudaraMinter.buyToken(
        id.toString(),
        '0xB797D01EA243bCBFAd70c1c57fB12953e5e4043F'
      );
      console.log('3');
      await tx.wait();
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const verifyApprove = async () => {
    try {
      const usdt = await usdtContract.allowance(
        account,
        '0x6BB9547894806539C1465AeBafb3018adB0a313E'
      ); //MarketPlace
      console.log(ethers.utils.formatUnits(usdt, 18));
      setApprovedUsdt(ethers.utils.formatUnits(usdt, 18));
    } catch (e) {
      console.log(e);
    }
  };

  const approve = async () => {
    setLoading(true);

    try {
      let contract = usdtContract;
      const decimals = 18;
      const tx = await contract.approve(
        '0x6BB9547894806539C1465AeBafb3018adB0a313E',
        ethers.utils.parseUnits('1', decimals)
      );
      await tx.wait();
      setLoading(false);
      setApprovedUsdt(true);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnect) {
      setCuenta(account);
    }
  }, [isConnect, loading]);

  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark">
      <div className="p-4">
        <AnchorLink
          href="/"
          className="flex items-center text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          {/*<Avatar
            image={authorImage}
            alt={name}
            size="sm"
            className="text-ellipsis ltr:mr-3 rtl:ml-3 dark:border-gray-500"
          />*/}
          {/*<span className="overflow-hidden text-ellipsis">@{author}</span>*/}
        </AnchorLink>
      </div>
      <AnchorLink href="/nft-details" className="relative block w-full pb-full">
        <Image
          src={image}
          //placeholder="blur"
          layout="fill"
          objectFit="cover"
          alt=""
        />
      </AnchorLink>

      <div className="p-5">
        <AnchorLink
          href="/nft-details"
          className="text-sm font-medium text-black dark:text-white"
        >
          {name}
        </AnchorLink>
        <div className="mt-1.5 flex">
          <AnchorLink
            href="/"
            className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400"
          >
            {number}
            <Verified className="ltr:ml-1 rtl:mr-1" />
          </AnchorLink>
        </div>
        <div className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
          {price}
        </div>
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
          {!loading && !isConnect && <CBuyButton>Connect Wallet</CBuyButton>}

          {isConnect && !loading && price > approvedUsdt && (
            <BuyButton onClick={approve}>Approve</BuyButton>
          )}

          {isConnect && !loading && approvedUsdt && (
            <BuyButton onClick={() => buyNft(number)}>Buy</BuyButton>
          )}
        </div>
      </div>
    </div>
  );
}
