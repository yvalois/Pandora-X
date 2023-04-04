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
import { uInvertion, uFrench } from '../../redux/Blockchain/blockchainAction';
import pandorax from '@/assets/images/Pandora-X-icon-04.svg';

import router from 'next/router';
import { useAccount, useProvider } from 'wagmi';

interface NftFooterProps {
  className?: string;

  price: number;
  tipo: string;
  tipoN: string;
  id: number;
}

type Avatar = {
  id: string | number;
  name: string;
  slug: string;
  logo: StaticImageData;
};

function NftFooter({ className = 'md:hidden', price, id }: NftFooterProps) {
  const { openModal } = useModal();
  const [loading, setLoading] = useState(false);
  const [cuenta, setCuenta] = useState('');
  const [status, setStatus] = useState(false);
  const [status2, setStatus2] = useState(false);
  const [isBuy, setIsBuy] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertMsg2, setAlertMsg2] = useState('');
  const { perfil, nombre } = useSelector((state) => state.Usuario);

  const Usuario = useSelector((state) => state.Usuario);
  const [auxPrice, setAuxPrice] = useState(price);
  const { chainId } = useSelector((state) => state.blockchain);

  const { referidor } = useSelector((state) => state.Usuario);
  const dispatch = useDispatch<AppDispatch>();

  const provider = useProvider();
  const { address } = useAccount();

  const open = () => {
    window.localStorage.setItem('TransferFId', id);
    openModal('TRANSFER_F');
  };
  /* Transferir */

  const chain = async () => {
    if (chainId != 1) {
      openModal('NETWORK_VIEW');
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
  return (
    <div
      className={cn(
        'sticky bottom-0 z-10 bg-body dark:bg-dark md:-mx-2',
        className
      )}
    >
      <div className="-mx-4 border-t-2 border-gray-900 px-4 pt-4 pb-5 dark:border-gray-700 sm:-mx-6 sm:px-6 md:mx-2 md:px-0 md:pt-5 lg:pt-6 lg:pb-7">
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
              {price} ETH
            </div>
            <AnchorLink
              href={'#'}
              className="mt-2 hidden items-center text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:inline-flex"
            >
              <div className="h-6 w-6 rounded-full ltr:mr-2 rtl:ml-2">
                <Image
                  className="rounded-3xl"
                  src={perfil}
                  alt="avatar"
                  width={24}
                  height={24}
                />
              </div>
              {`@${nombre}`}
            </AnchorLink>
          </div>
        </div>

        {/* {tipo == 'producto' && (
          <div className="grid grid-cols-2 gap-3">
            {!isBuy && !loading && price > approvedToken && (
              <Button shape="rounded" onClick={() => approve()}>
                Ir al curso
              </Button>
            )}
            {!isBuy &&
              !loading &&
              parseInt(price) <= approvedToken &&
              tipoN != 6 && (
                <Button shape="rounded" onClick={() => buyNft()}>
                  {`Comprar por ${price} `}
                </Button>
              )}

            {tipoN == 6 && (
              <Button
                shape="rounded"
                onClick={() =>
                  window.open('https://discord.com/invite/bybu984z')
                }
              >
                ir al discord
              </Button>
            )}

            {isBuy && (
              <Button shape="rounded">
                <AnchorLink href="/" className="w-full">
                  Ir a inicio
                </AnchorLink>
              </Button>
            )}

            {!isBuy && loading && <Button shape="rounded">Cargando...</Button>}
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
        )}

        {tipo == 'inversion' && (
          <div className="grid grid-cols-2 gap-3">
            {!isBuy && !loading && parseInt(price) > approvedToken && (
              <Button shape="rounded" onClick={() => approve()}>
                Aprobar
              </Button>
            )}
            {!isBuy && !loading && parseInt(price) <= approvedToken && (
              <Button shape="rounded" onClick={() => buyNft()}>
                {`Comprar por ${price} `}
              </Button>
            )}

            {isBuy && (
              <Button shape="rounded">
                <AnchorLink href="/" className="w-full">
                  Ir a inicio
                </AnchorLink>
              </Button>
            )}
            {!isBuy && loading && <Button shape="rounded">Cargando...</Button>}
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
        )}

        {tipo == 'pcomprado' && (
          <div className="grid grid-cols-2 gap-3">
            <Button shape="rounded" onClick={open}>
              Transferir
            </Button>
            <Button
              shape="rounded"
              variant="solid"
              color="gray"
              className="dark:bg-gray-800"
            >
              Acceder
            </Button>
          </div>
        )}

        {tipo == 'invcomprado' && (
          <div className="grid grid-cols-2 gap-3">
            <Button shape="rounded" onClick={openI}>
              Transferir
            </Button>
            <AnchorLink href={`/staking/${id}`}>
              <Button
                shape="rounded"
                variant="solid"
                color="gray"
                className="dark:bg-gray-800"
              >
                Stake
              </Button>
            </AnchorLink>
          </div>
        )} */}
        <div className="grid w-full grid-cols-2 gap-3">
          <Button onClick={open} shape="rounded">
            Transferir
          </Button>
          {/*chainId == 1 ? (<AnchorLink href={`/stakingFrenchies/${id}`}>
            <Button
              shape="rounded"
              variant="solid"
              color="gray"
              className="dark:bg-gray-800"
            >
              Stake
            </Button>
          </AnchorLink>):(
            <Button
            shape="rounded"
            variant="solid"
            color="gray"
            className="dark:bg-gray-800"
            onClick={()=>chain()}
          >
            Stake
          </Button>
          )
          */}
        </div>
      </div>
    </div>
  );
}

export default function NftDetailsF(Nft) {
  const [tokenAddress, setTokenAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [cuenta, setCuenta] = useState('');
  const [approvedUsdt, setApprovedUsdt] = useState(0);
  const [approvedToken, setApprovedToken] = useState(0);
  const [status, setStatus] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const { perfil, nombre } = useSelector((state) => state.Usuario);
  const [atributos, setAtributos] = useState([]);

  useEffect(() => {
    setAtributos(Nft.Nft.attributes);
  }, [Nft]);

  return (
    <div className="flex flex-grow">
      <div className="mx-auto flex w-full flex-grow flex-col transition-all xl:max-w-[1360px] 4xl:max-w-[1760px]">
        <div className="rtl:md:t-6 relative mb-5 flex flex-grow items-center justify-center md:pb-7 md:pt-4 ltr:md:left-0 ltr:md:pl-6 rtl:md:right-0 lg:fixed lg:mb-0 lg:h-[calc(100%-96px)] lg:w-[calc(100%-492px)] ltr:lg:pl-8 rtl:lg:pr-8 xl:w-[calc(100%-550px)] ltr:xl:pr-12 ltr:xl:pl-[340px] rtl:xl:pl-12 rtl:xl:pr-[340px] ltr:2xl:pl-96 rtl:2xl:pr-96 3xl:w-[calc(100%-632px)] ltr:4xl:pl-0 rtl:4xl:pr-0">
          <div className="flex h-full max-h-full w-full items-center justify-center lg:max-w-[768px]">
            <div className="relative aspect-square max-h-full w-full overflow-hidden rounded-lg">
              <Image
                src={Nft.Nft.img}
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
                  {Nft.Nft.Nombre}
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
                        Sobre
                      </h3>
                      <div className="text-sm leading-6 -tracking-wider text-gray-600 dark:text-gray-400">
                        {Nft.Nft.descripcion}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                        Caracteristicas
                      </h3>
                    </div>

                    <div className="grid h-full   w-full  grid-cols-2 gap-4  sm:grid-cols-3  lg:gap-5 xl:gap-6 ">
                      {atributos.map((item, index) => (
                        <div key={index} className="w-40">
                          <div className="light:border-black flex-column w-full  rounded-lg border ">
                            <div className="flex w-full justify-center ">
                              <h1 className="self-center">{item.trait_type}</h1>
                            </div>

                            <div className="ligth:border-black h-[1px] w-full border "></div>

                            <div className="flex w-full justify-center ">
                              <h1 className="self-center">{item.value}</h1>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="block">
                      <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                        Direccion de contrato
                      </h3>

                      <div className="inline-flex">
                        <span className="rounded-full p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                          0x32bfb6790B3536a7269185278B482A0FA0385362
                        </span>
                      </div>
                    </div>

                    <div className="block">
                      <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                        Dueño
                      </h3>

                      <div className="inline-flex">
                        <span className="rounded-full p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                          {`@${nombre}`}
                        </span>{' '}
                      </div>
                    </div>
                    <div className="block">
                      <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                        BlockChain
                      </h3>

                      <div className="flex flex-col gap-2">
                        <div className="inline-flex">
                          <span className="rounded-full p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            Ethereum
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 justify-evenly space-x-10">
                    {/*type !== 'invcomprado' &&
                      type !== 'pcomprado' &&
                      !loading &&
                      product.precio > approvedToken && (
                        <Button onClick={approve}>Approve</Button>
                      )*/}

                    {loading && (
                      <Button>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Cargando...
                      </Button>
                    )}

                    {/*type !== 'invcomprado' &&
                      type !== 'pcomprado' &&
                      !loading &&
                      product.precio <= approvedToken && (
                        <Button onClick={() => buyNft()}>Buy</Button>
                      )*/}

                    {/*type !== 'pcomprado' &&
                      !loading &&
                      type !== 'invcomprado' && (
                        <Button>Buy without cripto</Button>
                      )*/}

                    {/*type == 'pcomprado' && type !== 'invcomprado' && (
                      <Button onClick={() => buyNft()}>transfer</Button>
                    )*/}

                    {/*type == 'invcomprado' && (
                      <Button onClick={() => buyNft()}>Stake</Button> //anchor link
                    )*/}
                    {/*type == 'invcomprado' && (
                      <Button onClick={() => buyNft()}>Transfer</Button> //Modal
                    )*/}
                    <NftFooter
                      className="hidden md:block"
                      price={Nft.Nft.precio}
                      id={Nft.Nft.id}
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
function setApprovedToken(arg0: string) {
  throw new Error('Function not implemented.');
}
