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
import { useEffect, useState, useContext } from 'react';
import { ethers } from 'ethers';
import coaching from '@/assets/images/prod/coaching.jpeg';
import streaming from '@/assets/images/prod/streaming.jpeg';
import alpha from '@/assets/images/prod/alpha.jpeg';
import privada from '@/assets/images/prod/privada.jpeg';
import publica from '@/assets/images/prod/publica.jpeg';
import investing from '@/assets/images/prod/investing.jpeg';
import studio from '@/assets/images/prod/studio.jpeg';
import academia from '@/assets/images/prod/academia.jpeg';

import PeerX from '@/assets/images/profile/PEER-X.jpg';
import BlockCreator from '@/assets/images/profile/BLOCKCREATOR.jpg';
import BlockElite from '@/assets/images/profile/BLOCKELITE.jpg';
import BlockMaster from '@/assets/images/profile/BLOCKMASTER.jpg';
import Generic from '@/assets/images/profile/GENERIC.jpg';
import { transations } from '../redux/Transactions/TransactionsActions';
import AvatarP from '@/components/ui/AvatarP';
import { WalletContext } from '@/lib/hooks/use-connect';
import { useAccount, useNetwork, useProvider, useSigner } from 'wagmi';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
let Data = [];
const prod = [
  {
    nombre: 'Podcast Straming',
    image: streaming,
    tipo: 'PS',
  },
  {
    nombre: 'Academia X',
    image: academia,
    tipo: 'PA',
  },
  {
    nombre: 'NFT Studio',
    image: studio,
    tipo: 'NS',
  },
  {
    nombre: 'Investing Value',
    image: investing,
    tipo: 'IV',
  },
  {
    nombre: 'Comunidad Privadad',
    image: privada,
    tipo: 'CP',
  },
  {
    nombre: 'Comunidad Gratuita',
    image: publica,
    tipo: 'CG',
  },
  {
    nombre: 'Coaching',
    image: coaching,
    tipo: 'NC',
  },
  {
    nombre: 'Alpha Report',
    image: alpha,
    tipo: 'AP',
  },
];

