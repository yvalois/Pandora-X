import Image from '@/components/ui/image';
import { ArrowUp } from '@/components/icons/arrow-up';
import { Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { StaticImageData } from 'next/image';
import NFTGrid from '@/components/ui/nft-card';
import { useState } from 'react';

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

  return (
    <div>
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
              key={nfts.name}
              name={nfts.name}
              image={nfts.image}
              price={priceFormat}
              number={nfts.number}
              alldata={false}
              type={type}
              nftInfo={nftInfo}
              setNftInfo={setNftInfo}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
