import { useState, useEffect } from 'react';
import { atom, useAtom } from 'jotai';
import { NextSeo } from 'next-seo';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { NextPageWithLayout } from '@/types';
import Slider from 'rc-slider';
import { motion } from 'framer-motion';
import DashboardLayout from '@/layouts/_dashboard';
import { ChevronDown } from '@/components/icons/chevron-down';
import NFTGrid from '@/components/ui/nft-card';
import { RadioGroup } from '@/components/ui/radio-group';
import { Listbox } from '@/components/ui/listbox';
import Collapse from '@/components/ui/collapse';
import { Transition } from '@/components/ui/transition';
import { NormalGridIcon } from '@/components/icons/normal-grid';
import { CompactGridIcon } from '@/components/icons/compact-grid';
import CollectionSelect from '@/components/ui/collection-select-list';
import { useDrawer } from '@/components/drawer-views/context';
import Scrollbar from '@/components/ui/scrollbar';
import Button from '@/components/ui/button';
import { Close } from '@/components/icons/close';
import { NFTList } from '@/data/static/nft-list';
import { useSelector, useDispatch } from 'react-redux';
import { getMintedNftProducts } from '../redux/Minted/MintedAction';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import { number } from 'yup';
import NftSlider from '@/components/ui/nftSlider';
import Image from '@/components/ui/image';
import { Verified } from '@/components/icons/verified';
import styled from 'styled-components';
import ActiveLink from '@/components/ui/links/active-link';
import { ethers } from 'ethers';
import {
  uProduct,
  uInvertion,
  connectWallet,
} from '../redux/Blockchain/blockchainAction';
import productoMinterAbi from '../abi/ProductoMinter.json'; //Buscar
import inversionMinterAbi from '../abi/InversionMinter.json';

const gridCompactViewAtom = atom(false);
function useGridSwitcher() {
  const [isGridCompact, setIsGridCompact] = useAtom(gridCompactViewAtom);
  return {
    isGridCompact,
    setIsGridCompact,
  };
}