const HomePage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const nftInfo = {
    nombre: '',
    image: '',
    tipo: '',
  };

  const [nftSelect, setNftSelect] = useState(nftInfo);
  const [time, setTime] = useState(0);

  const [currentItems, setCurrentItems] = useState([]);
  const [currentInv, setCurrentInv] = useState([]);
  const [balance, setBalance] = useState(0);
  const Usuario = useSelector((state: any) => state.Usuario);
  let Contador = 0;
  const { dataloaded, disponibleNftp, disponibleNfti, priceFormat, MintedNft } =
    useSelector((state: any) => state.minted);

  const { Transactions } = useSelector((state) => state.transaction);

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
    staking,
    tokenContract,
  } = useSelector((state: any) => state.blockchain);

  const inventory = async () => {
    if (accountAddress !== '') {
      const tx = await productoMinter.getMyInventory(accountAddress);

      return tx;
    }

    return 0;
  };
  const getInvertionTrans = async () => {
    fetch(
      `https://api.polygonscan.com/api?module=account&action=tokennfttx&contractaddress=${inversionMinter.address}&address=${accountAddress}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=Z79YU4A9GJPW8SIYPCKBW6AKFT4G55CG2T
 `,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        function toDateTime(secs) {
          var t = new Date(1970, 0, 1); // Epoch
          t.setSeconds(secs);
          return t;
        }
        let arr = [];
        arr = response.result;
        if (arr.length > 0) {
          arr.map(async (item) => {
            if (item.from == '0x0000000000000000000000000000000000000000') {
              const cant = arr.length;
              Contador += cant;
              const dat = item.timeStamp;
              const date = toDateTime(dat);
              const pre = await inversionMinter.getPricePlusFee(item.tokenID);
              const precio = ethers.utils.formatUnits(pre, 6);
              const w1 = inversionMinter.address.slice(0, 6);
              const w = inversionMinter.address.slice(
                inversionMinter.address.length - 6
              );
              const wall = w1 + '...' + w;
              if (cant >= Data.length || cant == 0) {
                const Tx = {
                  Id: item.tokenID,
                  Tipo: 'Compra Inversion',
                  Hash: item.hash,
                  Time: dat,
                  Fecha: date.toDateString(),
                  Asset: 'Tether',
                  Status: 'Exitosa',
                  Address: wall,
                  Precio: precio,
                };
                Data.push(Tx);
              }
            }
          });
        }
      });
  };

  const getProductosTrans = async () => {
    fetch(
      `https://api.polygonscan.com/api?module=account&action=tokennfttx&contractaddress=${productoMinter.address}&address=${accountAddress}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=Z79YU4A9GJPW8SIYPCKBW6AKFT4G55CG2T
 `,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        function toDateTime(secs) {
          var t = new Date(1970, 0, 1); // Epoch
          t.setSeconds(secs);
          return t;
        }
        let arr = [];
        arr = response.result;
        if (arr.length > 0) {
          arr.map(async (item) => {
            if (item.from == '0x0000000000000000000000000000000000000000') {
              const cant = arr.length + Data.length;
              Contador += cant;
              const dat = item.timeStamp;
              const date = toDateTime(dat);
              const pre = await inversionMinter.getPricePlusFee(item.tokenID);
              const precio = ethers.utils.formatUnits(pre, 6);
              const w1 = inversionMinter.address.slice(0, 6);
              const w = inversionMinter.address.slice(
                inversionMinter.address.length - 6
              );
              const wall = w1 + '...' + w;
              if (cant >= Data.length || cant == 0) {
                const Tx = {
                  Id: item.tokenID,
                  Tipo: 'Compra Producto',
                  Hash: item.hash,
                  Time: dat,
                  Fecha: date.toDateString(),
                  Asset: 'Tether',
                  Status: 'Exitosa',
                  Address: wall,
                  Precio: precio,
                };
                Data.push(Tx);
              }
            }
          });
        }
      });
  };

  const getStakingsTrans = async () => {
    fetch(
      `https://api.polygonscan.com/api?module=account&action=tokennfttx&contractaddress=${inversionMinter.address}&address=${staking.address}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=Z79YU4A9GJPW8SIYPCKBW6AKFT4G55CG2T
 `,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        function toDateTime(secs) {
          var t = new Date(1970, 0, 1); // Epoch
          t.setSeconds(secs);
          return t;
        }
        let arr = [];
        arr = response.result;
        if (arr.length > 0) {
          arr.map(async (item) => {
            if (
              item.from == accountAddress.toLowerCase() ||
              item.to.toString() == accountAddress.toLowerCase()
            ) {
              const cant = arr.length + Data.length;
              Contador += cant;
              const dat = item.timeStamp;
              const date = toDateTime(dat);
              const pre = await inversionMinter.getPricePlusFee(item.tokenID);
              const precio = ethers.utils.formatUnits(pre, 6);
              const w1 = inversionMinter.address.slice(0, 6);
              const w = inversionMinter.address.slice(
                inversionMinter.address.length - 6
              );
              const wall = w1 + '...' + w;
              const from = item.from;
              const to = item.to;
              if (cant >= Data.length || cant == 0) {
                if (from == accountAddress.toLowerCase()) {
                  const Tx = {
                    Id: item.tokenID,
                    Tipo: 'Staking',
                    Hash: item.hash,
                    Time: dat,
                    Fecha: date.toDateString(),
                    Asset: 'Tether',
                    Status: 'Exitosa',
                    Address: wall,
                    Precio: 'NP',
                  };
                  Data.push(Tx);
                } else {
                  const Tx = {
                    Id: item.tokenID,
                    Tipo: 'Withdraw',
                    Hash: item.hash,
                    Time: dat,
                    Fecha: date.toDateString(),
                    Asset: 'Tether',
                    Status: 'Exitosa',
                    Address: wall,
                    Precio: precio,
                  };
                  Data.push(Tx);
                }
              }
            }
          });
        }
      });
  };

  const getClaimsTrans = async () => {
    fetch(
      `https://api.polygonscan.com/api?module=account&action=tokennfttx&contractaddress=${tokenContract.address}&address=${accountAddress}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=Z79YU4A9GJPW8SIYPCKBW6AKFT4G55CG2T
 `,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        function toDateTime(secs) {
          var t = new Date(1970, 0, 1); // Epoch
          t.setSeconds(secs);
          return t;
        }
        let arr = [];
        arr = response.result;

        if (arr.length > 0) {
          arr.map(async (item) => {
            const cant = arr.length + Data.length;
            Contador += cant;
            const dat = item.timeStamp;
            const date = toDateTime(dat);
            const pre = await inversionMinter.getPricePlusFee(item.tokenID);
            const precio = ethers.utils.formatUnits(pre, 6);
            const w1 = inversionMinter.address.slice(0, 6);
            const w = inversionMinter.address.slice(
              inversionMinter.address.length - 6
            );
            const wall = w1 + '...' + w;
            const from = item.from;
            const to = item.to;
            if (cant >= Data.length || cant == 0) {
              if (to == accountAddress.toLowerCase()) {
                const Tx = {
                  Id: item.tokenID,
                  Tipo: 'ClaimReward',
                  Hash: item.hash,
                  Time: dat,
                  Fecha: date.toDateString(),
                  Asset: 'Tether',
                  Status: 'Exitosa',
                  Address: wall,
                  Precio: 'No Aplica',
                };

                Data.push(Tx);
              }
            }
          });
        }
      });
  };

  const getPrices = async () => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        coinSlideData[0].balance = response[0].current_price;
        coinSlideData[1].balance = response[1].current_price;
        coinSlideData[2].balance = response[2].current_price;
        coinSlideData[3].balance = response[4].current_price;
      });
  };
  useEffect(() => {
    const fetch = async () => {
      await getPrices();
    };
    fetch();
  }, []);

  setTimeout(async () => {
    await getPrices();
  }, 3600000);

  const setData = async () => {
    dispatch(
      transations({
        Transactions: Data,
      })
    );
  };

  useEffect(() => {
    setCurrentItems(prod);
    const fetchItems = async () => {
      await getNft();
      //setCurrentInv(inventoryi);
      //setBalance(balanceI);
    };
    fetchItems();
  }, []);

  useEffect(() => {
    setCurrentItems(prod);
    const fetchItems = async () => {
      if (isConnect) {
        await getInvertionTrans();
        await getProductosTrans();
        await getStakingsTrans();
        await getClaimsTrans();
      } else {
        Data = [];
      }
      //setCurrentInv(inventoryi);
      //setBalance(balanceI);
    };
    fetchItems();
  }, [accountAddress]);

  useEffect(() => {
    const fetchItems = async () => {
      await setData();

      //setCurrentInv(inventoryi);
      //setBalance(balanceI);
    };
    fetchItems();
  }, [Data]);

  useEffect(() => {
    setBalance(balanceI[0]);
  }, [balanceI]);

  /*  const { disconnectWallet } = useContext(WalletContext);
  useEffect(() => {
    if (!isConnect) {
      disconnectWallet();
    }
  }, []); */

  return (
    <>
      <NextSeo
        title="Pandora X"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <div className="flex flex-wrap">
        <div className="mb-8 w-full sm:mb-0 sm:w-1/2 sm:ltr:pr-6 sm:rtl:pl-6 md:w-[calc(100%-256px)] lg:w-[calc(100%-288px)] 2xl:w-[calc(100%-320px)] 3xl:w-[calc(100%-358px)]">
          <CoinSlider coins={coinSlideData} />
        </div>

        <div className="w-full sm:w-1/2 md:w-64 lg:w-72 2xl:w-80 3xl:w-[358px]">
          <div className="flex h-full flex-col justify-center rounded-lg bg-white p-6 shadow-card dark:bg-light-dark xl:p-8">
            {isConnect &&
            Usuario.perfil?.length == 0 &&
            Usuario.rango == 'peerx' ? (
              <Avatar
                image={PeerX}
                alt="Author"
                className="mx-auto mb-6"
                size="lg"
              />
            ) : isConnect &&
              Usuario.perfil?.length == 0 &&
              Usuario.rango == 'blockelite' ? (
              <Avatar
                image={BlockElite}
                alt="Author"
                className="mx-auto mb-6"
                size="lg"
              />
            ) : isConnect &&
              Usuario.perfil?.length == 0 &&
              Usuario.rango == 'blockmaster' ? (
              <Avatar
                image={BlockMaster}
                alt="Author"
                className="mx-auto mb-6"
                size="lg"
              />
            ) : isConnect &&
              Usuario.perfil?.length == 0 &&
              Usuario.rango == 'blockcreator' ? (
              <Avatar
                image={BlockCreator}
                alt="Author"
                className="mx-auto mb-6"
                size="lg"
              />
            ) : isConnect && Usuario.perfil?.length > 0 ? (
              <AvatarP
                image={Usuario.perfil}
                alt="Author"
                className="mx-auto mb-6"
                size="lg"
                activate={false}
                is={false}
                setPrevProfile={null}
                prevProfile={false}
              />
            ) : isConnect ? (
              <Avatar
                image={Generic}
                alt="Author"
                className="mx-auto mb-6"
                size="lg"
              />
            ) : isConnect && Usuario.perfil?.length > 0 ? (
              <Avatar
                image={Usuario.perfil}
                alt="Author"
                className="mx-auto mb-6"
                size="lg"
              />
            ) : (
              !isConnect && (
                <Avatar
                  image={Generic}
                  alt="Author"
                  className="mx-auto mb-6"
                  size="lg"
                />
              )
            )}
            <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
              My Balance
            </h3>
            <div className="mb-7 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
              ${balanceI[0]}
            </div>
            <TopupButton />
          </div>
        </div>
        <div className="mb-8 mt-12 w-full sm:mb-0   sm:w-full sm:ltr:pr-6 sm:rtl:pl-6 md:w-[100%] lg:w-[100%] 2xl:w-[100%] 3xl:w-[100%] ">
          <NftSlider
            nfts={currentItems}
            priceFormat={priceFormat}
            nftInfo={nftInfo}
            setNftInfo={setNftInfo}
          />
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
          {Transactions.length > 0 && <TransactionTable />}
        </div>
      </div>
    </>
  );
};

HomePage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default HomePage;
