import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/_dashboard';
import CoinSlider from '@/components/ui/coin-card';
import OverviewChart from '@/components/ui/chats/overview-chart';
import LiquidityChart from '@/components/ui/chats/liquidity-chart';
import VolumeChart from '@/components/ui/chats/volume-chart';
import TopPools from '@/components/ui/top-pools';
import TransactionTable from '@/components/transaction/transaction-table';
import TopCurrencyTable from '@/components/top-currency/currency-table';
import { coinSlideData } from '@/data/static/coin-slide-data';
import Avatar from '@/components/ui/avatar';
import TopupButton from '@/components/ui/topup-button';
import NftSlider from '@/components/ui/nftSlider';
import { useDispatch, useSelector } from 'react-redux';
import { getMintedNftProducts } from '../redux/Minted/MintedAction';
//images
import AuthorImage from '@/assets/images/author.jpg';
import { useEffect, useState } from 'react';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const HomePage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const nftInfo = {
    nombre: '',
    image: '',
    price: '',
    id: 0,
  };

  const [nftSelect, setNftSelect] = useState(nftInfo);
  const [time, setTime] = useState(0);

  const [currentItems, setCurrentItems] = useState([]);
  const [currentInv, setCurrentInv] = useState([]);
  const { dataloaded, disponibleNftp, disponibleNfti, priceFormat, MintedNft } =
    useSelector((state: any) => state.minted);
  const dispatch = useDispatch<AppDispatch>();

  const getNft = async () => {
    await dispatch(getMintedNftProducts());
  };

  const setNftInfo = (_nombre, _image, _price, _id) => {
    setNftSelect((prevState) => ({ ...prevState, nombre: _nombre }));
    setNftSelect((prevState) => ({ ...prevState, image: _image }));
    setNftSelect((prevState) => ({ ...prevState, price: _price }));
    setNftSelect((prevState) => ({ ...prevState, id: _id }));

    //funcion que llame el tipo de staking
  };

  useEffect(() => {
    const fetchItems = async () => {
      await getNft();
      //const itemsPerPage = 6
      //const start = (currentPage - 1) * itemsPerPage
      setCurrentItems(disponibleNftp);
      setCurrentInv(disponibleNfti);
    };
    fetchItems();
  }, [currentItems, dataloaded]);

  return (
    <>
      <NextSeo
        title="Pandora X"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <div className="flex ">
        <div className="mb-8 w-full sm:mb-0 sm:w-1/2 sm:ltr:pr-6 sm:rtl:pl-6 md:w-[calc(100%-358px)] lg:w-[calc(100%-358px)] 2xl:w-[calc(100%-358px)] 3xl:w-[calc(100%-358px)]">
          <NftSlider
            nfts={currentInv}
            priceFormat={priceFormat}
            nftInfo={nftInfo}
            setNftInfo={setNftInfo}
          />
        </div>

        <div className=" mb-8 grid w-full grid-cols-1 gap-6 sm:mb-10 sm:w-1/2  sm:grid-cols-2 md:w-64 lg:mb-0 lg:flex lg:w-72 lg:flex-col 2xl:w-80 3xl:w-[358px]">
          <OverviewChart />
        </div>
      </div>

      {/*<div className="mt-8 grid gap-6 sm:my-10 md:grid-cols-2">
        <LiquidityChart />
        <VolumeChart />
      </div>*/}

      {/*<div className="my-8 sm:my-10">
        <TopCurrencyTable />
    </div>*/}

      <div className="flex flex-wrap">
        <div className="w-[100%] lg:w-[100%] ltr:lg:pr-6 rtl:lg:pl-6 2xl:w-[100%] 3xl:w-[100%]">
          <TransactionTable />
        </div>
        <div className="order-first mb-8 grid w-full grid-cols-1 gap-6 sm:mb-10 sm:grid-cols-2 lg:order-1 lg:mb-0 lg:flex lg:w-72 lg:flex-col 2xl:w-80 3xl:w-[358px]">
          {/*<TopPools />*/}
        </div>
      </div>
    </>
  );
};

HomePage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default HomePage;
