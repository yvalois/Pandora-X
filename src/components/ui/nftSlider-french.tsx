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
import CollectionCard from '@/components/ui/collection-card_French';

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

export default function NftSlider({ nfts, type, setNftSelect }) {
  const sliderBreakPoints = {
    768: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1080: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    1700: {
      slidesPerView: 4,
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
      <Swiper
        modules={[Scrollbar, A11y]}
        spaceBetween={24}
        slidesPerView={4}
        scrollbar={{ draggable: true }}
        breakpoints={sliderBreakPoints}
        observer={true}
        dir="ltr"
      >
        {nfts.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              onClick={() => {
                setNftSelect(item);
              }}
            >
              <CollectionCard
                key={item.nombre}
                item={item}
                /*image={nfts.image}
                alldata={false}
                type={"compra"}
                number={nfts.tipo}*/
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
