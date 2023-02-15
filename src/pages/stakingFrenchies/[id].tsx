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
import { router } from 'next/router';
import AnchorLink from '@/components/ui/links/anchor-link';
import { uFrench, uStakingF } from '@/redux/Blockchain/blockchainAction';

const StakingFPage: NextPageWithLayout = () => {
  //la idea es mostrar los nfts de staking del usuario

  const nftInfo = {
    nombre: '',
    img: '',
    precio: 0,
    descripcion: '',
    id: 0,
  };

  const [nftSelect, setNftSelect] = useState(nftInfo);
  const [time, setTime] = useState(0);
  const [status, setStatus] = useState(0);
  const { dataloaded, disponibleNftp, disponibleNfti, priceFormat, MintedNft } =
    useSelector((state: any) => state.minted);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const { frenchiesMinter, stakingfrenEContract, accountAddress } = useSelector(
    (state) => state.blockchain
  );
  const [ap, setAp] = useState(false);
  const Usuario = useSelector((state: any) => state.Usuario);
  const [profile, setProfile] = useState(false);
  const [id, setID] = useState(0);
  const [errorMSG, setErrorMSG] = useState('');

  const setNftInfo = (_nombre, _image, _price, _id) => {
    setNftSelect((prevState) => ({ ...prevState, nombre: _nombre }));
    setNftSelect((prevState) => ({ ...prevState, image: _image }));
    setNftSelect((prevState) => ({ ...prevState, price: _price }));
    setNftSelect((prevState) => ({ ...prevState, id: _id }));
  };

  const verifyApproved = async () => {
    const address = await frenchiesMinter.getApproved(nftInfo.id);
    if (address.toLowerCase() == stakingfrenEContract.address.toLowerCase()) {
      setAp(true);
    }
  };

  const Stake = async () => {
    //si no esta referido
    setLoading(true);
    try {
      const fecha = new Date(),
        y = fecha.getFullYear(),
        m = fecha.getMonth();
      const firstDay = new Date(y, m, 1);
      const paidDay = new Date(y, m + 2, 5);

      //const lastDay =new Date(y,m + 2,0)
      const f = firstDay.toLocaleDateString();
      const pd = paidDay.toLocaleDateString();
      const value = {
        address: accountAddress,
        id: id,
        fecha: f,
        fechap: pd,
      };

      let tx = await stakingfrenEContract.stake(id);
      await tx.wait();

      console.log(tx);
      fetch(`${process.env.BACKEND_API}/crearstaking`, {
        method: 'POST',
        body: JSON.stringify(value),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setTimeout(() => {
        //dispatch(uStakingF(accountAddress));
        dispatch(uFrench(accountAddress));
        setStatus(200);
        setAp(false);
        setProfile(true);
        setLoading(false);
      }, 10000);
    } catch (err) {
      setLoading(false);
      setStatus(100);
      const mess = err.message.split('[');
      //const messa = mess[1].split(":")
      //const messag = messa[3].split(",")
      //const messag_ = messag[0].split("-")
      const rejected = mess[0].split(' ');
      if (mess[0] == 'insufficient funds for intrinsic transaction cost ') {
        setErrorMSG('Fondos insuficientes');
      } else if (rejected[0] == 'user' && rejected[1] == 'rejected') {
        setErrorMSG('Transacion rechazada');
      } else {
        setErrorMSG('Error');
      }
      //
    }
  };

  const approve = async () => {
    setLoading(true);
    try {
      let tx = await frenchiesMinter.approve(stakingfrenEContract.address, id);

      await tx.wait();
      verifyApproved();
      setLoading(false);
      setStatus(200);
    } catch (err) {
      setLoading(false);
      setStatus(100);
      const mess = err.message.split('[');
      //const messa = mess[1].split(":")
      //const messag = messa[3].split(",")
      //const messag_ = messag[0].split("-")
      const rejected = mess[0].split(' ');
      if (mess[0] == 'insufficient funds for intrinsic transaction cost ') {
        setErrorMSG('Fondos insuficientes');
      } else if (rejected[0] == 'user' && rejected[1] == 'rejected') {
        setErrorMSG('Transacion rechazada');
      } else {
        setErrorMSG('Error');
      }
      //
    }
  };

  const { inventoryf } = useSelector((state: any) => state.blockchain);

  useEffect(() => {
    //router.query.id
    const id = router.query.id;
    setID(id);
    inventoryf.map((inv) => {
      if (inv.id == id) {
        setNftSelect(inv);
      }
    });
  }, []);

  const { isConnect } = useSelector((state) => state.blockchain);

  const { disconnectWallet } = useContext(WalletContext);
  useEffect(() => {
    if (!isConnect) {
      disconnectWallet();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (status != 0) {
        setStatus(0);
      }
    }, 3000);
  }, [status]);

  useEffect(() => {
    if (
      Usuario.rol !== 'Admin' &&
      Usuario.rol !== 'usuario' &&
      Usuario.rol !== 'cliente'
    ) {
      window.location.href = '/';
    }
  });

  return (
    <>
      <NextSeo
        title="Create NFT"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />

      <div className="mx-auto w-full px-4 pt-8 pb-14 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8 xl:px-10 2xl:px-0">
        <div className="mb-8 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Name */}
            <div className="mb-8">
              <InputLabel title="Name" important />
              <Input
                type="text"
                placeholder="Item name"
                value={nftSelect.Nombre}
                disabled
              />
            </div>

            <div className="mb-8">
              <InputLabel title="Id" />
              <Input
                type="text"
                placeholder="https://yourimage.io/item/123"
                value={nftSelect.id}
                disabled
              />
            </div>

            <div className="mb-8">
              <div className="mb-8">
                <div className="relative"></div>
              </div>

              {ap && !loading && !profile && (
                <Button shape="rounded" onClick={() => Stake()}>
                  Stake
                </Button>
              )}
              {loading && <Button>Cargando...</Button>}

              {!ap && !loading && !profile && (
                <Button shape="rounded" onClick={() => approve()}>
                  Approve
                </Button>
              )}

              {profile && !loading && (
                <AnchorLink href="/profile">
                  <Button shape="rounded">Ir a perfil</Button>
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
                  src={nftSelect.img}
                  layout="fill"
                  objectFit="cover"
                  alt="Pulses of Imagination #214"
                />
              </div>
              <div className="p-5">
                <div className="text-sm font-medium text-black dark:text-white">
                  {nftSelect.Nombre}
                </div>
                <div className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                  {nftSelect.precio} USDT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {status == 200 && (
        <div
          className="mb-4 ml-[580px]  flex w-[500px] justify-center self-center rounded-lg bg-green-200 p-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          <span className="text-center font-medium">
            Transaccion completada correctamen
          </span>
        </div>
      )}

      {status == 100 && (
        <div
          className="mb-4 ml-[580px]  flex w-[500px] justify-center self-center rounded-lg bg-red-200  p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          <span className="text-center font-medium">{errorMSG}</span>
        </div>
      )}
    </>
  );
};

StakingFPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default StakingFPage;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
