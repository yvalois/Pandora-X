import Image from '@/components/ui/image';
import { ArrowUp } from '@/components/icons/arrow-up';
import { Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { StaticImageData } from 'next/image';
import NFTGrid from '@/components/ui/nft-card';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectWallet } from '../../redux/Blockchain/blockchainAction';
import styled from 'styled-components';

type CoinCardProps = {
  id: string;
  name: string;
  symbol: string;
  logo: StaticImageData;
  balance: string;
  usdBalance: string;
  change: string;
  isChangePositive: boolean;
  color?: string;
};

interface CoinSliderProps {
  coins: CoinCardProps[];
}

export default function NftSlider({
  nfts,
  priceFormat,
  nftInfo,
  setNftInfo,
  type,
}) {
  const sliderBreakPoints = {
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1080: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    1280: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1700: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    2200: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  };
  const Button = styled.button`
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

  const { isConnect } = useSelector((state) => state.blockchain);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      {isConnect && (
        <Swiper
          modules={[Scrollbar, A11y]}
          spaceBetween={24}
          slidesPerView={1}
          scrollbar={{ draggable: true }}
          breakpoints={sliderBreakPoints}
          observer={true}
          dir="ltr"
        >
          {nfts.map((nfts) => (
            <SwiperSlide key={nfts.id}>
              <NFTGrid
                key={nfts.nombre}
                name={nfts.nombre}
                image={nfts.img}
                price={nfts.precio}
                number={nfts.id}
                alldata={false}
                type={type}
                nftInfo={nftInfo}
                setNftInfo={setNftInfo}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {!isConnect && (
        <div className="flex  h-[375px] w-full items-center  justify-center bg-gray-200">
          <Button
            className="self-center"
            onClick={() => {
              dispatch(connectWallet());
            }}
          >
            Connect Wallet
          </Button>
        </div>
      )}
    </div>
  );
}
