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
import NFTGrids from '@/components/ui/nft-card-s';
import { connectWallet } from '@/redux/Blockchain/blockchainAction';
import { useAccount, useProvider, useSigner } from 'wagmi';

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

  const Withdraw = async () => {
    //si no esta referido
    setLoading(true);
    if (chainId == 1) {
      try {
        let tx = await stakingfrenEContract.withdraw(nftSelects);
        await tx.wait();
        for (let i = 0; i < nftSelects.length; i++) {
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API}/deleteStaking/${nftSelects[i]}`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          if (i == nftSelects.length - 1) {
            setTimeout(() => {
              const si = true;
              dispatch(uStakingF(accountAddress));
              dispatch(uFrench(accountAddress));
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
            fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_API}/actualizarstaking/${item.id}`,
              {
                method: 'PUT',
                body: JSON.stringify(val),
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
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

  const _provider = useProvider();
  const { data: signer, isError, isLoading: arroz } = useSigner();
  const { address } = useAccount();

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
      <NextSeo title="Create NFT" description="Nft-Sudio powered by Pandorax" />

      <div className="mt-[-60px] flex w-full justify-center">
        <div className="flex-column w-full  justify-between  md:w-[80%] lg:flex">
          <div className="w-auto px-4 pt-8 pb-14 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8 xl:px-10 2xl:px-0">
            <div className="flex-column w-full justify-center  md:flex ">
              <div className="column flex w-full justify-center lg:col-span-2 ">
                <div className="mb-8 mr-2 w-[80%]">
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
                  <div className=" ml-10 mr-2 w-[80%]">
                    <InputLabel title="Cantidad" />
                    <Input type="text" placeholder="0" value={cantC} disabled />
                  </div>
                )}

                {loading && (
                  <div className=" mr-10 w-[80%]">
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

              <div className="mt-2 flex justify-center md:ml-8 md:mt-8">
                <Button onClick={selectAll}>
                  {allSelect ? 'Deselecionar todos ' : 'Selecionar todos'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex w-full justify-center md:mt-0">
        {status == 200 && (
          <div
            className="mb-8 mt-[-80px] flex w-full justify-center self-center rounded-lg bg-green-200 p-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800 sm:w-[500px]"
            role="alert"
          >
            <span className="text-center font-medium">{errorMSG}</span>
          </div>
        )}

        {status == 100 && (
          <div
            className="mb-8 mt-[-40px] flex w-full justify-center self-center rounded-lg bg-red-200 p-4  text-sm text-red-700 dark:bg-red-200 dark:text-red-800 sm:w-[500px]"
            role="alert"
          >
            <span className="text-center font-medium">{errorMSG}</span>
          </div>
        )}
      </div>

      <div className="ml-4 mr-2 grid h-full w-full   grid-cols-2  gap-4 xs:grid-cols-2 md:ml-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-5 xl:gap-6  3xl:grid-cols-4 4xl:grid-cols-5">
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
                  No tienes Nft's Stakeados
                </h1>
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

StakeFPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default StakeFPage;
