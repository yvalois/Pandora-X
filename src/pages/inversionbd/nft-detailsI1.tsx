import cn from 'classnames';
import { StaticImageData } from 'next/image';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import Image from '@/components/ui/image';
import FeaturedCard from '@/components/nft/featured-card';
import ListCard from '@/components/ui/list-card';
import AuctionCountdown from '@/components/nft/auction-countdown';
import AnchorLink from '@/components/ui/links/anchor-link';
import DashboardLayout from '@/layouts/_dashboard';
import Button from '@/components/ui/button';
import { ArrowLinkIcon } from '@/components/icons/arrow-link-icon';
import { DotsIcon } from '@/components/icons/dots-icon';
import Avatar1 from '@/assets/images/avatar/3.png';
import { useModal } from '@/components/modal-views/context';
import { nftData } from '@/data/static/single-nft';
import NftDropDown from './nft-dropdown';
import Avatar from '@/components/ui/avatar';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ethers } from 'ethers';
import { uInvertion } from '../../redux/Blockchain/blockchainAction';
import pandorax from '@/assets/images/Pandora-X-icon-04.svg';
import type { NextPageWithLayout } from '@/types';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import inversionesAbi from '../../abi/InversionMinter.json';

import router from 'next/router';
import { connectWallet } from '@/redux/Blockchain/blockchainAction';
import { useAccount, useProvider, useSigner } from 'wagmi';
import { NextSeo } from 'next-seo';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

interface NftFooterProps {
  className?: string;

  price: number;
  tipoN: string;
}

type Avatar = {
  id: string | number;
  name: string;
  slug: string;
  logo: StaticImageData;
};

