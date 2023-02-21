import { useContext, useEffect, useState } from 'react';
import type { NextPageWithLayout } from '@/types';
import cn from 'classnames';
import { NextSeo } from 'next-seo';
import { Transition } from '@/components/ui/transition';
import DashboardLayout from '@/layouts/_dashboard';
import { RadioGroup } from '@/components/ui/radio-group';
import { Listbox } from '@/components/ui/listbox';
import Image from '@/components/ui/image';
import Button from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import Uploader from '@/components/ui/forms/uploader';
import InputLabel from '@/components/ui/input-label';
import ToggleBar from '@/components/ui/toggle-bar';
import { TagIcon } from '@/components/icons/tag-icon';
import { LoopIcon } from '@/components/icons/loop-icon';
import { SandClock } from '@/components/icons/sand-clock';
import { ChevronDown } from '@/components/icons/chevron-down';
import { Ethereum } from '@/components/icons/ethereum';
import { Flow } from '@/components/icons/flow';
import { Warning } from '@/components/icons/warning';
import { Unlocked } from '@/components/icons/unlocked';
import Avatar from '@/components/ui/avatar';
//images
import AuthorImage from '@/assets/images/author.jpg';
import NFT1 from '@/assets/images/nft/nft-1.jpg';
import { MintProducts, MintInversion } from '@/redux/Minted/MintedAction';
import { useDispatch, useSelector } from 'react-redux';
import { getMintedNftProducts } from '../redux/Minted/MintedAction';
import NftSlider from '@/components/ui/nftSlider';
import { WalletContext } from '@/lib/hooks/use-connect';

const StakingPage: NextPageWithLayout = () => {
  //la idea es mostrar los nfts de staking del usuario

  const nftInfo = {
    nombre: '',
    image: '',
    price: '',
    id: 0,
  };

  const [nftSelect, setNftSelect] = useState(nftInfo);
  const [time, setTime] = useState(0);
  const [status, setStatus] = useState(0);

  const [currentItems, setCurrentItems] = useState([]);
  const [currentInv, setCurrentInv] = useState([]);
  const { dataloaded, disponibleNftp, disponibleNfti, priceFormat, MintedNft } =
    useSelector((state: any) => state.minted);
  const dispatch = useDispatch<AppDispatch>();

  const { inversionMinter } = useSelector((state) => state.blockchain);

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

  const getTime = async () => {
    let tipo = await inversionMinter.getTypeOfStaking(nftInfo.id);

    if (tipo === '1Y') {
      setTime(1);
    } else if (tipo == '2Y') {
      setTime(2);
    } else if (tipo == '3Y') {
      setTime(3);
    } else if (tipo == '4Y') {
      setTime(4);
    } else if (tipo == '5Y') {
      setTime(5);
    }
  };

  const Stake = async () => {
    //si no esta referido
    let tx = await inversionMinter.stake(nftInfo.id, time);

    //si esta referido llamar a otra funcion y mandar la wallet del stake
    if (tx.result == 1) {
      //setear la transiccion como correcta
    } else {
      //setear la transacion como incorrecta
    }
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

  /*useEffect(() => {
    getTime();
  }, [nftSelect])*/

  useEffect(() => {
    setTimeout(() => {
      setStatus(0);
    }, 5000);
  }, [status]);

  const { isConnect } = useSelector((state) => state.blockchain);

  const { disconnectWallet } = useContext(WalletContext);

  useEffect(() => {
    if (!isConnect) {
      disconnectWallet();
    }
  }, []);

  return (
    <>
      <NextSeo title="Create NFT" description="Nft-Sudio powered by Pandorax" />
      <div className="mb-8 h-[630px] w-full sm:mb-0 sm:w-1/2 sm:ltr:pr-6 sm:rtl:pl-6 md:w-[100%] lg:w-[100%] 2xl:w-[100%] 3xl:w-[100%]">
        <NftSlider
          nfts={currentInv}
          priceFormat={priceFormat}
          nftInfo={nftInfo}
          setNftInfo={setNftInfo}
          type={'staking'}
        />
      </div>

      <div className="mx-auto w-full px-4 pt-8 pb-14 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8 xl:px-10 2xl:px-0">
        <div className="mb-8 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Name */}
            <div className="mb-8">
              <InputLabel title="Name" important />
              <Input
                type="text"
                placeholder="Item name"
                //onChange={(e) => setNombre(e.target.value)}
                value={nftSelect.nombre}
                disabled
              />
            </div>

            <div className="mb-8">
              <InputLabel title="Id" />
              <Input
                type="text"
                placeholder="https://yourimage.io/item/123"
                //onChange={(e) => setUrl(e.target.value)}
                value={nftSelect.id}
                disabled
              />
            </div>

            {/* External link */}
            <div className="mb-8">
              <InputLabel title="Tiempo de staking" />
              <Input
                type="text"
                placeholder="0"
                //onChange={(e) => setUrl(e.target.value)}
                value={'5 Años'}
                disabled
              />
            </div>

            <div className="mb-8">
              <InputLabel title="APR" />
              <Input
                type="text"
                placeholder="0"
                //onChange={(e) => setUrl(e.target.value)}
                value={'10%'}
                disabled
              />
            </div>

            <div className="mb-8">
              <div className="mb-8">
                <div className="relative">
                  {/*<Listbox value={tipo} onChange={setTipo}>
                    <Listbox.Button className="text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5">
                      <div className="flex items-center">

                        {/*tipo.name}
                        ""
                      </div>
                      <ChevronDown />
                    </Listbox.Button>
                    <Transition
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute left-0 z-10 mt-1 grid w-full origin-top-right gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-gray-700 dark:bg-gray-800 xs:p-2">
                        {NftsOptions.map((option) => (
                          <Listbox.Option key={option.id} value={option}>
                            {({ selected }) => (
                              <div
                                className={`flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100  ${
                                  selected
                                    ? 'bg-gray-200/70 font-medium dark:bg-gray-600/60'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-700/70'
                                }`}
                              >
                                <span className="ltr:mr-2 rtl:ml-2">
                                  {option.icon}
                                </span>
                                {option.name}
                              </div>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </Listbox>*/}
                </div>
              </div>

              {1 === 0 && (
                <Button shape="rounded" onClick={() => Stake()}>
                  Stake
                </Button>
              )}

              {1 === 1 && (
                <Button shape="rounded" onClick={() => Stake()}>
                  Approve
                </Button>
              )}
            </div>
          </div>

          <div className="hidden flex-col lg:flex">
            {/* NFT preview */}
            <InputLabel title="Preview" />
            <div className="relative flex flex-grow flex-col overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark">
              <div className="relative block w-full pb-full">
                <Image
                  src={nftSelect.image}
                  layout="fill"
                  objectFit="cover"
                  alt="Pulses of Imagination #214"
                />
              </div>
              <div className="p-5">
                <div className="text-sm font-medium text-black dark:text-white">
                  {nftSelect.nombre}
                </div>
                <div className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                  {nftSelect.price} USDT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {status == 200 && (
        <div
          className="mb-4 ml-[580px] mt-[30px] flex w-[300px] justify-center self-center rounded-lg bg-green-200 p-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          <span className="text-center font-medium">
            Usuario creado correctamente
          </span>
        </div>
      )}

      {status == 100 && (
        <div
          className="mb-4 ml-[580px] mt-[30px] w-[300px] justify-center self-center rounded-lg bg-red-200  p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          <span className="text-center font-medium">
            operacion fallo en el minteo
          </span>
        </div>
      )}
    </>
  );
};

StakingPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default StakingPage;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
