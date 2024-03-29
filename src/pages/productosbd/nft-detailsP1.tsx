import cn from 'classnames';
import { StaticImageData } from 'next/image';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import Image from '@/components/ui/image';
import FeaturedCard from '@/components/nft/featured-card';
import ListCard from '@/components/ui/list-card';
import AuctionCountdown from '@/components/nft/auction-countdown';
import AnchorLink from '@/components/ui/links/anchor-link';
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
import productosAbi from '../../abi/ProductoMinter.json';
import DashboardLayout from '@/layouts/_dashboard';

import pandorax from '@/assets/images/Pandora-X-icon-04.svg';
import { connectWallet } from '@/redux/Blockchain/blockchainAction';
import { useAccount, useNetwork } from 'wagmi';

import router from 'next/router';

import { GetStaticProps } from 'next';
import { isCancel } from 'axios';
import { getEthersProvider } from '@/utils/ethers';
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

interface NftFooterProps {
  className?: string;

  price: number;
  tipo: string;
  tipoN: number;
  id: number;
  url: string;
}

type Avatar = {
  id: string | number;
  name: string;
  slug: string;
  logo: StaticImageData;
};

function NftFooter({
  className = 'md:hidden',
  price,
  tipo,
  tipoN,
  id,
  url,
}: NftFooterProps) {
  return (
    <div
      className={cn(
        'sticky bottom-0 z-10 bg-body dark:bg-dark md:-mx-2',
        className
      )}
    >
      <div className="-mx-4 border-t-2 border-gray-900 px-4 pb-5 pt-4 dark:border-gray-700 sm:-mx-6 sm:px-6 md:mx-2 md:px-0 md:pt-5 lg:pb-7 lg:pt-6">
        <div className="flex gap-4 pb-3.5 md:pb-4 xl:gap-5">
          <div className="block w-1/2 shrink-0 md:w-2/5">
            <h3 className="mb-1 truncate text-13px font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:mb-1.5 sm:text-sm">
              Precio <span className="md:hidden">by</span>{' '}
              <AnchorLink
                href={'#'}
                className="normal-case text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:hidden"
              ></AnchorLink>
            </h3>
            <div className="text-lg font-medium -tracking-wider md:text-xl xl:text-2xl">
              {price} USD
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

        <Button shape="rounded" onClick={() => window.open(url)}>
          Ir al curso
        </Button>

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
  );
}

function NftDetails1Page() {
  const url = [
    'https://academy.pandorax.co/offers/KLDhtczq/checkout',
    'https://academy.pandorax.co/offers/Sf3awR87/checkout',
    'https://academy.pandorax.co/offers/SvAjzFcZ/checkout',
    'https://academy.pandorax.co/offers/GMoLiq82/checkout',
    'https://academy.pandorax.co/offers/HzPLpzk6/checkout',
    'https://discord.gg/bybu984z',
    'https://academy.pandorax.co/offers/Ne4xqLqa/checkout',
    'https://academy.pandorax.co/offers/KLDhtczq/checkout',
  ];

  const nftdata = {
    Nombre: '',
    img: '',
    precio: 0,
    tipoN: 0,
    descripcion: '',
    url: '',
  };

  const { chain } = useNetwork();

  const provider = getEthersProvider(chain?.id);

  const productoMinterContract = new ethers.Contract(
    '0x8fA9365bCcc4C554FE1D7c004ff46b7A05d4de2C',
    productosAbi,
    provider
  );
  const [nft, setNft] = useState(nftdata);
  const { isConnect } = useSelector((state) => state.blockchain);

  useEffect(() => {
    const getProductos = async () => {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/getProducto`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((response) => {
          response.map(async (res) => {
            if (res.tipoN == 8) {
              const nftdata = {
                Nombre: res.Nombre,
                img: res.img,
                precio: 4997,
                tipoN: res.tipoN,
                descripcion: res.descripcion,
                url: url[res.tipoN - 1],
              };

              setNft(nftdata);
            }
          });
        })
        .catch((error) => console.error('Error:', error));
    };
    getProductos();
  }, []);

  const { openModal, closeModal } = useModal();

  useEffect(() => {
    const is = window.localStorage.getItem('wagmi.store');
    const es = JSON.parse(is);

    const si = es.state.data.account;
    if (si != undefined && !isConnect) {
      openModal('WALLET_CONNECT_VIEW');
    }
  }, [isConnect]);

  return (
    <div className="flex flex-grow">
      <div className="mx-auto flex w-full flex-grow flex-col transition-all xl:max-w-[1360px] 4xl:max-w-[1760px]">
        <div className="rtl:md:t-6 relative mb-5 flex flex-grow items-center justify-center md:pb-7 md:pt-4 ltr:md:left-0 ltr:md:pl-6 rtl:md:right-0 lg:fixed lg:mb-0 lg:h-[calc(100%-96px)] lg:w-[calc(100%-492px)] ltr:lg:pl-8 rtl:lg:pr-8 xl:w-[calc(100%-550px)] ltr:xl:pl-[340px] ltr:xl:pr-12 rtl:xl:pl-12 rtl:xl:pr-[340px] ltr:2xl:pl-96 rtl:2xl:pr-96 3xl:w-[calc(100%-632px)] ltr:4xl:pl-0 rtl:4xl:pr-0">
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

                  <div className="mt-12 justify-evenly space-x-10">
                    <NftFooter
                      className="hidden md:block"
                      price={nft.precio}
                      tipoN={nft.tipoN}
                      id={nft.id}
                      url={nft.url}
                    />
                  </div>
                </TabPanel>
              </ParamTab>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
NftDetails1Page.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default NftDetails1Page;