const productos = [
  {
    nombre: 'Pandora X NFT - Podcast-Streaming',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Podcast-Streaming%20%282%29.gif',
    precio: 100,
    tipo: 'PS',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    nombre: 'Pandora X NFT - Podcast-Academia',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Podcast-Academia%20%281%29.gif',
    precio: 100,
    tipo: 'PA',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    nombre: 'Pandora X NFT - NFT Studio',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20NFT%20Studio%20%282%29.gif',
    precio: 100,
    tipo: 'NS',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    nombre: 'Pandora X NFT - Investing Value',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Investing%20Value%20%282%29.gif',
    precio: 100,
    tipo: 'IV',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    nombre: 'Pandora X NFT - Comunidad Privada',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Comunidad%20Privada.gif',
    precio: 100,
    tipo: 'CP',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    nombre: 'Pandora X NFT - Comunidad Gratuita',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Comunidad%20Gratuita.gif',
    precio: 100,
    tipo: 'CG',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    nombre: 'Pandora X NFT - Coaching',

    precio: 100,
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Coaching.gif',
    tipo: 'NC',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    nombre: 'Pandora X NFT - Alpha Report',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Alpha%20Report.gif',
    precio: 100,
    tipo: 'AP',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
];

const inversion = [
  {
    nombre: 'UBX Card 100',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%20100.gif',
    precio: 100,
    tipo: '100',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    nombre: 'UBX Card 1K',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%201k%20%281%29.gif',
    precio: 100,
    tipo: '1K',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    nombre: 'UBX Card 5K',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%205k.gif',
    precio: 100,
    tipo: '5K',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    nombre: 'UBX Card 10K',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%2010k.gif',
    precio: 100,
    tipo: '10K',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    nombre: 'UBX Card 20K',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%2020k.gif',
    precio: 100,
    tipo: '20K',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    nombre: 'UBX Card 50K',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%2050k.gif',
    precio: 100,
    tipo: '50K',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    nombre: 'UBX Card 100K',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%20100k.gif',
    precio: 100,
    tipo: '100K',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
];

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const BuyButton = styled.button`
  background: #000;
  border: none;
  border-radius: 10px;
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

let inversionI = [];
let productoP = [];

const SearchPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const a = {
    numb: 0,
    tipo: '',
  };

  const pricesP = [];
  const pricesI = [];
  const { isGridCompact } = useGridSwitcher();
  const { openDrawer } = useDrawer();
  const dispatch = useDispatch<AppDispatch>();
  const [currentItems, setCurrentItems] = useState([]);
  const [currentInv, setCurrentInv] = useState([]);
  const [tokenAddress, setTokenAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [cuenta, setCuenta] = useState('');
  const [approvedToken, setApprovedToken] = useState(0);
  const Usuario = useSelector((state) => state.Usuario);
  const { dataloaded, inversiones, productos } = useSelector(
    (state: any) => state.minted
  );

  const {
    productoMinter,
    inversionMinter,
    isConnect,
    accountAddress,
    usdtContract,
    tokenContract,
  } = useSelector((state) => state.blockchain);

  const { referidor } = useSelector((state) => state.Usuario);

  const getNft = async () => {
    await dispatch(getMintedNftProducts());
  };
  const verifyApprove = async (type) => {
    try {
      if (type == 'producto') {
        const usdt = await tokenContract.allowance(
          accountAddress,
          productoMinter.address
        ); //MarketPlace
        //setApprovedUsdt(ethers.utils.formatUnits(usdt, 18));
        setApprovedToken(ethers.utils.formatUnits(usdt, 18));
      } else if (type == 'inversion') {
        const usdt = await tokenContract.allowance(
          accountAddress,
          inversionMinter.address
        ); //MarketPlace
        //setApprovedUsdt(ethers.utils.formatUnits(usdt, 18));
        setApprovedToken(ethers.utils.formatUnits(usdt, 18));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const approve = async (type, precio) => {
    setLoading(true);

    try {
      if (type == 'producto') {
        setTokenAddress(tokenContract.address);

        const decimals = 18;

        console.log(tokenContract);

        const tx = await tokenContract.approve(
          productoMinter.address,
          ethers.utils.parseUnits(precio.toString(), decimals)
        );

        await tx.wait();
        await verifyApprove(type);
        setLoading(false);
      } else if (type == 'inversion') {
        setTokenAddress(tokenContract.address);
        const decimals = 18;
        const tx = await tokenContract.approve(
          inversionMinter.address,
          ethers.utils.parseUnits(precio.toString(), decimals)
        );

        await tx.wait();
        await verifyApprove(type);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const buyNft = async (type, tipoN) => {
    setLoading(true);

    try {
      if (type == 'producto') {
        if (!Usuario.isReferido && Usuario.type == 'Agente X') {
          let porcentaje = 0;
          if (Usuario.range == 'peerx') {
            porcentaje = 200;
          } else if (Usuario.range == 'blockelite') {
            porcentaje = 250;
          } else if (Usuario.range == 'blockmaster') {
            porcentaje = 350;
          } else if (Usuario.range == 'blockcreator') {
            porcentaje = 400;
          }

          const tx = await productoMinter.buyTokenWithReferido(
            tipoN,
            tokenContract.address,
            referidor,
            porcentaje
          );
          //referidos
          await tx.wait();
          setLoading(false);
          setApprovedToken(0);
          dispatch(uProduct());
        } else {
          const tx = await productoMinter.buyToken(
            tipoN,
            tokenContract.address
          );

          await tx.wait(); //tener en cuenta para los proximos cambios
          setLoading(false);
          setApprovedToken(0);
          dispatch(uProduct());
        }
      } else if (type == 'inversion') {
        const tx = await inversionMinter.buyToken(tipoN, tokenContract.address);
        await tx.wait();
        setLoading(false);
        setApprovedToken(0);
        dispatch(uInvertion());
      }
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      await getNft();
      //const itemsPerPage = 6
      //const start = (currentPage - 1) * itemsPerPage
      setCurrentItems(productos);
      setCurrentInv(inversiones);
      console.log(inversiones);
    };
    fetchItems();
  }, [dataloaded, inversiones, productos]);

  /*useEffect(() => {
    const fetchItems = async () => {
      if(isConnect){
        productoP.map(async(item)=>{

          const precio = await productoMinter.buyPrice(item.tipoN)

          const price = ethers.utils.formatUnits(precio, 18)
          productoP[item.tipoN-1].precio = parseInt(price)
  
        })
        inversionI.map(async(item)=>{

          const precio = await inversionMinter.buyPrice(item.tipoN)
          const price = ethers.utils.formatUnits(precio, 18)
          inversionI[item.tipoN-1].precio = parseInt(price)
  
        })
        console.log(productoP)
      }
    }
    fetchItems();
  },[inversionI]);*/

  return (
    <>
      <NextSeo
        title="Explore NTF"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <div className="w-[100%]  sm:pt-5">
        <div className=" w-[100%]">
          <ParamTab
            tabMenu={[
              {
                title: 'Productos',
                path: 'productos',
              },
              {
                title: 'Inversiones',
                path: 'inversiones',
              },
            ]}
          >
            <TabPanel className="flex justify-center focus:outline-none">
              <div
                className={
                  isGridCompact
                    ? 'grid gap-5 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5'
                    : 'grid gap-6 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-3 4xl:grid-cols-4'
                }
              >
                {currentItems.map((producto) => (
                  <div
                    className="row flex space-x-10 p-8"
                    key={producto.Nombre}
                  >
                    <div className="relative w-[400px] overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark">
                      <div className="relative block w-full pb-full">
                        <Image
                          src={producto.img}
                          //placeholder="blur"
                          layout="fill"
                          objectFit="cover"
                          alt={producto.nombre}
                        />
                      </div>

                      <div className="pt-5">
                        <div className="text-lg font-medium text-black dark:text-white">
                          <h1>{producto.Nombre}</h1>
                        </div>
                        {isConnect && (
                          <div className="mt-1.5 flex text-lg">
                            {producto.precio !== 0 && (
                              <span>
                                {producto.precio}$ USDT
                                {/*Cuando se traiga la metadata de la base de datos se setean los precios*/}
                              </span>
                            )}
                            {producto.precio == 0 && (
                              <span>
                                Cargando...
                                {/*Cuando se traiga la metadata de la base de datos se setean los precios*/}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="mt-2 space-x-2">
                        {loading && (
                          <Button size="small">
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Loading...
                          </Button>
                        )}
                        {isConnect && producto.precio > approvedToken && (
                          <Button
                            type="button"
                            size="small"
                            onClick={() => approve('producto', producto.precio)}
                          >
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Approve
                          </Button>
                        )}

                        {isConnect &&
                          !loading &&
                          producto.precio <= approvedToken && (
                            <Button
                              type="button"
                              size="small"
                              onClick={() => buyNft('producto', producto.tipoN)}
                            >
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Buy Nft
                            </Button>
                          )}

                        {isConnect && !loading && (
                          <ActiveLink href={`/details/${producto.tipo}`}>
                            <Button type="button" size="small">
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Ver mas...
                            </Button>
                          </ActiveLink>
                        )}

                        {!isConnect && (
                          <Button
                            type="button"
                            size="small"
                            onClick={() => {
                              dispatch(connectWallet());
                            }}
                          >
                            Connect Wallet
                          </Button>
                        )}

                        <div className="mt-2">{producto.descripcion}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>
            <TabPanel className="flex justify-center focus:outline-none">
              <div
                className={
                  isGridCompact
                    ? 'grid gap-5 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5'
                    : 'grid gap-6 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-3 4xl:grid-cols-4'
                }
              >
                {currentInv.map((inversion) => (
                  <div
                    className="row flex space-x-10 p-8"
                    key={inversion.Nombre}
                  >
                    <div className="relative w-[400px] overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark">
                      <div className="relative block w-full pb-full">
                        <Image
                          src={inversion.img}
                          //placeholder="blur"
                          layout="fill"
                          objectFit="cover"
                          alt={inversion.Nombre}
                        />
                      </div>

                      <div className="pt-5">
                        <div className="text-lg font-medium text-black dark:text-white">
                          <h1>{inversion.Nombre}</h1>
                        </div>
                        {isConnect && (
                          <div className="mt-1.5 flex text-lg">
                            {inversion.precio !== 0 && (
                              <span>
                                {inversion.precio}$ USDT
                                {/*Cuando se traiga la metadata de la base de datos se setean los precios*/}
                              </span>
                            )}
                            {inversion.precio == 0 && (
                              <span>
                                Cargando...
                                {/*Cuando se traiga la metadata de la base de datos se setean los precios*/}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="mt-2 space-x-2">
                        {isConnect && inversion.precio > approvedToken && (
                          <Button
                            type="button"
                            size="small"
                            onClick={() =>
                              approve('inversion', inversion.precio)
                            }
                          >
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Approve
                          </Button>
                        )}
                        {isConnect &&
                          !loading &&
                          inversion.precio <= approvedToken && (
                            <Button
                              type="button"
                              size="small"
                              onClick={() =>
                                buyNft('inversion', inversion.tipoN)
                              }
                            >
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Buy Nft
                            </Button>
                          )}
                        {isConnect && (
                          <ActiveLink href={`/details/${inversion.tipo}`}>
                            <Button type="button" size="small">
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Ver mas...
                            </Button>
                          </ActiveLink>
                        )}

                        {!isConnect && (
                          <Button
                            type="button"
                            size="small"
                            onClick={() => {
                              dispatch(connectWallet());
                            }}
                          >
                            Connect Wallet
                          </Button>
                        )}
                        <div className="mt-2">{inversion.descripcion}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>
          </ParamTab>
        </div>

        <div className="fixed bottom-6 left-1/2 z-10 w-full -translate-x-1/2 px-9 sm:hidden">
          <Button onClick={() => openDrawer('DRAWER_SEARCH')} fullWidth>
            Filters
          </Button>
        </div>
      </div>
    </>
  );
};

SearchPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default SearchPage;