function NftFooter({ className = 'md:hidden', price, tipoN }: NftFooterProps) {
  const { openModal } = useModal();
  const [tokenAddress, setTokenAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [cuenta, setCuenta] = useState('');
  const [approvedUsdt, setApprovedUsdt] = useState(0);
  const [approvedToken, setApprovedToken] = useState(0);
  const [status, setStatus] = useState(false);
  const [status2, setStatus2] = useState(false);
  const [isBuy, setIsBuy] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertMsg2, setAlertMsg2] = useState('');
  const [profile, setProfile] = useState(false);
  const Usuario = useSelector((state) => state.Usuario);
  const [auxPrice, setAuxPrice] = useState(price);
  const {
    productoMinter,
    inversionMinter,
    isConnect,
    accountAddress,
    tokenContract,
    usdtContract,
    chainId,
  } = useSelector((state) => state.blockchain);

  const { referidor } = useSelector((state) => state.Usuario);
  const dispatch = useDispatch<AppDispatch>();

  const provider = useProvider();
  const { address } = useAccount();

  const verifyApprove = async () => {
    try {
      const usdt = await tokenContract.allowance(
        accountAddress,
        inversionMinter.address
      ); //MarketPlace
      //setApprovedUsdt(ethers.utils.formatUnits(usdt, 18));
      setApprovedToken(ethers.utils.formatUnits(usdt, 6));
    } catch (e) {}
  };

  const approve = async () => {
    setLoading(true);

    if (chainId == 137) {
      try {
        setLoading(true);

        setTokenAddress(tokenContract.address);
        const decimals = 6;
        const tx = await tokenContract.approve(
          inversionMinter.address,
          ethers.utils.parseUnits('10000000', decimals)
        );

        await tx.wait();
        await verifyApprove();
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    } else {
      openModal('NETWORK_VIEW');
      setLoading(false);
    }
  };

  const buyNft = async () => {
    setLoading(true);

    if (chainId == 137) {
      const a = await tokenContract.balanceOf(accountAddress);
      let prir = parseFloat(ethers.utils.formatUnits(a, 6)).toFixed(2);
      const price1 = parseFloat(prir);

      if (price1 < price) {
        setLoading(false);

        setAlertMsg2('no tienes balance suficiente');
        setStatus2(true);
      } else {
        try {
          const tx = await inversionMinter.buyToken(
            tipoN,
            tokenContract.address
          );

          await tx.wait();
          setLoading(false);
          setApprovedToken(0);
          setStatus(true);
          setProfile(true);
          setAlertMsg('Nft comprado exitosamente');
          setIsBuy(true);
          dispatch(uInvertion(accountAddress));

          verifyApprove();
        } catch (err) {
          setLoading(false);
          const errr = err.message.split(':');
          const error = errr[15].split('"');
          const error1 = errr[16].split('"');

          if (
            error[0] == ' transfer amount exceeds allowance' ||
            error1[0] == ' transfer amount exceeds allowance'
          ) {
            setStatus2(true);
            setAlertMsg2('No haz aprobado el balance');
          }
        }
      }
    } else {
      openModal('NETWORK_VIEW');
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setStatus(false);
    }, 5000);
  }, [status]);

  useEffect(() => {
    setTimeout(() => {
      setStatus2(false);
    }, 5000);
  }, [status2]);

  useEffect(() => {
    verifyApprove();
  }, []);

  useEffect(() => {
    const is = window.localStorage.getItem('wagmi.store');
    const es = JSON.parse(is);

    const si = es.state.data.account;
    if (si != undefined && !isConnect) {
      openModal('WALLET_CONNECT_VIEW');
    }
  }, [isConnect]);

  return (
    <div
      className={cn(
        'sticky bottom-0 z-10 bg-body dark:bg-dark md:-mx-2',
        className
      )}
    >
      <div className="mx-4 border-t-2 border-gray-900 px-4 pt-4 pb-5 dark:border-gray-700 sm:-mx-6 sm:px-6 md:mx-2 md:px-0 md:pt-5 lg:pt-6 lg:pb-7">
        <div className="flex gap-4 pb-3.5 md:pb-4 xl:gap-5">
          <div className="flex-column  w-1/2 shrink-0 md:w-2/5">
            <h3 className="mb-1 truncate text-13px font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:mb-1.5 sm:text-sm">
              Precio <span className="md:hidden">by</span>{' '}
              <AnchorLink
                href={'#'}
                className="normal-case text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:hidden"
              ></AnchorLink>
            </h3>
            <div className="text-lg font-medium -tracking-wider md:text-xl xl:text-2xl">
              {price} USDT
            </div>
            <AnchorLink
              href={'#'}
              className="mt-2 hidden items-center text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:inline-flex"
            >
              <div className="h-6 w-6 rounded-full ltr:mr-2 rtl:ml-2">
                <Image src={pandorax} alt="avatar" width={24} height={24} />
              </div>
              @PandoraX
            </AnchorLink>
          </div>
        </div>
        <div className="justify-ae flex w-full">
          {isConnect &&
            !isBuy &&
            !loading &&
            parseInt(price) > approvedToken &&
            !profile && (
              <Button shape="rounded" onClick={() => approve()}>
                Aprobar
              </Button>
            )}
          {isConnect &&
            !isBuy &&
            !loading &&
            parseInt(price) <= approvedToken &&
            !profile && (
              <Button shape="rounded" onClick={() => buyNft()}>
                {`Comprar por ${price} `}
              </Button>
            )}

          {!isConnect && (
            <Button
              shape="rounded"
              onClick={() => openModal('WALLET_CONNECT_VIEW')}
            >
              Conectar
            </Button>
          )}

          {profile && (
            <Button shape="rounded">
              <AnchorLink href={'/profile'}>ir a perfil</AnchorLink>
            </Button>
          )}

          {!isBuy && loading && !profile && (
            <Button shape="rounded">Cargando...</Button>
          )}

          <Button
            shape="rounded"
            variant="solid"
            color="gray"
            className="dark:bg-gray-800"
            onClick={() => openModal('SHARE_VIEW')}
          >
            Compartir
          </Button>
        </div>
      </div>
      {status && (
        <div
          className="absolute top-[170px] right-[100px] mb-4   mt-[0px] w-[400px] self-center rounded-lg  bg-green-200   p-4 text-center text-sm text-green-700 dark:bg-green-200 dark:text-green-800  md:top-[220px] md:right-[65px] md:w-[280px] xl:top-[250px] xl:right-[100px]"
          role="alert"
        >
          <span className="text-center font-medium">{alertMsg}</span>
        </div>
      )}

      {status2 && (
        <div
          className="absolute top-[170px] right-[100px] mb-4   mt-[0px] w-[400px] self-center rounded-lg  bg-red-200   p-4 text-center text-sm text-red-700 dark:bg-red-200  dark:text-red-800  md:top-[220px] md:right-[65px] md:w-[280px] xl:top-[250px] xl:right-[100px]"
          role="alert"
        >
          <span className="text-center font-medium">{alertMsg2}</span>
        </div>
      )}
    </div>
  );
}

