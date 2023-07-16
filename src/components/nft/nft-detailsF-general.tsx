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
import frenchiesAbi2 from '../../abi/FrenchiesBlues2.json';

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

function NftFooter({ className = 'md:hidden', price, id, _status, _alertMsg }) {
  const { openModal } = useModal();
  const [loading, setLoading] = useState(false);
  const [cuenta, setCuenta] = useState('');
  const [status, setStatus] = useState(false);
  const [status2, setStatus2] = useState(false);
  const [isBuy, setIsBuy] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertMsg2, setAlertMsg2] = useState('');
  const { perfil, nombre } = useSelector((state) => state.Usuario);
  const [isOwner, setIsOwner] = useState(false);
  const { accountAddress } = useSelector((state) => state.blockchain);

  const Usuario = useSelector((state) => state.Usuario);
  const [auxPrice, setAuxPrice] = useState(price);
  const { chainId } = useSelector((state) => state.blockchain);

  const { referidor } = useSelector((state) => state.Usuario);
  const dispatch = useDispatch<AppDispatch>();

  const provider = useProvider();
  const { address } = useAccount();

  const openVenta = () => {
    window.localStorage.setItem('VentaId', id);
    openModal('SELL_VIEW');
  };

  const openOferta = () => {
    window.localStorage.setItem('OfertaId', id);
    openModal('OFFER_VIEW');
  };

  const openSubasta = () => {
    window.localStorage.setItem('SubastaId', id);
    openModal('AUCTION_VIEW');
  };

  const rpc_ETH =
    'https://eth-goerli.g.alchemy.com/v2/vMRJQCaauogYOxluxt-rWvqPPemy_fzG';
  const provider_ETH = new ethers.providers.JsonRpcProvider(rpc_ETH);

  const frenchiesMinterContract = new ethers.Contract(
    '0x18bdD7A20134d0e3eF544aD57513bEDC0728Ca61',
    //'0x32bfb6790B3536a7269185278B482A0FA0385362',
    frenchiesAbi2,
    provider_ETH
  );

  const verifyOwner = async () => {
    const _id = id;
    const owner = await frenchiesMinterContract.ownerOf(_id);
    if (owner == accountAddress) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  };

  useEffect(() => {
    verifyOwner();
  }, [id]);

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
              <AnchorLink
                href={'#'}
                className="normal-case text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:hidden"
              ></AnchorLink>
            </h3>
          </div>
        </div>

        {isOwner && (
          <div className="grid w-full grid-cols-2 gap-3">
            <Button onClick={openVenta} shape="rounded">
              Vender
            </Button>

            <Button
              shape="rounded"
              variant="solid"
              color="gray"
              onClick={openSubasta}
              className="dark:bg-gray-800"
            >
              Subastar
            </Button>
          </div>
        )}

        {!isOwner && (
          <div className="grid w-full grid-cols-2 gap-3">
            <Button onClick={openOferta} shape="rounded">
              Ofertar
            </Button>

            <Button
              shape="rounded"
              variant="solid"
              color="gray"
              className="dark:bg-gray-800"
              onClick={() => openModal('SHARE_VIEW')}
            >
              SHARE
            </Button>
          </div>
        )}
      </div>

      <div className="  flex w-full justify-center align-middle">
        {_status == 200 && (
          <div
            className="flex w-[400px] justify-center rounded-lg bg-green-200 p-4 align-middle text-sm text-green-700 dark:bg-green-200 dark:text-green-800"
            role="alert"
          >
            <span className="text-center font-medium">{_alertMsg}</span>
          </div>
        )}

        {_status == 100 && (
          <div
            className=" flex w-[400px] justify-center rounded-lg bg-red-200  p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
            role="alert"
          >
            <span className="text-center font-medium">{_alertMsg}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function NftDetailsFG() {
  const [tokenAddress, setTokenAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [cuenta, setCuenta] = useState('');
  const [approvedUsdt, setApprovedUsdt] = useState(0);
  const [approvedToken, setApprovedToken] = useState(0);
  const [status, setStatus] = useState(0);
  const [alertMsg, setAlertMsg] = useState('');
  const { perfil, nombre } = useSelector((state) => state.Usuario);
  const { closeModal, openModal } = useModal();
  const [atributos, setAtributos] = useState([]);
  const [aceptada, setAceptada] = useState(false);
  const { accountAddress, ofertasContract, chainId, frenchiesMinter } =
    useSelector((state) => state.blockchain);
  const [ap, setAp] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const nftdata = {
    active: null,
    currentWinner: '',
    id: 0,
    image: '',
    max: 0,
    name: '',
    owner: '',
    id: 0,
    type: '',
  };

  const [nft, setNft] = useState(nftdata);

  useEffect(() => {
    const fetch = async () => {
      const storedJsonString = window.localStorage.getItem('nft');
      const storedObject = JSON.parse(storedJsonString);
      setNft(storedObject);
      setAtributos(nft.attributes);
    };
    fetch();
  }, []);

  let bidder = [
    {
      amount: nft.max,
      authorSlug: '#',
      avatar: {
        blurDataURL:
          '/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F2.3e7881c0.png&w=8&q=70',
        blurHeight: 8,
        blurWidth: 8,
        height: 40,
        src: '/_next/static/media/2.3e7881c0.png',
        width: 40,
      },
      id: 2,
      label: 'Oferta hecha por',
      name: nft.currentWinner,
      transactionUrl: '#',
    },
  ];

  const Aceptar = async () => {
    if (chainId == 1) {
      setLoading(true);
      try {
        const tx = await ofertasContract.sellNFT(nft.id);
        await tx.wait();
        setStatus(200);
        setLoading(false);
        setAlertMsg('Transaccion completada correctamente');
        dispatch(uFrench(accountAddress, frenchiesMinter));
        bidder = [];
        setAceptada(true);
      } catch (err) {
        setLoading(false);
        setStatus(100);
        const mess = err.message.split('[');
        const rejected = mess[0].split(' ');
        console.log(err);
        if (mess[0] == 'insufficient funds for intrinsic transaction cost ') {
          setAlertMsg('Fondos insuficientes');
        } else if (rejected[0] == 'user' && rejected[1] == 'rejected') {
          setAlertMsg('Transacion rechazada');
        } else {
          setAlertMsg('Error');
        }
        //
      }
    } else {
      openModal('NETWORK_VIEW');
      setLoading(false);
    }
  };

  const Retirar = async () => {
    if (chainId == 1) {
      setLoading(true);
      try {
        const tx = await ofertasContract.withdraw(nft.id);
        await tx.wait();
        setStatus(200);
        setLoading(false);
        setAlertMsg('Transaccion completada correctamente');
        setAceptada(true);
      } catch (err) {
        setLoading(false);
        setStatus(100);
        const mess = err.message.split('[');
        const rejected = mess[0].split(' ');
        console.log(err);
        if (mess[0] == 'insufficient funds for intrinsic transaction cost ') {
          setAlertMsg('Fondos insuficientes');
        } else if (rejected[0] == 'user' && rejected[1] == 'rejected') {
          setAlertMsg('Transacion rechazada');
        } else {
          setAlertMsg('Error');
        }
        //
      }
    } else {
      openModal('NETWORK_VIEW');
      setLoading(false);
    }
  };

  const rpc_ETH =
    'https://eth-goerli.g.alchemy.com/v2/vMRJQCaauogYOxluxt-rWvqPPemy_fzG';
  const provider_ETH = new ethers.providers.JsonRpcProvider(rpc_ETH);

  const frenchiesMinterContract = new ethers.Contract(
    '0x18bdD7A20134d0e3eF544aD57513bEDC0728Ca61',
    //'0x32bfb6790B3536a7269185278B482A0FA0385362',
    frenchiesAbi2,
    provider_ETH
  );

  const verifyApproved = async () => {
    let tx = await frenchiesMinterContract.isApprovedForAll(
      accountAddress,
      ofertasContract.address
    );
    if (tx == true) {
      setAp(true);
    }
  };

  const approve = async () => {
    setLoading(true);
    if (chainId == 1) {
      try {
        let tx = await frenchiesMinter.setApprovalForAll(
          ofertasContract.address,
          'true'
        );
        await tx.wait();
        verifyApproved();
        setLoading(false);
        setStatus(200);
        setAlertMsg('Aprobado correctamente');
      } catch (err) {
        setLoading(false);
        setStatus(100);
        const mess = err.message.split('[');
        const rejected = mess[0].split(' ');
        if (mess[0] == 'insufficient funds for intrinsic transaction cost ') {
          setAlertMsg('Fondos insuficientes');
        } else if (rejected[0] == 'user' && rejected[1] == 'rejected') {
          setAlertMsg('Transacion rechazada');
        } else {
          setAlertMsg('Error');
        }
      }
    } else {
      openModal('NETWORK_VIEW');
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyApproved();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (status != 0 && aceptada) {
        setStatus(0);
        window.location.href = '/frenchies';
      } else {
        setStatus(0);
      }
    }, 3000);
  }, [status]);

  const blockChain = {
    id: 1,
    logo: {
      src: 'https://seeklogo.com/images/E/ethereum-classic-eth-etc-logo-B0094454A6-seeklogo.com.png',
      height: 32,
      width: 32,
    },
    name: 'Ethereum',
    slug: '#',
  };

  return (
    <div className="flex flex-grow">
      <div className="mx-auto flex w-full flex-grow flex-col transition-all xl:max-w-[1360px] 4xl:max-w-[1760px]">
        <div className="rtl:md:t-6 relative mb-5 flex flex-grow items-center justify-center md:pb-7 md:pt-4 ltr:md:left-0 ltr:md:pl-6 rtl:md:right-0 lg:fixed lg:mb-0 lg:h-[calc(100%-96px)] lg:w-[calc(100%-492px)] ltr:lg:pl-8 rtl:lg:pr-8 xl:w-[calc(100%-550px)] ltr:xl:pl-[340px] ltr:xl:pr-12 rtl:xl:pl-12 rtl:xl:pr-[340px] ltr:2xl:pl-96 rtl:2xl:pr-96 3xl:w-[calc(100%-632px)] ltr:4xl:pl-0 rtl:4xl:pr-0">
          <div className="flex h-full max-h-full w-full items-center justify-center lg:max-w-[768px]">
            <div className="relative aspect-square max-h-full w-full overflow-hidden rounded-lg">
              <img
                src={nft.image}
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
                  {nft.name}
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
                  {
                    title: 'Ofertas',
                    path: 'ofertado',
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
                        The Frenchies Blue collection combines fantastic art
                        with detailed tokenomics and fun gamification. Holders
                        have DEFI utility, also have access to the private
                        membership, which includes networking and collaboraFtion
                        opportunities with other professionals, as well as the
                        opportunity to participate in group discussion and
                        brainstorming sessions.
                      </div>
                    </div>

                    <div>
                      <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                        Caracteristicas
                      </h3>
                    </div>

                    <div className="grid h-full   w-full  grid-cols-2 gap-4  sm:grid-cols-3  lg:gap-5 xl:gap-6 ">
                      {nft.attributes?.map((item, index) => (
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

                    {/*<div className="block">
                      <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                        Dueño
                      </h3>

                      <div className="inline-flex">
                        <span className="rounded-full p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                          {`@${nombre}`}
                        </span>{' '}
                      </div>
                      </div>*/}
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
                  </div>
                </TabPanel>

                <TabPanel className="focus:outline-none">
                  {nft.active == true && nft.owner == accountAddress && (
                    <div className="flex w-[45%] flex-row">
                      {bidder?.map((bid) => (
                        <FeaturedCard
                          item={bid}
                          key={bid?.id}
                          className="mb-3 w-[200%] first:mb-0"
                        />
                      ))}

                      {!loading && !ap && (
                        <Button onClick={approve} className="ml-2 rounded-lg">
                          aprobar
                        </Button>
                      )}

                      {!loading && ap && (
                        <Button onClick={Aceptar} className="ml-2 rounded-lg">
                          Aceptar
                        </Button>
                      )}

                      {loading && (
                        <Button className="ml-2 rounded-lg">Cargando</Button>
                      )}
                    </div>
                  )}

                  {nft.active == true &&
                    nft.owner != accountAddress &&
                    nft.currentWinner != accountAddress && (
                      <div className="flex w-[45%] flex-row">
                        {bidder?.map((bid) => (
                          <FeaturedCard
                            item={bid}
                            key={bid?.id}
                            className="mb-3 w-[200%] first:mb-0"
                          />
                        ))}
                      </div>
                    )}

                  {nft.active == true &&
                    nft.currentWinner == accountAddress && (
                      <div className="flex w-[45%] flex-row">
                        {bidder?.map((bid) => (
                          <FeaturedCard
                            item={bid}
                            key={bid?.id}
                            className="mb-3 w-[200%] first:mb-0"
                          />
                        ))}

                        {!loading && (
                          <Button onClick={Retirar} className="ml-2 rounded-lg">
                            Retirar
                          </Button>
                        )}

                        {loading && (
                          <Button className="ml-2 rounded-lg">Cargando</Button>
                        )}
                      </div>
                    )}
                </TabPanel>
              </ParamTab>
            </div>
          </div>

          <NftFooter
            className="hidden md:block"
            price={nft.precio}
            id={nft.id}
            _status={status}
            _alertMsg={alertMsg}
          />
          <NftFooter
            price={nft.precio}
            id={nft.id}
            _status={status}
            _alertMsg={alertMsg}
          />
        </div>
      </div>
    </div>
  );
}
function setApprovedToken(arg0: string) {
  throw new Error('Function not implemented.');
}
