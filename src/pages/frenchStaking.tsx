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
import dotenv from 'dotenv';

const StakeFPage: NextPageWithLayout = () => {
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
  const {
    frenchiesMinter,
    stakingfrenEContract,
    accountAddress,
    stakingfrenPContract,
    chainId,
    tokenContract,
  } = useSelector((state) => state.blockchain);
  const [ap, setAp] = useState(false);
  const Usuario = useSelector((state: any) => state.Usuario);
  const [profile, setProfile] = useState(false);
  const [id, setID] = useState(0);
  const [errorMSG, setErrorMSG] = useState('');
  const [currentF, setCurrentF] = useState([]);
  const [cant, setCant] = useState(0);
  const [stak, setStak] = useState(true);
  const [nftSelects, setNftSelects] = useState([]);
  const [cantC, setCantC] = useState(0);
  const [allSelect, setAllSelect] = useState(false);
  const { openModal, closeModal } = useModal();

  let auxNFT = [];

  const setNftSelect = (nfts) => {
    let auxNFT1 = [];
    let i = 0;
    if (currentF.length != 0) {
      currentF.map((item) => {
        if (nfts.id == item.id) {
          if (nfts.select == false) {
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

  const Withdraw = async () => {
    //si no esta referido
    setLoading(true);
    if (chainId == 1) {
      try {
        let tx = await stakingfrenEContract.withdraw(nftSelects);
        await tx.wait();
        for (let i = 0; i < nftSelects.length; i++) {
          fetch(`${process.env.BACKEND_API}/deleteStaking/${nftSelects[i]}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (i == nftSelects.length - 1) {
            setTimeout(() => {
              const si = true;
              dispatch(uStakingF(accountAddress));
              dispatch(uFrench(accountAddress, si));
              setStatus(200);
              setErrorMSG('Transaccion completada exitosamente');
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
      openModal('NETWORK_VIEW');
      setLoading(false);
    }
  };

  const Claim = async () => {
    if (chainId == 137) {
      setLoading(true);
      try {
        const the = process.env.NEXT_PUBLIC_BACKEND_CON;

        const tx = await stakingfrenPContract.claimReward(
          the,
          tokenContract.address,
          cantC
        );
        await tx.wait();

        inventorysf.map(async (item) => {
          const now = new Date();

          const fecha = new Date(item.fechaPago.fecha);

          if (fecha <= now && cantC > 0) {
            const fecha = new Date(item.fechaPago.fecha),
              y = fecha.getFullYear(),
              m = fecha.getMonth();
            const paidDay = new Date(y, m + 1, 5);

            const val = {
              fechap: paidDay,
            };
            fetch(`${process.env.BACKEND_API}/actualizarstaking/${item.id}`, {
              method: 'PUT',
              body: JSON.stringify(val),
              headers: {
                'Content-Type': 'application/json',
              },
            });
            setProfile(true);
            setErrorMSG('Transaccion realizada de manera exitosa');
            setCantC(0);
          } else {
            setStatus(100);
            setErrorMSG('No tienes pagos pendientes');
            setLoading(false);
          }
        });
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
          setErrorMSG(
            'El contracto no cuenta con el balance para realizar esta transaccion por favor intenta mas tarde'
          );
        }
        setProfile(true);
      }
    } else {
      openModal('NETWORK_VIEW');
      setLoading(false);
    }
  };

  const { inventoryf, inventorysf } = useSelector(
    (state: any) => state.blockchain
  );

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

    if (inventorysf.length != 0) {
      inventorysf.map((item) => {
        const nftInfo = {
          nombre: item.Nombre,
          image: item.image,
          precio: item.precio,
          descripcion: item.descripcion,
          id: item.id,
          select: false,
        };
        auxNFT.push(nftInfo);
        if (i == inventorysf.length - 1) {
          setCurrentF(auxNFT);
          console.log(currentF);
        }
        i++;
      });
    }
  }, [isConnect]);

  useEffect(() => {
    let i = 0;
    inventorysf.map((item) => {
      const now = new Date();

      const fecha = new Date(item.fechaPago.fecha);
      if (fecha <= now) {
        i++;
        setCantC(i);
      }
    });
  }, []);

  useEffect(() => {
    let i = 0;
    inventorysf.map((item) => {
      const now = new Date();
      const fecha = new Date(item.fechaPago.fecha);
      if (fecha <= now) {
        i++;
        setCantC(i);
      }
    });
  }, [inventorysf]);

  useEffect(() => {
    let i = 0;
    auxNFT = [];
    if (inventorysf.length != 0) {
      inventorysf.map((item) => {
        const nftInfo = {
          nombre: item.Nombre,
          image: item.image,
          precio: item.precio,
          descripcion: item.descripcion,
          id: item.id,
          select: false,
        };
        auxNFT.push(nftInfo);
        if (i == inventorysf.length - 1) {
          setCurrentF(auxNFT);
        }
        i++;
      });
    } else {
      setCurrentF([]);
    }
  }, [inventorysf]);

  useEffect(() => {
    let i = 0;
    auxNFT = [];
    if (inventorysf.length != 0) {
      inventorysf.map((item) => {
        const nftInfo = {
          nombre: item.Nombre,
          image: item.image,
          precio: item.precio,
          descripcion: item.descripcion,
          id: item.id,
          select: false,
        };
        auxNFT.push(nftInfo);
        if (i == inventorysf.length - 1) {
          setCurrentF(auxNFT);
        }
        i++;
      });
    } else {
      setCurrentF([]);
    }
  }, []);

  return (
    <>
      <NextSeo
        title="Create NFT"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <div className="mb-[-180px]  h-[430px]   w-full sm:ltr:pr-6   sm:rtl:pl-6 md:mb-8 md:w-[100%] lg:w-[100%] 2xl:w-[100%] 3xl:w-[100%]">
        {inventorysf.length != 0 ? (
          <NftSlider
            nfts={currentF}
            priceFormat={0.3}
            nftInfo={nftInfo}
            setNftSelect={setNftSelect}
            type={'stakingss'}
          />
        ) : (
          <div className="mb-8 h-[630px] w-full sm:mb-0 sm:w-1/2 sm:ltr:pr-6 sm:rtl:pl-6 md:w-[100%] lg:w-[100%] 2xl:w-[100%] 3xl:w-[100%]"></div>
        )}
      </div>
      <div className="mb-20 flex w-full justify-end md:mb-12">
        <Button onClick={selectAll}>
          {allSelect ? 'Deselecionar todos ' : 'Selecionar todos'}
        </Button>
      </div>
      <div className="mx-auto w-auto px-4 pt-8 pb-14 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8 xl:px-10 2xl:px-0">
        <div className="mb-8  w-full ">
          <div className="column flex w-full justify-center lg:col-span-2 ">
            <div className="mb-8 mr-10 w-[15%]">
              <InputLabel title="Cantidad" />
              <Input type="text" placeholder="0" value={cant} disabled />
            </div>

            <div className="mb-8 ">
              <div className="mb-8"></div>

              {!loading && (
                <Button
                  shape="rounded"
                  disabled={stak}
                  onClick={() => Withdraw()}
                >
                  Desbloquear Nft
                </Button>
              )}

              {loading && <Button>Cargando...</Button>}
            </div>
          </div>
          <div className="column flex w-full justify-center lg:col-span-2 ">
            {!loading && (
              <div className="mb-8 ml-10 mr-10 w-[15%]">
                <InputLabel title="Cantidad" />
                <Input type="text" placeholder="0" value={cantC} disabled />
              </div>
            )}

            {loading && (
              <div className="mb-8 mr-10 w-[15%]">
                <InputLabel title="Cantidad" />
                <Input type="text" placeholder="0" value={cantC} disabled />
              </div>
            )}

            <div className="mb-8">
              <div className="mb-8"></div>

              {!loading && (
                <Button
                  className="w-[86%]"
                  shape="rounded"
                  onClick={() => Claim()}
                >
                  Reclamar recompensa
                </Button>
              )}

              {loading && <Button className="">Cargando...</Button>}
            </div>
          </div>
        </div>
      </div>

      {status == 200 && (
        <div
          className="mb-4 ml-[580px]  flex w-[500px] justify-center self-center rounded-lg bg-green-200 p-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          <span className="font-medium">{errorMSG}</span>
        </div>
      )}

      {status == 100 && (
        <div
          className="mb-4 ml-[580px]  flex w-[500px] justify-center self-center rounded-lg bg-red-200  p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          <span className="font-medium">{errorMSG}</span>
        </div>
      )}
    </>
  );
};

StakeFPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default StakeFPage;
