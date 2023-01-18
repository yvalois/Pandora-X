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
import { getMintedNftProducts } from '../redux/Minted/MintedAction';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import { number } from 'yup';
import NftSlider from '@/components/ui/nftSlider';
import Image from '@/components/ui/image';
import { Verified } from '@/components/icons/verified';
import styled from 'styled-components';
import ActiveLink from '@/components/ui/links/active-link';
import { ethers } from 'ethers';
import validator from 'validator';
import frenchiesAbi from '../abi/FrenchiesBlues.json';

import { connectWallet, uFrench } from '../redux/Blockchain/blockchainAction';
import { useAccount, useProvider, useSigner } from 'wagmi';
import { useModal as hola } from 'connectkit';
import { useModal } from '@/components/modal-views/context';
import { WalletContext } from '@/lib/hooks/use-connect';
import AnchorLink from '@/components/ui/links/anchor-link';

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

function Status() {
  let [plan, setPlan] = useState('buy-now');

  return (
    <RadioGroup
      value={plan}
      onChange={setPlan}
      className="grid grid-cols-2 gap-2 p-5"
    >
      <RadioGroup.Option value="buy-now">
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
              checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            Comprar
          </span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="on-auction">
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
      <RadioGroup.Option value="new">
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
              checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            Nuevos
          </span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="has-offers">
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

function Filters() {
  return (
    <>
      <Collapse label="Status" initialOpen>
        <Status />
      </Collapse>
      <Collapse label="Price Range" initialOpen>
        <PriceRange />
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
  const a = {
    numb: 0,
    tipo: '',
  };

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
  } = useSelector((state) => state.blockchain);

  const valor = 0.3;

  const { referidor } = useSelector((state) => state.Usuario);

  const { data: signer, isError, isLoading: arroz } = useSigner();

  const verifyApprove = async () => {
    try {
      const usdt = await tokenContract.allowance(
        accountAddress,
        frenchiesMinter.address
      ); //MarketPlace
      //setApprovedUsdt(ethers.utils.formatUnits(usdt, 18));
      setApprovedToken(ethers.utils.formatUnits(usdt, 6));
      setPan(false);
      setPan(true);
    } catch (e) {
      console.log(e);
      setPan(false);
      setPan(true);
    }
  };

  const approve = async () => {
    setLoading(true);

    try {
      setTokenAddress(tokenContract.address);

      const decimals = 6;
      const tx = await tokenContract.approve(
        frenchiesMinter.address,
        ethers.utils.parseUnits('1000', decimals)
      );

      console.log(tx);

      await tx.wait();
      await verifyApprove();
      setLoading(false);
      setPan(false);
      setPan(true);
    } catch (e) {
      setLoading(false);
      console.log(e);
      setPan(false);
      setPan(true);
    }
  };

  const buyNft = async () => {
    setLoading(true);

    try {
      if (count - multiplicador >= 0) {
        const options = {
          value: ethers.utils.parseUnits('0', 'ether'),
        };

        const tx = await frenchiesMinter.buyToken(cantidad, options);

        await tx.wait(); //tener en cuenta para los proximos cambios
        dispatch(uFrench(provider, accountAddress));
        setStatus(200);
        setVendido(true);
        setCantidad(cantidad - cantidad);
        setApprovedToken(0);
        setearSupply();
        verifyApprove();
        if (count > 0) {
          setCount(count - multiplicador);
          setMultiplicador(0);
          setCantidad(0);
          setPrecio(0);
        } else {
          setMultiplicador(0);
          setCantidad(0);
          setPrecio(0);
        }
      } else {
        const options = {
          value: ethers.utils.parseUnits(
            (0.3 * (multiplicador - count)).toString(),
            'ether'
          ),
        };
        const tx = await frenchiesMinter.buyToken(cantidad, options);

        await tx.wait(); //tener en cuenta para los proximos cambios
        dispatch(uFrench(provider, accountAddress));
        setStatus(200);
        setVendido(true);
        setCantidad(cantidad - cantidad);
        setApprovedToken(0);
        setearSupply();
        verifyApprove();
        if (count > 0) {
          setCount(count - multiplicador);
          setMultiplicador(0);
          setCantidad(0);
          setPrecio(0);
        } else {
          setMultiplicador(0);
          setCantidad(0);
          setPrecio(0);
        }
      }
    } catch (err) {
      setLoading(false);
      setStatus(100);
      setErrorMSG('Error en el minteo');
    }
  };

  const abrir = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (!arroz && signer !== undefined) {
      console.log(signer);
      dispatch(connectWallet(address, provider, signer));

      setOpen(false);
    }
  }, [signer, arroz]);

  const getWhithelist = async () => {
    setLoading(true);

    const w = await frenchiesMinter.getWhitelist();
    if (w == true) {
      const c = await frenchiesMinter.getCountWl();
      setCount(c);

      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  /*  const { disconnectWallet } = useContext(WalletContext);
  useEffect(() => {
    if (!isConnect) {
      disconnectWallet();
    }
  }, []); */

  useEffect(() => {
    if (isConnect) {
      verifyApprove();
      setearSupply();
      verifyApprove();
      getWhithelist();
    }
  }, [pan]);
  useEffect(() => {
    if (isConnect) {
      verifyApprove();
      setearSupply();
      verifyApprove();
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
    setLoading(true);

    const frenchiesMinterContract = new ethers.Contract(
      '0x32bfb6790B3536a7269185278B482A0FA0385362',
      frenchiesAbi,
      provider
    );
    const supp = await frenchiesMinterContract.totalSupply();
    setLoading(false);

    setSupply(parseInt(supp));
  };

  useEffect(() => {
    setTimeout(() => {
      if (status != 0) {
        setStatus(0);
      }
    }, 3000);
  }, [status]);

  return (
    <>
      <NextSeo
        title="Explore NTF"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <div className="grid sm:pt-5 2xl:grid-cols-[280px_minmax(auto,_1fr)] 4xl:grid-cols-[320px_minmax(auto,_1fr)]">
        <div className="hidden border-dashed border-gray-200 ltr:border-r ltr:pr-8 rtl:border-l rtl:pl-8 dark:border-gray-700 2xl:block">
          <Filters />
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
          <div className=" h-[100%] w-[100%]">
            <ParamTab
              tabMenu={[
                {
                  title: 'NFT MarketPlace',
                  path: 'coleccion',
                },
                {
                  title: 'Frenchies',
                  path: 'buy',
                },
              ]}
            >
              <TabPanel className="focus:outline-none">
                <div>Pronto</div>
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
                      src={
                        'https://aqua-many-alpaca-308.mypinata.cloud/ipfs/QmTky2X6pewiEtnxtNcXXLrmcZ84jjAoB1NWAtbszxpcLG'
                      }
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
                    <label htmlFor="">Precio: {precio.toFixed(1)}</label>
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
                      <Button onClick={() => openModal('WALLET_CONNECT_VIEW')}>
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
                        <span className="font-medium">
                          Frenchie obtenido de manera exitosa
                        </span>
                      </div>
                    )}

                    {status == 100 && (
                      <div
                        className="flex w-[400px] justify-center rounded-lg bg-red-200  p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
                        role="alert"
                      >
                        <span className="font-medium">{errormsg}</span>
                      </div>
                    )}
                  </div>
                </div>
              </TabPanel>
            </ParamTab>
          </div>
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
