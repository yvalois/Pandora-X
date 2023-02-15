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
import NftSlider from '@/components/ui/nftSlider-french';
import { WalletContext } from '@/lib/hooks/use-connect';
import AnchorLink from '@/components/ui/links/anchor-link';
import { uFrench, uStakingF } from '@/redux/Blockchain/blockchainAction';
import { useModal } from '@/components/modal-views/context';
import NFTGrids from '@/components/ui/nft-card-s';

const StakePage: NextPageWithLayout = () => {
  const nftInfo = {
    nombre: '',
    image: '',
    precio: 0,
    descripcion: '',
    id: 0,
    selec: false,
  };

  const [time, setTime] = useState(0);
  const [status, setStatus] = useState(0);
  const { dataloaded, disponibleNftp, disponibleNfti, priceFormat, MintedNft } =
    useSelector((state: any) => state.minted);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const { frenchiesMinter, stakingfrenEContract, accountAddress, chainId } =
    useSelector((state) => state.blockchain);
  const [ap, setAp] = useState(false);
  const Usuario = useSelector((state: any) => state.Usuario);
  const [profile, setProfile] = useState(false);
  const [id, setID] = useState(0);
  const [errorMSG, setErrorMSG] = useState('');
  const [currentF, setCurrentF] = useState([]);
  const [cant, setCant] = useState(0);
  const [stak, setStak] = useState(true);
  const [nftSelects, setNftSelects] = useState([]);
  const [allSelect, setAllSelect] = useState(false);
  const [totalStaking, setTotalStaking] = useState(0);
  const [tvl, setTvl] = useState('01');
  const { openModal, closeModal } = useModal();

  let auxNFT = [];

  const getTvl = async () => {
    fetch(`${process.env.BACKEND_API}/getTvl`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setTvl(response.Tvl);
      })
      .catch((error) => console.error('Error:', error));
  };

  const setNftSelect = (nfts) => {
    let auxNFT1 = [];
    let i = 0;
    if (currentF.length != 0) {
      currentF.map((item) => {
        if (nfts == item.id) {
          if (item.select == false) {
            const nftInfo = {
              nombre: item.nombre,
              image: item.image,
              precio: item.precio,
              descripcion: item.descripcion,
              id: item.id,
              select: true,
            };

            setCant(cant + 1);
            setStak(false);
            auxNFT1.push(nftInfo);
          } else {
            const nftInfo = {
              nombre: item.nombre,
              image: item.image,
              precio: item.precio,
              descripcion: item.descripcion,
              id: item.id,
              select: false,
            };
            setCant(cant - 1);
            auxNFT1.push(nftInfo);
            if (cant <= 0) {
              setStak(true);
            }
          }
        } else {
          const nftInfo = {
            nombre: item.nombre,
            image: item.image,
            precio: item.precio,
            descripcion: item.descripcion,
            id: item.id,
            select: item.select,
          };
          auxNFT1.push(nftInfo);
        }

        if (i == currentF.length - 1) {
          let auxSelect = [];
          setCurrentF(auxNFT1);
          let i = 0;
          auxNFT1.map((item) => {
            if (item.select == true) {
              auxSelect.push(item.id);
            }
            if (i == auxNFT1.length - 1) {
              setNftSelects(auxSelect);
            }
            i++;
          });
          auxNFT1 = [];
        }
        i++;
      });
    }
  };

  const selectAll = () => {
    let auxNFT1 = [];
    let i = 0;
    if (!allSelect) {
      currentF.map((item) => {
        const nftInfo = {
          nombre: item.nombre,
          image: item.image,
          precio: item.precio,
          descripcion: item.descripcion,
          id: item.id,
          select: true,
        };

        setCant(currentF.length);
        setStak(false);
        auxNFT1.push(nftInfo);
        if (i == currentF.length - 1) {
          let auxSelect = [];
          setCurrentF(auxNFT1);
          let i = 0;
          auxNFT1.map((item) => {
            if (item.select == true) {
              auxSelect.push(item.id);
            }
            if (i == auxNFT1.length - 1) {
              setNftSelects(auxSelect);
            }
            i++;
          });
          auxNFT1 = [];
          setAllSelect(true);
        }
        i++;
      });
    } else {
      currentF.map((item) => {
        const nftInfo = {
          nombre: item.nombre,
          image: item.image,
          precio: item.precio,
          descripcion: item.descripcion,
          id: item.id,
          select: false,
        };

        setCant(cant + 1);
        setStak(false);
        auxNFT1.push(nftInfo);
        if (i == currentF.length - 1) {
          let auxSelect = [];
          setCurrentF(auxNFT1);
          let i = 0;
          auxNFT1.map((item) => {
            if (item.select == true) {
              auxSelect.push(item.id);
            }
            if (i == auxNFT1.length - 1) {
              setNftSelects(auxSelect);
            }
            i++;
            setAllSelect(false);
            setCant(0);
          });
          auxNFT1 = [];
        }
        i++;
      });
    }
  };
  const Stake = async () => {
    //si no esta referido
    if (chainId == 1) {
      setLoading(true);
      try {
        let tx = await stakingfrenEContract.stake(nftSelects);
        await tx.wait();

        for (let i = 0; i < nftSelects.length; i++) {
          const fecha = new Date(),
            y = fecha.getFullYear(),
            m = fecha.getMonth();
          const ld = new Date(y, m + 2, 0);
          const firstDay = new Date(y, m + 1, 1);
          const paidDay = new Date(y, m + 2, 5);

          //const lastDay =new Date(y,m + 2,0)
          ///const f = firstDay.toLocaleDateString()
          //const pd = paidDay.toLocaleDateString()
          const value = {
            address: accountAddress,
            id: nftSelects[i],
            fecha: firstDay,
            fechald: ld,
            fechap: paidDay,
          };
          fetch(`${process.env.BACKEND_API}/crearstaking`, {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (i == nftSelects.length - 1) {
            setTimeout(() => {
              dispatch(uStakingF(accountAddress));
              dispatch(uFrench(accountAddress));
              setStatus(200);
              setProfile(true);
              setLoading(false);
              setCant(0);
            }, 10000);
          }
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
          setErrorMSG('Fondos insuficientes');
        } else if (rejected[0] == 'user' && rejected[1] == 'rejected') {
          setErrorMSG('Transacion rechazada');
        } else {
          setErrorMSG('Error');
        }
        //
      }
    } else {
      setCant(0);
      openModal('NETWORK_VIEW');
      setLoading(false);
    }
  };

  const approve = async () => {
    if (chainId == 1) {
      setLoading(true);
      try {
        let tx = await frenchiesMinter.setApprovalForAll(
          stakingfrenEContract.address,
          'true'
        );

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
    } else {
      openModal('NETWORK_VIEW');
      setLoading(false);
    }
  };

  const verifyApproved = async () => {
    let tx = await frenchiesMinter.isApprovedForAll(
      accountAddress,
      stakingfrenEContract.address
    );

    if (tx == true) {
      setAp(true);
    }
  };

  const { inventoryf } = useSelector((state: any) => state.blockchain);

  useEffect(() => {
    verifyApproved();
    getTvl();
  }, []);

  /*useEffect(() => {
        //router.query.id
        const id = router.query.id;
        setID(id)
        inventoryf.map((inv) => {
            if (inv.id == id) {

                setNftSelect(inv)
            }
        });
    }, []);*/

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

  useEffect(() => {
    let i = 0;
    if (inventoryf.length != 0) {
      inventoryf.map((item) => {
        const nftInfo = {
          nombre: item.Nombre,
          image: item.image,
          precio: item.precio,
          descripcion: item.descripcion,
          id: item.id,
          select: false,
        };
        auxNFT.push(nftInfo);
        if (i == inventoryf.length - 1) {
          setCurrentF(auxNFT);
          console.log(currentF);
        }
        i++;
      });
    }
  }, [isConnect]);

  useEffect(() => {
    const a = async () => {
      const totalg = await frenchiesMinter.balanceOf(
        stakingfrenEContract.address
      );
      setTotalStaking(parseInt(totalg));
    };
    a();
  }, [auxNFT]);

  useEffect(() => {
    let i = 0;
    auxNFT = [];
    if (inventoryf.length != 0) {
      inventoryf.map((item) => {
        const nftInfo = {
          nombre: item.Nombre,
          image: item.image,
          precio: item.precio,
          descripcion: item.descripcion,
          id: item.id,
          select: false,
        };
        auxNFT.push(nftInfo);
        if (i == inventoryf.length - 1) {
          setCurrentF(auxNFT);
        }
        i++;
      });
    }
  }, [inventoryf]);

  return (
    <>
      <NextSeo
        title="Create NFT"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />

      <div className="flex w-full justify-center">
        <div className="flex-column w-full  justify-between  md:w-[80%] lg:flex">
          <div>
            <div className="flex justify-center">
              <h1 className="text-lg font-semibold text-white">
                Hay {totalStaking} Nft's estakeados en total.
              </h1>
            </div>
            <div className="flex  justify-center">
              <h1 className="text-lg font-semibold text-white">
                TVL: {tvl} USDT
              </h1>
            </div>
          </div>
          <div className="mt-8 flex justify-center ">
            <Button onClick={selectAll}>
              {allSelect ? 'Deselecionar todos ' : 'Selecionar todos'}
            </Button>
          </div>

          <div className=" row mt-4 flex w-full justify-center md:mt-0 lg:w-[50%]">
            <div className="mb-8 mr-2 w-[70%]">
              <InputLabel title="Cantidad" />
              <Input type="text" placeholder="0" value={cant} disabled />
            </div>

            <div className="mt-[32px]">
              {ap && !loading && (
                <Button shape="rounded" disabled={stak} onClick={() => Stake()}>
                  Stake
                </Button>
              )}
              {loading && <Button>Cargando...</Button>}

              {!ap && !loading && (
                <Button shape="rounded" onClick={() => approve()}>
                  Approve
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center">
        {status == 200 && (
          <div
            className="mb-8 flex justify-center self-center rounded-lg bg-green-200 p-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800 sm:w-[500px]"
            role="alert"
          >
            <span className="text-center font-medium">
              Transaccion completada correctamente
            </span>
          </div>
        )}
        {status == 100 && (
          <div
            className="mb-8 flex justify-center self-center rounded-lg bg-red-200 p-4  text-sm text-red-700 dark:bg-red-200 dark:text-red-800 sm:w-[500px]"
            role="alert"
          >
            <span className="text-center font-medium ">{errorMSG}</span>
          </div>
        )}
      </div>

      <div className="ml-6 grid h-full   w-full  grid-cols-2 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-5 xl:gap-6  3xl:grid-cols-4 4xl:grid-cols-5">
        {currentF?.map((nft) => (
          <NFTGrids
            key={nft.nombre}
            name={nft.nombre}
            image={nft.image}
            price={nft.precio}
            number={nft.id}
            alldata={false}
            type={'staking'}
            setNftSelect={setNftSelect}
            isSelect={nft.select}
          />
        ))}
        {currentF.length == 0 && (
          <div className="flex h-full w-full  items-center justify-center ">
            <div className=" h-full w-full">
              <span>
                <h1 className="md:text-md text-gray-600 md:w-[500px] xl:w-[700px] xl:text-lg">
                  No tienes Frenchies
                </h1>
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

StakePage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default StakePage;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
