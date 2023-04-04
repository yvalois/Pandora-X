import { useState, useEffect, useContext } from 'react';
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
import { getAllNFts, getMintedNftProducts } from '../redux/Minted/MintedAction';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import { number } from 'yup';
import NftSlider from '@/components/ui/nftSlider';
import Image from '@/components/ui/image';
import { Verified } from '@/components/icons/verified';
import styled from 'styled-components';
import ActiveLink from '@/components/ui/links/active-link';
import { ethers } from 'ethers';
import validator from 'validator';
import frenchiesAbi2 from '../abi/FrenchiesBlues2.json';
import InfiniteScroll from 'react-infinite-scroll-component';
import frenchiesAbi from '../abi/FrenchiesBlues.json';

import auction from '../abi/auction.json';
import _ofertas from '../abi/ofertas.json';

import ventas from '../abi/ventas.json';

import allFrenchies from '../abi/ultimateDatos.json';

import {
  connectWallet,
  uFrench,
  uFrench2,
} from '../redux/Blockchain/blockchainAction';
import { useAccount, useProvider, useSigner } from 'wagmi';
import { useModal as hola } from 'connectkit';
import { useModal } from '@/components/modal-views/context';
import { WalletContext } from '@/lib/hooks/use-connect';
import AnchorLink from '@/components/ui/links/anchor-link';
import Back from '@/assets/images/FR3 back3.jpeg';

const gridCompactViewAtom = atom(false);
function useGridSwitcher() {
  const [isGridCompact, setIsGridCompact] = useAtom(gridCompactViewAtom);
  return {
    isGridCompact,
    setIsGridCompact,
  };
}

function GridSwitcher() {
  const { isGridCompact, setIsGridCompact } = useGridSwitcher();
  return (
    <div className="flex overflow-hidden rounded-lg">
      <button
        className={`relative flex h-11 w-11 items-center justify-center bg-gray-100 transition dark:bg-gray-800 ${
          !isGridCompact ? 'z-10 text-white' : 'text-brand dark:text-white'
        }`}
        onClick={() => setIsGridCompact(!isGridCompact)}
        aria-label="Normal Grid"
      >
        {!isGridCompact && (
          <motion.span
            className="absolute left-0 right-0 bottom-0 h-full w-full bg-brand shadow-large"
            layoutId="gridSwitchIndicator"
          />
        )}
        <NormalGridIcon className="relative" />
      </button>
      <button
        className={`relative flex h-11 w-11 items-center justify-center bg-gray-100 transition dark:bg-gray-800 ${
          isGridCompact ? 'z-10 text-white' : 'text-brand dark:text-white'
        }`}
        onClick={() => setIsGridCompact(!isGridCompact)}
        aria-label="Normal Grid"
      >
        {isGridCompact && (
          <motion.span
            className="absolute left-0 right-0 bottom-0 h-full w-full  bg-brand shadow-large"
            layoutId="gridSwitchIndicator"
          />
        )}
        <CompactGridIcon className="relative" />
      </button>
    </div>
  );
}

const sort = [
  { id: 1, name: 'Date Listed: Newest' },
  { id: 2, name: 'Date Listed: Oldest' },
  { id: 3, name: 'Ending: Soonest' },
  { id: 4, name: 'Ending: Latest' },
];

