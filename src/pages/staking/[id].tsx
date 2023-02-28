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
    name: '2 Años (APR 36%)',
    value: 2,
    //icon: <Flow />,
  },
  {
    id: 3,
    name: '3 Años (APR 42%)',
    value: 3,
    //icon: <Flow />,
  },
  {
    id: 4,
    name: '4 años (APR 48%)',
    value: 4,
    //icon: <Flow />,
  },
  {
    id: 5,
    name: '5 Años (APR 54%)',
    value: 5,
    //icon: <Flow />,
  },
];

const StakingPage: NextPageWithLayout = () => {
  const initDate = [
    1669870800, 1672549200, 1675227600, 1677646800, 1680325200, 1682917200,
    1685595600, 1688187600, 1690866000, 1693544400, 1696136400, 1698814800,
    1701406800, 1704085200, 1706763600, 1709269200, 1711947600, 1714539600,
    1717218000, 1719810000, 1722488400, 1725166800, 1727758800, 1730437200,
    1733029200, 1735707600, 1738386000, 1740805200, 1743483600, 1746075600,
    1748754000, 1751346000, 1754024400, 1756702800, 1759294800, 1761973200,
    1764565200, 1767243600, 1769922000, 1772341200, 1775019600, 1777611600,
    1780290000, 1782882000, 1785560400, 1788238800, 1790830800, 1793509200,
    1796101200, 1798779600, 1801458000, 1803877200, 1806555600, 1809147600,
    1811826000, 1814418000, 1817096400, 1819774800, 1822366800, 1825045200,
    1827637200,
  ];

  const findInd = () => {
    let now = new Date();
    var resultInSeconds = now.getTime() / 1000;

    for (let i = 0; i < initDate.length; i++) {
      if (resultInSeconds > initDate[i] && resultInSeconds < initDate[i + 1]) {
        return i + 1;
      }
    }
  };

  const nftInfo = {
    nombre: '',
    image: '',
    price: '',
    id: 0,
  };

  const [nftSelect, setNftSelect] = useState(nftInfo);
  const [time, setTime] = useState(0);
  const [status, setStatus] = useState(0);
  const { openModal } = useModal();
  const [currentItems, setCurrentItems] = useState([]);
  const [currentInv, setCurrentInv] = useState([]);
  const [approvedToken, setApprovedToken] = useState(false);
  let [tipoStak, setTipoStak] = useState(stakingOption[0]);
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [id, setId] = useState(0);
  const [success, setSuccess] = useState(false);
  const [errormsg, setErrorMSG] = useState('');

  const { inventoryi, chainId } = useSelector((state: any) => state.blockchain);
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
    const isap = await inversionMinter.isApprovedForAll(
      accountAddress,
      staking.address
    ); //MarketPlace

    //setApprovedUsdt(ethers.utils.formatUnits(usdt, 18));
    if (isap == true) {
      setApprovedToken(true);
    } else {
    }
  };

  const Approve = async () => {
    try {
      if (chainId == 137) {
        setLoading(true);
        const tx = await inversionMinter.setApprovalForAll(
          staking.address,
          'true'
        );

        await tx.wait();
        await verifyApprove();
        setAlertMsg('Aprobado');
        setLoading(false);
      } else {
        openModal('NETWORK_VIEW');
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setStatus(100);
      const mess = err.message.split('[');
      //const messa = mess[1].split(":")
      //const messag = messa[3].split(",")
      //const messag_ = messag[0].split("-")
      const rejected = mess[0].split(' ');

      if (mess[0] == 'insufficient funds for intrinsic transaction cost ') {
        setAlertMsg('Fondos insuficientes');
      } else if (rejected[0] == 'user' && rejected[1] == 'rejected') {
        setAlertMsg('Transacion rechazada');
      } else {
        setAlertMsg('Error');
      }
      //
    }
  };

  const Stake = async () => {
    if (chainId == 137) {
      try {
        setLoading(true);
        const indice = findInd();
        const Contra = process.env.NEXT_PUBLIC_BACKEND_CONS;
        let tx = await staking.stake(id, tipoStak.value, indice, Contra);

        await tx.wait();
        dispatch(uInvertion(accountAddress));
        dispatch(uStaking(accountAddress));

        //redirigir a tabla
        setLoading(false);
        setApprovedToken(false);
        setStatus(200);
        setSuccess(true);
        setAlertMsg('Nft stakeado correctamente');
      } catch (err) {
        console.log(err);
        setLoading(false);
        setStatus(100);
        const mess = err.message.split('[');
        const errValor = mess[1].split('"');

        //const messa = mess[1].split(":")
        //const messag = messa[3].split(",")
        //const messag_ = messag[0].split("-")
        const rejected = mess[0].split(' ');

        if (mess[0] == 'insufficient funds for intrinsic transaction cost ') {
          setAlertMsg('Fondos insuficientes');
        } else if (rejected[0] == 'user' && rejected[1] == 'rejected') {
          setAlertMsg('Transacion rechazada');
        } else if (errValor[1] == 'execution reverted: valor incorrecto') {
          setAlertMsg('Los años sobrepasan la maxima cantidad de staking');
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

  useEffect(() => {
    if (Usuario.rol !== 'Admin' && Usuario.rol !== 'usuario') {
      window.location.href = '/';
    }
  });

  useEffect(() => {
    openModal('STAKING_VIEW');
  }, []);

  useEffect(() => {
    verifyApprove();
  }, []);

  return (
    <>
      <NextSeo title="Staking" description="Nft-Sudio powered by Pandorax" />

      <div className="mx-auto w-full px-4 pt-8 pb-14 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8 xl:px-10 2xl:px-0">
        <div className="w-full flex-col md:hidden  ">
          {/* NFT preview */}
          <InputLabel title="Preview" />
          <div className="relative w-full flex-grow flex-col   overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark xs:w-[60%] md:w-[40%]">
            <div className="relative  w-full pb-full">
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

        <div className="md:grid md:grid-cols-3 md:gap-12 lg:grid-cols-3">
          <div className="  md:col-span-2">
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

            <div className="mb-8 flex justify-center md:block">
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
                <AnchorLink href="/profile">
                  <Button shape="rounded">Ir al perfil</Button>
                </AnchorLink>
              )}
            </div>
          </div>

          <div className="hidden flex-col md:flex">
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

      <div className="mt-[-70px] flex w-full justify-center align-middle md:mt-0">
        {status == 200 && (
          <div
            className="flex w-[400px] justify-center rounded-lg bg-green-200 p-4 align-middle text-sm text-green-700 dark:bg-green-200 dark:text-green-800"
            role="alert"
          >
            <span className="text-center font-medium">{alertMsg}</span>
          </div>
        )}

        {status == 100 && (
          <div
            className="flex w-[400px] justify-center rounded-lg bg-red-200  p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
            role="alert"
          >
            <span className="text-center font-medium">{alertMsg}</span>
          </div>
        )}
      </div>
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