const NftDetails1Page: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const nftdata = {
    Nombre: '',
    img: '',
    precio: 0,
    tipoN: 0,
    descripcion: '',
  };

  const rpc_MAC =
    'https://polygon-mainnet.g.alchemy.com/v2/XVy5Duyf5VwZzcxJaIlxyQEehwKzosov';

  const provider_MAC = new ethers.providers.JsonRpcProvider(rpc_MAC);

  const inversionMinterContract = new ethers.Contract(
    '0x2Bb6CfdcabF3245298522666453383BbBC179920',
    inversionesAbi,
    provider_MAC
  );
  const [nft, setNft] = useState(nftdata);

  useEffect(() => {
    const getInversiones = async () => {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/getInversion`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((response) => {
          response.map(async (res) => {
            if (res.tipoN == 1) {
              const precio = await inversionMinterContract.buyPrice(res.tipoN);
              const nftdata = {
                Nombre: res.Nombre,
                img: res.img,
                precio: parseInt(ethers.utils.formatUnits(precio, 6)),
                tipoN: res.tipoN,
                descripcion: res.descripcion,
              };

              setNft(nftdata);
            }
          });
        })
        .catch((error) => console.error('Error:', error));
    };
    getInversiones();
  }, []);

  return (
    <>
      <div className="flex flex-grow">
        <NextSeo
          title="Inversion"
          description="Nft-Sudio powered by Pandorax"
        />

        <div className="mx-auto flex w-full flex-grow flex-col transition-all xl:max-w-[1360px] 4xl:max-w-[1760px]">
          <div className="rtl:md:t-6 relative mb-5 flex flex-grow items-center justify-center md:pb-7 md:pt-4 ltr:md:left-0 ltr:md:pl-6 rtl:md:right-0 lg:fixed lg:mb-0 lg:h-[calc(100%-96px)] lg:w-[calc(100%-492px)] ltr:lg:pl-8 rtl:lg:pr-8 xl:w-[calc(100%-550px)] ltr:xl:pr-12 ltr:xl:pl-[340px] rtl:xl:pl-12 rtl:xl:pr-[340px] ltr:2xl:pl-96 rtl:2xl:pr-96 3xl:w-[calc(100%-632px)] ltr:4xl:pl-0 rtl:4xl:pr-0">
            <div className="flex h-full max-h-full w-full items-center justify-center lg:max-w-[768px]">
              <div className="relative aspect-square max-h-full w-full overflow-hidden rounded-lg">
                <Image
                  src={nft.img}
                  //placeholder="blur"
                  layout="fill"
                  objectFit="cover"
                  alt=""
                  className="h-full bg-gray-200 dark:bg-light-dark"
                />
              </div>
            </div>
          </div>

          <div className="relative mt-10 flex w-full flex-grow flex-col justify-between ltr:md:ml-auto ltr:md:pl-8 rtl:md:mr-auto rtl:md:pr-8 lg:min-h-[calc(100vh-96px)] lg:w-[460px] ltr:lg:pl-12 rtl:lg:pr-12 xl:w-[592px] ltr:xl:pl-20 rtl:xl:pr-20">
            <div className="block">
              <div className="block">
                <div className="flex justify-between">
                  <h2 className="text-xl font-medium leading-[1.45em] -tracking-wider text-gray-900 dark:text-white md:text-2xl xl:text-3xl">
                    {nft.Nombre}
                  </h2>
                </div>
              </div>
              <div className="mt-5 flex flex-col pb-5 xl:mt-9">
                <ParamTab
                  tabMenu={[
                    {
                      title: 'Details',
                      path: 'details',
                    },
                  ]}
                >
                  <TabPanel className="focus:outline-none">
                    <div className="space-y-6">
                      <div className="block">
                        <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                          Description
                        </h3>
                        <div className="text-sm leading-6 -tracking-wider text-gray-600 dark:text-gray-400">
                          {nft.descripcion}
                        </div>
                      </div>
                      <div className="block">
                        <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                          Owner
                        </h3>

                        <div className="inline-flex">
                          <span className="rounded-full p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            @PandoraX
                          </span>{' '}
                        </div>
                      </div>
                      <div className="block">
                        <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                          Block Chain
                        </h3>

                        <div className="flex flex-col gap-2">
                          <div className="inline-flex">
                            <span className="rounded-full p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                              Polygon
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className=" mt-12 w-full justify-center md:justify-evenly ">
                      {/*type !== 'invcomprado' &&
      type !== 'pcomprado' &&
      !loading &&
      product.precio > approvedToken && (
        <Button onClick={approve}>Approve</Button>
      )*/}

                      <NftFooter
                        className="w-full"
                        price={nft.precio}
                        tipoN={nft.tipoN}
                        id={nft.id}
                      />
                    </div>
                  </TabPanel>
                </ParamTab>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

NftDetails1Page.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default NftDetails1Page;