function SortList() {
  const [selectedItem, setSelectedItem] = useState(sort[0]);

  return (
    <div className="relative">
      <Listbox value={selectedItem} onChange={setSelectedItem}>
        <Listbox.Button className="flex h-10 w-auto items-center justify-between rounded-lg bg-gray-100 px-4 text-xs text-gray-900 dark:bg-gray-800 dark:text-white sm:w-56 sm:text-sm lg:h-11">
          {selectedItem.name}
          <ChevronDown className="ltr:ml-2 rtl:mr-2" />
        </Listbox.Button>
        <Transition
          enter="ease-out duration-200"
          enterFrom="opacity-0 translate-y-2"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 -translate-y-0"
          leaveTo="opacity-0 translate-y-2"
        >
          <Listbox.Options className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white p-3 shadow-large dark:bg-light-dark sm:w-full">
            {sort.map((item) => (
              <Listbox.Option key={item.id} value={item}>
                {({ selected }) => (
                  <div
                    className={`block cursor-pointer rounded-lg px-3 py-2 text-xs font-medium text-gray-900 transition dark:text-white sm:text-sm  ${
                      selected
                        ? 'my-1 bg-gray-100 dark:bg-gray-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.name}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}

function PriceRange() {
  let [range, setRange] = useState({ min: 0, max: 1000 });
  function handleRangeChange(value: any) {
    setRange({
      min: value[0],
      max: value[1],
    });
  }

  function handleMaxChange(max: number) {
    setRange({
      ...range,
      max: max || range.min,
    });
  }

  function handleMinChange(min: number) {
    setRange({
      ...range,
      min: min || 0,
    });
  }

  return (
    <div className="p-5">
      <div className="mb-4 grid grid-cols-2 gap-2">
        <input
          className="h-9 rounded-lg border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
          type="number"
          value={range.min}
          onChange={(e) => handleMinChange(parseInt(e.target.value))}
          min="0"
          max={range.max}
        />
        <input
          className="h-9 rounded-lg border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
          type="number"
          value={range.max}
          onChange={(e) => handleMaxChange(parseInt(e.target.value))}
          min={range.min}
        />
      </div>
      <Slider
        range
        min={0}
        max={1000}
        value={[range.min, range.max]}
        allowCross={false}
        onChange={(value) => handleRangeChange(value)}
      />
    </div>
  );
}

function Status({ ontipom }) {
  let [plan, setPlan] = useState('new');

  function handleClick(value) {
    ontipom(value);
  }

  return (
    <RadioGroup
      value={plan}
      onChange={setPlan}
      className="grid grid-cols-2 gap-2 p-5"
    >
      <RadioGroup.Option
        value="buy-now"
        onClick={() => {
          handleClick('buy-now');
        }}
      >
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
              checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            En venta
          </span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option
        value="on-auction"
        onClick={() => {
          handleClick('on-auction');
        }}
      >
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
              checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            Subastas
          </span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option
        value="new"
        onClick={() => {
          handleClick('new');
        }}
      >
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
              checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            Todos
          </span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option
        value="has-offers"
        onClick={() => {
          handleClick('has-offers');
        }}
      >
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
              checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            Ofertas
          </span>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  );
}

function Filters({ ontipom }) {
  return (
    <>
      <Collapse label="Status" initialOpen>
        <Status ontipom={ontipom} />
      </Collapse>
      <Collapse label="Collection" initialOpen>
        <CollectionSelect onSelect={(value) => console.log(value)} tipo={2} />
      </Collapse>
    </>
  );
}

export function DrawerFilters() {
  const { closeDrawer } = useDrawer();
  return (
    <div className="relative w-full max-w-full bg-white dark:bg-dark xs:w-80">
      <div className="flex h-20 items-center justify-between overflow-hidden px-6 py-4">
        <h2 className="text-xl font-medium uppercase tracking-wider text-gray-900 dark:text-white">
          Filters
        </h2>
        <Button
          shape="circle"
          color="white"
          onClick={closeDrawer}
          className="dark:bg-light-dark"
        >
          <Close className="h-auto w-3" />
        </Button>
      </div>
      <Scrollbar style={{ height: 'calc(100% - 96px)' }}>
        <div className="px-6 pb-20 pt-1">
          <Filters />
        </div>
      </Scrollbar>
      <div className="absolute left-0 bottom-4 z-10 w-full px-6">
        <Button fullWidth onClick={closeDrawer}>
          DONE
        </Button>
      </div>
    </div>
  );
}

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

//let inversionI = [];
//let productoP = [];

const Frenchies: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const { openModal } = useModal();

  const provider = useProvider();
  const { address } = useAccount();
  const { setOpen } = hola();

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
  const [cantidad, setCantidad] = useState(0);
  const Usuario = useSelector((state) => state.Usuario);
  const [supply, setSupply] = useState(0);
  const [status, setStatus] = useState(0);
  const [count, setCount] = useState(0);
  const [errormsg, setErrorMSG] = useState('');
  const [pan, setPan] = useState(false);
  const [precio, setPrecio] = useState(0);
  const [multiplicador, setMultiplicador] = useState(0);
  const [vendido, setVendido] = useState(false);
  const {
    frenchiesMinter,
    accountAddress,
    maticContract,
    isConnect,
    tokenContract,
    chainId,
    frenchiess,
    frenchiesMinter2,
  } = useSelector((state) => state.blockchain);
  const allnfts = allFrenchies;
  const [frenchies, setFrenchies] = useState([]);
  const [frenchies2, setFrenchies2] = useState([]);
  const [isMoreF, setIsMoreF] = useState(false);
  const [subastas, setSubastas] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [_ventas, setVentas] = useState([]);

  const [mysubastas, setMySubastas] = useState([]);
  const [mypujas, setMyPujas] = useState([]);

  const [myofertas, setMyOfertas] = useState([]);
  const [offers, setOffers] = useState([]);
  const [myventas, setMyVentas] = useState([]);
  const [currentF, setCurrentF] = useState([]);
  const [currentF2, setCurrentF2] = useState([]);

  const { inventoryf, inventoryf2 } = useSelector(
    (state: any) => state.blockchain
  );

  const rpc_GOETH =
    'https://eth-goerli.g.alchemy.com/v2/vMRJQCaauogYOxluxt-rWvqPPemy_fzG';
  const provider_GOETH = new ethers.providers.JsonRpcProvider(rpc_GOETH);

  const rpc_ETH =
    'https://eth-mainnet.g.alchemy.com/v2/q9zvspHI6cAhD0JzaaxHQDdJp_GqXNMJ';
  const provider_ETH = new ethers.providers.JsonRpcProvider(rpc_ETH);

  const frenchiesMinterContract = new ethers.Contract(
    '0x18bdD7A20134d0e3eF544aD57513bEDC0728Ca61',
    //'0x32bfb6790B3536a7269185278B482A0FA0385362',
    frenchiesAbi2,
    provider_GOETH
  );

  const frenchiesMinterContract1 = new ethers.Contract(
    '0x32bfb6790B3536a7269185278B482A0FA0385362',
    //'0x32bfb6790B3536a7269185278B482A0FA0385362',
    frenchiesAbi,
    provider_ETH
  );

  const AuctionMinterContract = new ethers.Contract(
    '0xEb580F6623009898369E014B8fbF06e4417daEC9',
    //'0x32bfb6790B3536a7269185278B482A0FA0385362',
    auction,
    provider_GOETH
  );

  const OffersMinterContract = new ethers.Contract(
    '0x7590aAf6Bc30704351C6C47E64910b910F81735b',
    //'0x32bfb6790B3536a7269185278B482A0FA0385362',
    _ofertas,
    provider_GOETH
  );

  const VentasMinterContract = new ethers.Contract(
    '0x27423F0f8661F679322C02D2396AC82182846FF3',
    //'0x32bfb6790B3536a7269185278B482A0FA0385362',
    ventas,
    provider_GOETH
  );

  const valor = 0.3;
  const valor2 = 0.001;

  const { referidor } = useSelector((state) => state.Usuario);

  const { data: signer, isError, isLoading: arroz } = useSigner();

  const buyNft = async () => {
    if (chainId == 1) {
      setLoading(true);

      try {
        if (Usuario.rol != 'Admin') {
          if (count - multiplicador >= 0) {
            const options = {
              value: ethers.utils.parseUnits('0', 'ether'),
            };

            const tx = await frenchiesMinter.buyToken(cantidad, options);

            await tx.wait(); //tener en cuenta para los proximos cambios
            dispatch(uFrench(accountAddress));
            setStatus(200);
            setVendido(true);
            setCantidad(0);
            setApprovedToken(0);
            setearSupply();
            //verifyApprove();
            setLoading(false);
            if (count > 0) {
              setCount(count - multiplicador);
              setMultiplicador(0);
              setCantidad(0);
              setPrecio(0);
              setLoading(false);
            } else {
              setMultiplicador(0);
              setCantidad(0);
              setPrecio(0);
              setLoading(false);
            }
          } else {
            const options_ = {
              value: ethers.utils.parseUnits(
                (valor * (multiplicador - count)).toString(),
                'ether'
              ),
            };

            const tx = await frenchiesMinter.buyToken(cantidad, options_);

            await tx.wait(); //tener en cuenta para los proximos cambios
            dispatch(uFrench(accountAddress));
            setStatus(200);
            setVendido(true);
            setCantidad(0);
            setApprovedToken(0);
            setearSupply();
            setLoading(false);

            if (count > 0) {
              setCount(count - multiplicador);
              setMultiplicador(0);
              setCantidad(0);
              setPrecio(0);
              setLoading(false);
            } else {
              setMultiplicador(0);
              setCantidad(0);
              setPrecio(0);
              setLoading(false);
            }
          }
        } else {
          if (count - multiplicador >= 0) {
            const options = {
              value: ethers.utils.parseUnits('0', 'ether'),
            };

            const tx = await frenchiesMinter2.buyToken(cantidad, options);

            await tx.wait(); //tener en cuenta para los proximos cambios
            dispatch(uFrench2(accountAddress, frenchiesMinterContract));
            setStatus(200);
            setVendido(true);
            setCantidad(0);
            setApprovedToken(0);
            setearSupply();
            //verifyApprove();
            setLoading(false);
            if (count > 0) {
              setCount(count - multiplicador);
              setMultiplicador(0);
              setCantidad(0);
              setPrecio(0);
              setLoading(false);
            } else {
              setMultiplicador(0);
              setCantidad(0);
              setPrecio(0);
              setLoading(false);
            }
          } else {
            const options_ = {
              value: ethers.utils.parseUnits(
                (valor2 * (multiplicador - count)).toString(),
                'ether'
              ),
            };

            const tx = await frenchiesMinter2.buyToken(cantidad, options_);

            await tx.wait(); //tener en cuenta para los proximos cambios
            dispatch(uFrench(accountAddress));
            setStatus(200);
            setVendido(true);
            setCantidad(0);
            setApprovedToken(0);
            setearSupply();
            setLoading(false);
            dispatch(uFrench2(accountAddress, frenchiesMinterContract));

            if (count > 0) {
              setCount(count - multiplicador);
              setMultiplicador(0);
              setCantidad(0);
              setPrecio(0);
              setLoading(false);
            } else {
              setMultiplicador(0);
              setCantidad(0);
              setPrecio(0);
              setLoading(false);
            }
          }
        }
      } catch (err) {
        setLoading(false);
        setStatus(100);
        const mess = err.message.split('[');
        //const messa = mess[1].split(":")
        //const messag = messa[3].split(",")
        //const messag_ = messag[0].split("-")
        console.log(mess);
        const rejected = mess[0].split(' ');
        console.log(rejected);

        if (mess[0] == 'insufficient funds for intrinsic transaction cost ') {
          setErrorMSG('Fondos insuficientes');
        } else if (rejected[0] == 'user' && rejected[1] == 'rejected') {
          setErrorMSG('Transacion rechazada');
        } else {
          setErrorMSG('Error');
        }
        //
      }
    } else if (chainId !== 137) {
      try {
        if (Usuario.rol != 'Admin') {
          if (count - multiplicador >= 0) {
            const options = {
              value: ethers.utils.parseUnits('0', 'ether'),
            };

            const tx = await frenchiesMinter.buyToken(cantidad, options);

            await tx.wait(); //tener en cuenta para los proximos cambios
            dispatch(uFrench(accountAddress));
            setStatus(200);
            setVendido(true);
            setCantidad(0);
            setApprovedToken(0);
            setearSupply();
            //verifyApprove();
            setLoading(false);
            if (count > 0) {
              setCount(count - multiplicador);
              setMultiplicador(0);
              setCantidad(0);
              setPrecio(0);
              setLoading(false);
            } else {
              setMultiplicador(0);
              setCantidad(0);
              setPrecio(0);
              setLoading(false);
            }
          } else {
            const options_ = {
              value: ethers.utils.parseUnits(
                (valor * (multiplicador - count)).toString(),
                'ether'
              ),
            };

            const tx = await frenchiesMinter.buyToken(cantidad, options_);

            await tx.wait(); //tener en cuenta para los proximos cambios
            dispatch(uFrench(accountAddress));
            setStatus(200);
            setVendido(true);
            setCantidad(0);
            setApprovedToken(0);
            setearSupply();
            setLoading(false);

            if (count > 0) {
              setCount(count - multiplicador);
              setMultiplicador(0);
              setCantidad(0);
              setPrecio(0);
              setLoading(false);
            } else {
              setMultiplicador(0);
              setCantidad(0);
              setPrecio(0);
              setLoading(false);
            }
          }
        } else {
          if (count - multiplicador >= 0) {
            const options = {
              value: ethers.utils.parseUnits('0', 'ether'),
            };

            const tx = await frenchiesMinter2.buyToken(cantidad, options);

            await tx.wait(); //tener en cuenta para los proximos cambios
            dispatch(uFrench2(accountAddress, frenchiesMinterContract));
            setStatus(200);
            setVendido(true);
            setCantidad(0);
            setApprovedToken(0);
            setearSupply();
            //verifyApprove();
            setLoading(false);
            if (count > 0) {
              setCount(count - multiplicador);
              setMultiplicador(0);
              setCantidad(0);
              setPrecio(0);
              setLoading(false);
            } else {
              setMultiplicador(0);
              setCantidad(0);
              setPrecio(0);
              setLoading(false);
            }
          } else {
            const options_ = {
              value: ethers.utils.parseUnits(
                (valor2 * (multiplicador - count)).toString(),
                'ether'
              ),
            };

            const tx = await frenchiesMinter2.buyToken(cantidad, options_);

            await tx.wait(); //tener en cuenta para los proximos cambios
            dispatch(uFrench(accountAddress));
            setStatus(200);
            setVendido(true);
            setCantidad(0);
            setApprovedToken(0);
            setearSupply();
            setLoading(false);
            dispatch(uFrench2(accountAddress, frenchiesMinterContract));

            if (count > 0) {
              setCount(count - multiplicador);
              setMultiplicador(0);
              setCantidad(0);
              setPrecio(0);
              setLoading(false);
            } else {
              setMultiplicador(0);
              setCantidad(0);
              setPrecio(0);
              setLoading(false);
            }
          }
        }
      } catch (err) {
        setLoading(false);
        setStatus(100);
        const mess = err.message.split('[');
        //const messa = mess[1].split(":")
        //const messag = messa[3].split(",")
        //const messag_ = messag[0].split("-")
        console.log(mess);
        const rejected = mess[0].split(' ');
        console.log(rejected);

        if (mess[0] == 'insufficient funds for intrinsic transaction cost ') {
          setErrorMSG('Fondos insuficientes');
        } else if (rejected[0] == 'user' && rejected[1] == 'rejected') {
          setErrorMSG('Transacion rechazada');
        } else {
          setErrorMSG('Error');
        }
        //
      }
    } else if (chainId == 137) {
      openModal('NETWORK_VIEW');
    }
  };

  const abrir = () => {
    setOpen(true);
  };

  const _provider = useProvider();

  /*useEffect(() => {
    if (!arroz && signer !== undefined) {
      console.log(signer);
      dispatch(connectWallet(address, provider, signer));

      setOpen(false);
    }
  }, [signer, arroz]);*/

  const getWhithelist = async () => {
    setLoading(true);
    if (chainId != 1) {
      setLoading(false);
    }

    const w = await frenchiesMinter.getWhitelist();
    if (w == true) {
      const c = await frenchiesMinter.getCountWl();
      setCount(c);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnect) {
      setearSupply();
      getWhithelist();
    }
  }, [pan]);

  useEffect(() => {
    if (isConnect) {
      setearSupply();
      getWhithelist();
    } else if (!isConnect) {
      setCount(0);
    }
  }, [isConnect]);

  useEffect(() => {
    setPan(true);
  }, []);

  const changeCantidad = (type) => {
    if (type == '-' && cantidad > 0) {
      setCantidad(cantidad - 1);
      if (count <= cantidad - 1) {
        setPrecio(valor * (cantidad - 1 - count));
        setMultiplicador(multiplicador - 1);
      } else {
        setPrecio(0);
        setMultiplicador(0);
      }
    } else if (type == '+') {
      setCantidad(cantidad + 1);
      if (count < cantidad + 1) {
        setPrecio(valor * (cantidad + 1 - count));
        setMultiplicador(multiplicador + 1);
      } else {
        setPrecio(0);
        setMultiplicador(0);
      }
    }
  };

  const changeCantidadM = (e) => {
    let cant = e.target.value;
    if (validator.isNumeric(cant)) {
      if (cantidad == 0) {
        setCantidad(cantidad + parseInt(cant));
        const cant_ = cantidad + parseInt(cant);
        if (cant_ - count < 0) {
          setPrecio(0);
        } else {
          setPrecio(valor * (cant_ - count));
        }
        setMultiplicador(cant_);
      } else {
        setCantidad(parseInt(cant));
        const cant_ = parseInt(cant);

        if (cant_ - count < 0) {
          setPrecio(0);
        } else {
          setPrecio(valor * (cant_ - count));
        }
        setMultiplicador(cant_);
      }
    } else if (cant == '') {
      setCantidad(0);
    }
  };

  const setearSupply = async () => {
    //setLoading(true);

    const supp = await frenchiesMinterContract1.totalSupply();
    //setLoading(false);

    setSupply(parseInt(supp));
  };

  useEffect(() => {
    setTimeout(() => {
      if (status != 0) {
        setStatus(0);
      }
    }, 3000);
  }, [status]);

  /*useEffect(() => {
    const is = window.localStorage.getItem('wagmi.store');
    const es = JSON.parse(is);

    const si = es.state.data.account;
    if (si != undefined && !isConnect) {
      openModal('WALLET_CONNECT_VIEW');
    }
  }, [isConnect]);*/

  const { frenchs } = useSelector((state) => state.minted);

  const getnfts = async () => {
    const supp = await frenchiesMinterContract.totalSupply();

    const nfts = allnfts.slice(0, supp);
    setFrenchies(nfts);

    if (supp >= 100) {
      const nfts2 = allnfts.slice(0, 100);
      setFrenchies2(nfts2);
      setIsMoreF(true);
    } else {
      setFrenchies2(nfts);
      setIsMoreF(false);
    }
  };

  const fetchMoreItems = () => {
    setTimeout(() => {
      const newItems = frenchies.slice(
        frenchies2.length,
        frenchies2.length + 100
      );
      setFrenchies2([...frenchies2, ...newItems]);
    }, 1500);
  };

  const getNftAuction = async () => {
    const nose = await AuctionMinterContract.getSubastasAll();
    const jsonArray = [];

    for (let i = 0; i < nose.length; i++) {
      const id = parseInt(nose[i].tokenId);
      const infoToken = allnfts[id];

      const objetoJSON = {
        tokenId: parseInt(nose[i].tokenId),
        seller: nose[i].seller,
        startBlock: parseInt(nose[i].startBlock),
        endBlock: parseInt(nose[i].endBlock),
        startPrice: parseInt(nose[i].startPrice),
        currentPrice: parseInt(nose[i].currentPrice),
        currentWinner: nose[i].currentWinner,
        active: nose[i].active,
        name: infoToken.name,
        image: infoToken.image,
        description: infoToken.descripcion,
        type: 'subasta',
      };
      allnfts[id] = objetoJSON;
      jsonArray.push(objetoJSON);
    }
    setSubastas(jsonArray);
  };

  const getMyNftAuction = async () => {
    const nose = await AuctionMinterContract.getSubastasMyNfts(accountAddress);
    const jsonArray = [];

    for (let i = 0; i < nose.length; i++) {
      const id = parseInt(nose[i].tokenId);
      const infoToken = allnfts[id];

      const objetoJSON = {
        tokenId: parseInt(nose[i].tokenId),
        seller: nose[i].seller,
        startBlock: parseInt(nose[i].startBlock),
        endBlock: parseInt(nose[i].endBlock),
        startPrice: parseInt(nose[i].startPrice),
        currentPrice: parseInt(nose[i].currentPrice),
        currentWinner: nose[i].currentWinner,
        active: nose[i].active,
        name: infoToken.name,
        image: infoToken.image,
        description: infoToken.descripcion,
        type: 'subasta',
      };

      jsonArray.push(objetoJSON);
    }
    setMySubastas(jsonArray);
  };

  const getMyNftPuja = async () => {
    const nose = await AuctionMinterContract.getPujas(accountAddress);
    const jsonArray = [];
    for (let i = 0; i < nose.length; i++) {
      const id = parseInt(nose[i].tokenId);
      const infoToken = allnfts[id];
      const objetoJSON = {
        tokenId: parseInt(nose[i].tokenId),
        seller: nose[i].seller,
        startBlock: parseInt(nose[i].startBlock),
        endBlock: parseInt(nose[i].endBlock),
        startPrice: parseInt(nose[i].startPrice),
        currentPrice: parseInt(nose[i].currentPrice),
        currentWinner: nose[i].currentWinner,
        active: nose[i].active,
        name: infoToken.name,
        image: infoToken.image,
        description: infoToken.descripcion,
        type: 'subasta',
      };
      jsonArray.push(objetoJSON);
    }
    setMyPujas(jsonArray);
  };

  const getNftOffers = async () => {
    const nose = await OffersMinterContract.getOfertasAll();
    const jsonArray = [];

    for (let i = 0; i < nose.length; i++) {
      const id = parseInt(nose[i].tokenId);
      const infoToken = allnfts[id];

      const objetoJSON = {
        tokenId: parseInt(nose[i].tokenId),
        owner: nose[i].owner,
        max: parseInt(nose[i].max),
        active: nose[i].active,
        currentWinner: nose[i].currentWinner,
        name: infoToken.name,
        image: infoToken.image,
        type: 'general',
      };
      allnfts[id] = objetoJSON;
      jsonArray.push(objetoJSON);
    }

    setOfertas(jsonArray);
  };

  const getNftOwnerOffers = async () => {
    const nose = await OffersMinterContract.getOfertas(accountAddress);
    const jsonArray = [];

    for (let i = 0; i < nose.length; i++) {
      const id = parseInt(nose[i].tokenId);
      const infoToken = allnfts[id];

      const objetoJSON = {
        tokenId: parseInt(nose[i].tokenId),
        owner: nose[i].owner,
        max: parseInt(nose[i].max),
        active: nose[i].active,
        currentWinner: nose[i].currentWinner,
        name: infoToken.name,
        image: infoToken.image,
        type: 'general',
      };
      jsonArray.push(objetoJSON);
    }

    setMyOfertas(jsonArray);
  };

  const getNftMyOffers = async () => {
    const nose = await OffersMinterContract.getOfertasMyNfts(accountAddress);
    const jsonArray = [];

    for (let i = 0; i < nose.length; i++) {
      const id = parseInt(nose[i].tokenId);
      const infoToken = allnfts[id];

      const objetoJSON = {
        tokenId: parseInt(nose[i].tokenId),
        owner: nose[i].owner,
        max: parseInt(nose[i].max),
        active: nose[i].active,
        currentWinner: nose[i].currentWinner,
        name: infoToken.name,
        image: infoToken.image,
        type: 'general',
      };
      jsonArray.push(objetoJSON);
    }

    setOffers(jsonArray);
  };

  const getNftVentas = async () => {
    const nose = await VentasMinterContract.getVentasAll();
    const jsonArray = [];

    for (let i = 0; i < nose.length; i++) {
      const id = parseInt(nose[i].tokenId);
      const infoToken = allnfts[id];
      const objetoJSON = {
        tokenId: parseInt(nose[i].tokenId),
        owner: nose[i].owner,
        price: parseInt(nose[i].price),
        active: nose[i].active,
        name: infoToken.name,
        image: infoToken.image,
        id: infoToken.id,
        type: 'venta',
        description: infoToken.descripcion,
      };
      jsonArray.push(objetoJSON);
      allnfts[id] = objetoJSON;
    }
    setVentas(jsonArray);
  };

  const getMyNftVentas = async () => {
    const nose = await VentasMinterContract.getVentasMyNfts(accountAddress);
    const jsonArray = [];

    for (let i = 0; i < nose.length; i++) {
      const id = parseInt(nose[i].tokenId);
      const infoToken = allnfts[id];
      const objetoJSON = {
        tokenId: parseInt(nose[i].tokenId),
        owner: nose[i].owner,
        price: parseInt(nose[i].price),
        active: nose[i].active,
        name: infoToken.name,
        image: infoToken.image,
        id: infoToken.id,
        type: 'venta',
        description: infoToken.descripcion,
      };
      jsonArray.push(objetoJSON);
    }
    setMyVentas(jsonArray);
  };

  const subirDatos = async (nft) => {
    const jsonString = JSON.stringify(nft);
    window.localStorage.setItem('nft', jsonString);
  };

  useEffect(() => {
    setTipoM('new');
    getnfts();
    const fetch = async () => {
      await getNftAuction();
      await getMyNftAuction();
      await getNftOffers();
      await getNftOwnerOffers();
      await getNftMyOffers();
      await getMyNftPuja();
      await getNftVentas();
      await getMyNftVentas();
    };
    fetch();
  }, []);

  /*useEffect(() => {
    getnfts();
    const fetch = async () => {
      await getNftAuction();
      await getMyNftAuction();
      await getNftOffers();
      await getNftOwnerOffers();
      await getNftMyOffers();
      await getMyNftPuja();
      await getNftVentas();
      //  await getMyNftVentas();
    };
    fetch();
  }, [frenchies]);*/

  const [tipoM, setTipoM] = useState('');

  function cambiartipoM(data) {
    setTipoM(data);
  }
  useEffect(() => {
    setCurrentF(inventoryf);
    setCurrentF2(inventoryf2);
  }, [inventoryf, inventoryf2]);

  useEffect(() => {
    const is = window.localStorage.getItem('wagmi.store');
    const es = JSON.parse(is);

    const si = es.state.data.account;
    if (si != undefined && !isConnect) {
      openModal('WALLET_CONNECT_VIEW');
    }
  }, [isConnect]);

  return (
    <>
      <NextSeo
        title="Explore NTF"
        description="Nft-Sudio powered by Pandorax"
      />
      <div className="grid sm:pt-5 2xl:grid-cols-[280px_minmax(auto,_1fr)] 4xl:grid-cols-[320px_minmax(auto,_1fr)]">
        <div className="hidden border-dashed border-gray-200 ltr:border-r ltr:pr-8 rtl:border-l rtl:pl-8 dark:border-gray-700 2xl:block">
          <Filters ontipom={cambiartipoM} />
        </div>
        <div className="2xl:ltr:pl-10 2xl:rtl:pr-10 4xl:ltr:pl-12 4xl:rtl:pr-12">
          <div className="relative z-10 mb-6 flex items-center justify-between">
            {/*<span className="text-xs font-medium text-gray-900 dark:text-white sm:text-sm">
              5,686,066 items
  </span>*/}

            <div className="flex gap-6 2xl:gap-8">
              {/*<SortList />*/}
              <div className="hidden 3xl:block">{/*<GridSwitcher />*/}</div>
              <div className="hidden sm:block 2xl:hidden">
                <Button
                  shape="rounded"
                  size="small"
                  color="gray"
                  onClick={() => openDrawer('DRAWER_SEARCH')}
                  className="dark:bg-gray-800"
                >
                  Filters
                </Button>
              </div>
            </div>
          </div>
          {Usuario.rol === 'Admin' && (
            <div className=" h-[100%] w-[100%] text-xl">
              <ParamTab
                tabMenu={[
                  {
                    title: 'Mis nfts',
                    path: 'Mis nfts',
                  },
                  {
                    title: 'Todos',
                    path: 'coleccion',
                  },
                  {
                    title: 'Pujas a otros',
                    path: 'Puja',
                  },
                  {
                    title: 'Mis ofertas',
                    path: 'Mis ofertas',
                  },
                  {
                    title: 'Comprar Frenchies',
                    path: 'buy',
                  },
                ]}
              >
                <TabPanel className="focus:outline-none">
                  {tipoM == 'new' && (
                    <div className="ml-6 grid h-full   w-full  grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:gap-6  3xl:grid-cols-3 4xl:grid-cols-3">
                      {currentF2?.map((nft) => (
                        <div key={nft.id} onClick={() => subirDatos(nft)}>
                          <NFTGrid
                            key={nft.name}
                            name={nft.name}
                            image={nft.image}
                            price={nft.precio}
                            number={nft.id}
                            type={'general'}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {mysubastas.length > 0 && tipoM == '' && (
                    <div className="ml-6 grid h-full   w-full  grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:gap-6  3xl:grid-cols-3 4xl:grid-cols-3">
                      {mysubastas?.map((nft) => (
                        <div key={nft.id} onClick={() => subirDatos(nft)}>
                          <NFTGrid
                            key={nft.name}
                            name={nft.name}
                            image={nft.image}
                            price={0}
                            number={nft.id}
                            type={'subasta'}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {myventas.length > 0 && tipoM == 'buy-now' && (
                    <div className="ml-6 grid h-full   w-full  grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:gap-6  3xl:grid-cols-3 4xl:grid-cols-3">
                      {myventas?.map((nft) => (
                        <div key={nft.id} onClick={() => subirDatos(nft)}>
                          <NFTGrid
                            key={nft.name}
                            name={nft.name}
                            image={nft.image}
                            price={0}
                            number={nft.id}
                            type={'venta'}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {offers.length > 0 && tipoM == 'has-offers' && (
                    <div className="ml-6 grid h-full   w-full  grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:gap-6  3xl:grid-cols-3 4xl:grid-cols-3">
                      {offers?.map((nft) => (
                        <div key={nft.id} onClick={() => subirDatos(nft)}>
                          <NFTGrid
                            key={nft.name}
                            name={nft.name}
                            image={nft.image}
                            price={0}
                            number={nft.id}
                            type={'general'}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </TabPanel>
                <TabPanel className="focus:outline-none">
                  {tipoM == 'new' && (
                    <InfiniteScroll
                      dataLength={frenchies2.length}
                      next={fetchMoreItems}
                      hasMore={false}
                      loader={<h4>Loading...</h4>}
                    >
                      <div className="ml-6 grid h-full  w-[98%]  grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:gap-6  3xl:grid-cols-3 4xl:grid-cols-3">
                        {frenchies2?.map((nft) => (
                          <div key={nft.id} onClick={() => subirDatos(nft)}>
                            <NFTGrid
                              key={nft.name}
                              name={nft.name}
                              image={nft.image}
                              price={nft.precio}
                              number={nft.id}
                              type={
                                nft.type != undefined ? nft.type : 'general'
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </InfiniteScroll>
                  )}

                  {tipoM == 'on-auction' && subastas.length > 0 && (
                    <div className="ml-6 grid h-full   w-full  grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:gap-6  3xl:grid-cols-3 4xl:grid-cols-3">
                      {subastas?.map((nft) => (
                        <div key={nft.id} onClick={() => subirDatos(nft)}>
                          <NFTGrid
                            key={nft.name}
                            name={nft.name}
                            image={nft.image}
                            price={0}
                            number={nft.id}
                            type={'subasta'}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {tipoM == 'has-offers' && ofertas.length > 0 && (
                    <div className="ml-6 grid h-full   w-full  grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:gap-6  3xl:grid-cols-3 4xl:grid-cols-3">
                      {ofertas?.map((nft) => (
                        <div key={nft.id} onClick={() => subirDatos(nft)}>
                          <NFTGrid
                            key={nft.name}
                            name={nft.name}
                            image={nft.image}
                            price={0}
                            number={nft.id}
                            type={'general'}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {tipoM == 'buy-now' && _ventas.length > 0 && (
                    <div className="ml-6 grid h-full   w-full  grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:gap-6  3xl:grid-cols-3 4xl:grid-cols-3">
                      {_ventas?.map((nft) => (
                        <div key={nft.id} onClick={() => subirDatos(nft)}>
                          <NFTGrid
                            key={nft.name}
                            name={nft.name}
                            image={nft.image}
                            price={0}
                            number={nft.id}
                            type={'venta'}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </TabPanel>
                <TabPanel className="focus:outline-none">
                  {mypujas.length > 0 && (
                    <div className="ml-6 grid h-full   w-full  grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:gap-6  3xl:grid-cols-3 4xl:grid-cols-3">
                      {mypujas?.map((nft) => (
                        <div key={nft.id} onClick={() => subirDatos(nft)}>
                          <NFTGrid
                            key={nft.name}
                            name={nft.name}
                            image={nft.image}
                            price={0}
                            number={nft.id}
                            type={'general'}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </TabPanel>
                <TabPanel className="focus:outline-none">
                  {offers.length > 0 && (
                    <div className="ml-6 grid h-full   w-full  grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:gap-6  3xl:grid-cols-3 4xl:grid-cols-3">
                      {offers?.map((nft) => (
                        <div key={nft.id} onClick={() => subirDatos(nft)}>
                          <NFTGrid
                            key={nft.name}
                            name={nft.name}
                            image={nft.image}
                            price={0}
                            number={nft.id}
                            type={'general'}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </TabPanel>
                <TabPanel className="h-full focus:outline-none">
                  <div className="h-full flex-col justify-between">
                    <h1 className="mb-[15px] flex justify-center   align-middle text-2xl font-bold">
                      Frenchies Blue
                    </h1>
                    <p className="mb-[15px] flex justify-center align-middle">
                      PRECIO DE VENTA: 0.30 ETH
                    </p>
                    <div className=" mb-[10px] flex  justify-center align-middle">
                      <Image
                        src={Back}
                        alt="wallet"
                        width={300}
                        height={300}
                        className="rounded-none"
                      />
                    </div>

                    <div className="mb-[30px] flex justify-center align-middle">
                      <div className="h-10 w-32 focus:outline-0">
                        <label
                          for="custom-input-number"
                          className="flex w-full justify-center self-center text-sm font-semibold text-gray-700"
                        >
                          Cantidad
                        </label>
                        <div className="relative mt-1 flex h-10 w-full flex-row rounded-lg bg-transparent">
                          <button
                            onClick={() => changeCantidad('-')}
                            data-action="decrement"
                            className=" h-full w-20 cursor-pointer rounded-l bg-gray-300 text-gray-600 outline-none hover:bg-gray-400 hover:text-gray-700"
                          >
                            <span className="m-auto text-2xl font-thin">−</span>
                          </button>
                          <input
                            onChange={(e) => changeCantidadM(e)}
                            className="text-md md:text-basecursor-default flex w-full items-center bg-gray-300 text-center font-semibold text-gray-700  outline-none outline-0 hover:text-black focus:text-black  focus:outline-none"
                            name="custom-input-number"
                            value={cantidad}
                          />
                          <button
                            onClick={() => changeCantidad('+')}
                            data-action="increment"
                            className="h-full w-20 cursor-pointer rounded-r bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-700"
                          >
                            <span className="m-auto text-2xl font-thin">+</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mb-[80px] flex justify-center align-middle">
                      <label htmlFor="">Precio: {precio.toFixed(3)}</label>
                    </div>

                    <div className="flex justify-center align-middle">
                      {/*isConnect &&
                      approvedToken < precio * cantidad - precio * count &&
                      !loading &&
                      cantidad > count &&
                      approvedToken < precio * cantidad - precio * count &&
                    !loading && <Button onClick={approve}>Aprobar</Button>*/}

                      {isConnect && loading && <Button>Cargando...</Button>}

                      {isConnect && !loading && (
                        /*approvedToken >= precio * cantidad - precio * count && */ <Button
                          disabled={cantidad == 0}
                          onClick={buyNft}
                        >
                          Comprar
                        </Button>
                      )}

                      {!isConnect && (
                        <Button
                          onClick={() => openModal('WALLET_CONNECT_VIEW')}
                        >
                          Conectar
                        </Button>
                      )}
                    </div>
                    <div className="mt-4 flex justify-center align-middle">
                      {vendido && (
                        <AnchorLink href={'/profile'}>
                          <Button>ver mis nfts</Button>
                        </AnchorLink>
                      )}
                    </div>

                    <h1 className="flex  justify-center align-middle font-bold">
                      {supply}/10010
                    </h1>
                    <div className="mt-10 flex w-full justify-center align-middle">
                      {status == 200 && (
                        <div
                          className="flex w-[400px] justify-center rounded-lg bg-green-200 p-4 align-middle text-sm text-green-700 dark:bg-green-200 dark:text-green-800"
                          role="alert"
                        >
                          <span className="text-center font-medium">
                            Frenchie obtenido de manera exitosa
                          </span>
                        </div>
                      )}

                      {status == 100 && (
                        <div
                          className="flex w-[400px] justify-center rounded-lg bg-red-200  p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
                          role="alert"
                        >
                          <span className="text-center font-medium">
                            {errormsg}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </TabPanel>
              </ParamTab>
            </div>
          )}
          {Usuario.rol === 'cliente' && (
            <div className=" h-[100%] w-[100%]">
              <ParamTab
                tabMenu={[
                  {
                    title: 'MarketPlace',
                    path: 'MarketPlace',
                  },
                  {
                    title: 'Comprar Frenchies',
                    path: 'buy',
                  },
                ]}
              >
                <TabPanel className="focus:outline-none">
                  <div className="ml-6 grid h-full   w-full  grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:gap-6  3xl:grid-cols-3 4xl:grid-cols-3">
                    Prontamente
                  </div>
                </TabPanel>
                <TabPanel className="h-full focus:outline-none">
                  <div className="h-full flex-col justify-between">
                    <h1 className="mb-[15px] flex justify-center   align-middle text-2xl font-bold">
                      Frenchies Blue
                    </h1>
                    <p className="mb-[15px] flex justify-center align-middle">
                      PRECIO DE VENTA: 0.30 ETH
                    </p>
                    <div className=" mb-[10px] flex  justify-center align-middle">
                      <Image
                        src={Back}
                        alt="wallet"
                        width={300}
                        height={300}
                        className="rounded-none"
                      />
                    </div>

                    <div className="mb-[30px] flex justify-center align-middle">
                      <div className="h-10 w-32 focus:outline-0">
                        <label
                          for="custom-input-number"
                          className="flex w-full justify-center self-center text-sm font-semibold text-gray-700"
                        >
                          Cantidad
                        </label>
                        <div className="relative mt-1 flex h-10 w-full flex-row rounded-lg bg-transparent">
                          <button
                            onClick={() => changeCantidad('-')}
                            data-action="decrement"
                            className=" h-full w-20 cursor-pointer rounded-l bg-gray-300 text-gray-600 outline-none hover:bg-gray-400 hover:text-gray-700"
                          >
                            <span className="m-auto text-2xl font-thin">−</span>
                          </button>
                          <input
                            onChange={(e) => changeCantidadM(e)}
                            className="text-md md:text-basecursor-default flex w-full items-center bg-gray-300 text-center font-semibold text-gray-700  outline-none outline-0 hover:text-black focus:text-black  focus:outline-none"
                            name="custom-input-number"
                            value={cantidad}
                          />
                          <button
                            onClick={() => changeCantidad('+')}
                            data-action="increment"
                            className="h-full w-20 cursor-pointer rounded-r bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-700"
                          >
                            <span className="m-auto text-2xl font-thin">+</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mb-[80px] flex justify-center align-middle">
                      <label htmlFor="">Precios: {precio.toFixed(3)}</label>
                    </div>

                    <div className="flex justify-center align-middle">
                      {/*isConnect &&
                      approvedToken < precio * cantidad - precio * count &&
                      !loading &&
                      cantidad > count &&
                      approvedToken < precio * cantidad - precio * count &&
                    !loading && <Button onClick={approve}>Aprobar</Button>*/}

                      {isConnect && loading && <Button>Cargando...</Button>}

                      {isConnect && !loading && (
                        /*approvedToken >= precio * cantidad - precio * count && */ <Button
                          disabled={cantidad == 0}
                          onClick={buyNft}
                        >
                          Comprar
                        </Button>
                      )}

                      {!isConnect && (
                        <Button
                          onClick={() => openModal('WALLET_CONNECT_VIEW')}
                        >
                          Conectar
                        </Button>
                      )}
                    </div>
                    <div className="mt-4 flex justify-center align-middle">
                      {vendido && (
                        <AnchorLink href={'/profile'}>
                          <Button>ver mis nfts</Button>
                        </AnchorLink>
                      )}
                    </div>

                    <h1 className="flex  justify-center align-middle font-bold">
                      {supply}/10010
                    </h1>
                    <div className="mt-10 flex w-full justify-center align-middle">
                      {status == 200 && (
                        <div
                          className="flex w-[400px] justify-center rounded-lg bg-green-200 p-4 align-middle text-sm text-green-700 dark:bg-green-200 dark:text-green-800"
                          role="alert"
                        >
                          <span className="text-center font-medium">
                            Frenchie obtenido de manera exitosa
                          </span>
                        </div>
                      )}

                      {status == 100 && (
                        <div
                          className="flex w-[400px] justify-center rounded-lg bg-red-200  p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
                          role="alert"
                        >
                          <span className="text-center font-medium">
                            {errormsg}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </TabPanel>
              </ParamTab>
            </div>
          )}
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

Frenchies.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Frenchies;
