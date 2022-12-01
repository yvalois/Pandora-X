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
import router, { useRouter } from 'next/router';
//images
import AuthorImage from '@/assets/images/author.jpg';

// static data
import { authorData } from '@/data/static/author';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import NftSlider from '@/components/ui/nftSlider';
import { getMintedNftProducts } from '@/redux/Minted/MintedAction';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const AuthorProfilePage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  let [copyButtonStatus, setCopyButtonStatus] = useState(false);

  const Usuario = useSelector((state: any) => state.Usuario);

  useEffect(() => {
    window.localStorage.setItem('Wallet', router.query.id);
  }, []);
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
  const [balance, setBalance] = useState(0);
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

  const {
    inventoryp,
    inventoryi,
    productoMinter,
    accountAddress,
    balanceI,
    isConnect,
    inversionMinter,
  } = useSelector((state: any) => state.blockchain);

  const inventory = async () => {
    if (accountAddress !== '') {
      const tx = await productoMinter.getMyInventory(accountAddress);

      return tx;
    }

    return 0;
  };

  useEffect(() => {
    if (isConnect) {
      setCurrentItems(inventoryp);
      setCurrentInv(inventoryi);
      setBalance(balanceI);
    }
  }, [inventoryp, inventoryi]);

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
          <OverviewChart balance={balance} />
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

AuthorProfilePage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default AuthorProfilePage;

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};
