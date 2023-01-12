import { useEffect, useState } from 'react';
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
import { getMintedNftProducts } from '../../redux/Minted/MintedAction';
import NftSlider from '@/components/ui/nftSlider';
import router from 'next/router';
import { setISODay } from 'date-fns';
import { uStaking, uInvertion } from '../../redux/Blockchain/blockchainAction';
import AnchorLink from '@/components/ui/links/anchor-link';
import { useModal } from '@/components/modal-views/context';
import { useAccount, useProvider } from 'wagmi';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const stakingOption = [
  {
    id: 1,
    name: '1 Año (APR 30%)',
    value: 1,
    //icon: <Ethereum />,
  },
  {
    id: 2,
    name: '2 Año (APR 36%)',
    value: 2,
    //icon: <Flow />,
  },
  {
    id: 3,
    name: '3 Año (APR 42%)',
    value: 3,
    //icon: <Flow />,
  },
  {
    id: 4,
    name: '4 año (APR 48%)',
    value: 4,
    //icon: <Flow />,
  },
  {
    id: 5,
    name: '5 Año (APR 54%)',
    value: 5,
    //icon: <Flow />,
  },
];

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
  const [status, setStatus] = useState(false);
  const { openModal } = useModal();
  const [currentItems, setCurrentItems] = useState([]);
  const [currentInv, setCurrentInv] = useState([]);
  const [approvedToken, setApprovedToken] = useState(false);
  let [tipoStak, setTipoStak] = useState(stakingOption[0]);
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [id, setId] = useState(0);
  const [success, setSuccess] = useState(false);
  const { inventoryi } = useSelector((state: any) => state.blockchain);
  const nftdata = {
    Nombre: '',
    img: '',
    precio: 0,
    tipo: '',
    descripcion: '',
    id: 0,
  };

  const provider = useProvider();
  const { address } = useAccount();

  const [type, setType] = useState('');
  const [nft, setNft] = useState(nftdata);

  const { dataloaded, disponibleNftp, disponibleNfti, priceFormat, MintedNft } =
    useSelector((state: any) => state.minted);

  const dispatch = useDispatch<AppDispatch>();

  const { inversionMinter, staking, accountAddress } = useSelector(
    (state) => state.blockchain
  );

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
  const Usuario = useSelector((state: any) => state.Usuario);

  const verifyApprove = async () => {
    const isap = await inversionMinter.getApproved(id); //MarketPlace
    //setApprovedUsdt(ethers.utils.formatUnits(usdt, 18));
    if (isap == staking.address) {
      setApprovedToken(true);
    } else {
    }
  };

  const Approve = async () => {
    setLoading(true);
    const tx = await inversionMinter.approve(staking.address, id);

    await tx.wait();
    await verifyApprove();
    setLoading(false);
  };

  const Stake = async () => {
    setLoading(true);
    //si no esta referido

    let tx = await staking.stake(id, tipoStak.value);
    //  .send({ gas: '1000000', gasPrice: '2000000000', from: accountAddress });

    await tx.wait();
    dispatch(uInvertion(provider, address));
    dispatch(uStaking());

    //redirigir a tabla
    setLoading(false);
    setApprovedToken(false);
    setStatus(true);
    setSuccess(true);
    setAlertMsg('Nft stakeado correctamente');

    /*if (!Usuario.isReferido && Usuario.type == 'blockMaker') {

    }else{

        const tx = await productoMinter.buyToken(
          tipoN,
          usdtContract.address)

    }*/
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
      setStatus(false);
    }, 5000);
  }, [status]);

  useEffect(() => {
    //router.query.id
    const id = router.query.id;
    setId(id);
    inventoryi.map((inv) => {
      if (inv.id == id) {
        setNft(inv);
      }
    });
  }, []);

  /*useEffect(() => {
    if (
      Usuario.rol !== 'Admin' &&
      Usuario.rol !== 'usuario' &&
      Usuario.rol !== 'cliente'
    ) {
      window.location.href = '/';
    }
  });*/

  useEffect(() => {
    openModal('STAKING_VIEW');
  }, []);

  return (
    <>
      <NextSeo
        title="Staking"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <div className="mb-4 h-[100px] w-full sm:mb-0 sm:w-1/2 sm:ltr:pr-6 sm:rtl:pl-6 md:w-[100%] lg:w-[100%] 2xl:w-[100%] 3xl:w-[100%]"></div>

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
                value={nft.Nombre}
                disabled
              />
            </div>

            <div className="mb-8">
              <InputLabel title="Id" />
              <Input
                type="text"
                placeholder="https://yourimage.io/item/123"
                //onChange={(e) => setUrl(e.target.value)}
                value={nft.id}
                disabled
              />
            </div>

            {/* External link */}
            <div className="mb-8">
              <InputLabel title="Categoria" />
              <div className="relative">
                <Listbox value={tipoStak} onChange={setTipoStak}>
                  <Listbox.Button className="text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5">
                    <div className="flex items-center">
                      {/*<span className="ltr:mr-2 rtl:ml-2">{tipo.icon}</span>*/}
                      {tipoStak.name}
                    </div>
                    <ChevronDown />
                  </Listbox.Button>
                  <Transition
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute left-0 z-10 mt-1 grid w-full origin-top-right gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-gray-700 dark:bg-gray-800 xs:p-2">
                      {stakingOption.map((option) => (
                        <Listbox.Option key={option.id} value={option}>
                          {({ selected }) => (
                            <div
                              className={`flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100  ${
                                selected
                                  ? 'bg-gray-200/70 font-medium dark:bg-gray-600/60'
                                  : 'hover:bg-gray-100 dark:hover:bg-gray-700/70'
                              }`}
                            >
                              {option.name}
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </Listbox>
              </div>
            </div>

            <div className="mb-8">
              <div className="mb-8"></div>

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

              {!success && approvedToken == true && !loading && (
                <Button shape="rounded" onClick={() => Stake()}>
                  Staking
                </Button>
              )}

              {!success && approvedToken == false && !loading && (
                <Button shape="rounded" onClick={() => Approve()}>
                  Aprobar
                </Button>
              )}

              {success && (
                <AnchorLink href="/">
                  <Button shape="rounded">Ir Inicio</Button>
                </AnchorLink>
              )}
            </div>
          </div>

          <div className="hidden flex-col lg:flex">
            {/* NFT preview */}
            <InputLabel title="Preview" />
            <div className="relative flex flex-grow flex-col overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark">
              <div className="relative block w-full pb-full">
                <Image
                  src={nft.img}
                  layout="fill"
                  objectFit="cover"
                  alt="Pulses of Imagination #214"
                />
              </div>
              <div className="p-5">
                <div className="text-sm font-medium text-black dark:text-white">
                  {nft.Nombre}
                </div>
                <div className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                  {nft.precio} USDT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {status && (
        <div
          className="mb-4 ml-[580px] mt-[-90px] flex w-[300px] justify-center self-center rounded-lg bg-green-200 p-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          <span className="font-medium">{alertMsg}</span>
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
export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};
