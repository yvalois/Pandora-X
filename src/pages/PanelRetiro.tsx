import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from '@/layouts/_dashboard';
import Button from '@/components/ui/button/button';
import { useModal } from '@/components/modal-views/context';
import { WalletContext } from '@/lib/hooks/use-connect';
import { ChevronDown } from '@/components/icons/chevron-down';

import { Listbox } from '@/components/ui/listbox';
import { Transition } from '@/components/ui/transition';
import Input from '@/components/ui/forms/input';
import { ethers } from 'ethers';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const RetiroPanelPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const Contractos = [
    {
      nombre: 'Frenchies',
      value: '',
    },
    {
      nombre: 'Inversiones',
      value: '',
    },
  ];

  let [tipo, setTipo] = useState(Contractos[0]);
  const [balance, setBalance] = useState(0);
  const {
    stakingfrenPContract,
    tokenContract,
    accountAddress,
    frenchiesMinter,
    chainId,
    inversionMinter,
  } = useSelector((state) => state.blockchain);
  const [tvl, setTvl] = useState('');
  const [sbalance, setSbalance] = useState(0);
  const [cantC, setCantC] = useState(0);
  const [approvedToken, setApprovedToken] = useState(0);
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [status, setStatus] = useState(0);
  const { openModal, closeModal } = useModal();

  const verifyApprove = async () => {
    try {
      const usdt = await tokenContract.allowance(
        accountAddress,
        stakingfrenPContract.address
      ); //MarketPlace
      //setApprovedUsdt(ethers.utils.formatUnits(usdt, 18));
      setApprovedToken(ethers.utils.formatUnits(usdt, 6));
    } catch (e) {}
  };

  const approve = async () => {
    setLoading(true);
    if (chainId == 137) {
      try {
        const decimals = 6;
        const tx = await tokenContract.approve(
          stakingfrenPContract.address,
          ethers.utils.parseUnits('1000000', decimals)
        );

        await tx.wait();
        await verifyApprove();
        setLoading(false);
      } catch (e) {
        setLoading(false);
        const mess = err.message.split('[');
        const rejected = mess[1].split(' ');
        if (rejected[7] == 'insufficient') {
          setAlertMsg('Fondos insuficientes');
        } else if (rejected[0] == 'user' && rejected[1] == 'rejected') {
          setAlertMsg('Transacion rechazada');
        } else {
          setAlertMsg('Error');
        }
      }
    } else {
      openModal('NETWORK_VIEW');
      setLoading(false);
    }
  };
  const depositar = async () => {
    setLoading(true);
    if (chainId == 137) {
      try {
        if (sbalance > 0) {
          const decimals = 6;
          const total = ethers.utils.parseUnits(sbalance.toString(), decimals);
          const tx = await stakingfrenPContract.setMount(
            total,
            cantC,
            tokenContract.address
          );
          await tx.wait();
          setLoading(false);
        } else {
          setLoading(false);
          setStatus(100);
          setAlertMsg('Valor incorrecto');
        }
      } catch (err) {
        setLoading(false);
        setStatus(100);
        const mess = err.message.split('[');
        console.log(mess);
        if (mess.length > 1) {
          const rejected1 = mess[1].split(' ');
          if (rejected1[7] == 'insufficient') {
            setAlertMsg('Fondos insuficientes');
          } else if (rejected1[0] == 'user' && rejected1[1] == 'rejected') {
            setAlertMsg('Transacion rechazada');
          } else if (rejected1[9] == 'exceeds') {
            setAlertMsg('Fondos insuficientes');
          } else {
            setAlertMsg('Error');
          }
        } else {
          const rejected = mess[0].split(' ');

          if (rejected[7] == 'insufficient') {
            setAlertMsg('Fondos insuficientes');
          } else if (rejected[0] == 'user' && rejected[1] == 'rejected') {
            setAlertMsg('Transacion rechazada');
          } else if (rejected[9] == 'exceeds') {
            setAlertMsg('Fondos insuficientes');
          } else {
            setAlertMsg('Error');
          }
          //
        }
      }
    } else {
      openModal('NETWORK_VIEW');
      setLoading(false);
    }
  };

  const withdraw = async () => {
    if (chainId == 1) {
      try {
        if (tipo.nombre == 'Frenchies') {
          if (balance.toString() > parseFloat('0').toFixed(2)) {
            const tx = await frenchiesMinter.withdraw();
            await tx.wait();
          } else {
            setStatus(100);
            setAlertMsg('Su saldo es de: 0');
          }
        } else {
          const tx = await inversionMinter.withdrawToken(tokenContract.address);
          await tx.wait();
        }
      } catch (err) {
        setLoading(false);
        setStatus(100);
        const mess = err.message.split('[');
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
    } else {
      openModal('NETWORK_VIEW');
      setLoading(false);
    }
  };

  const updateTvl = () => {
    const val = {
      Tvl: tvl,
    };

    fetch(`${process.env.BACKEND_API}/updateTvl`, {
      method: 'PUT',
      body: JSON.stringify(val),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      res.json();
      setStatus(res.status);

      if (res.status == 200) {
        setAlertMsg('El tvl se actualizo correctamente');
      } else {
        setAlertMsg('Error inesperado intentalo de nuevo');
      }
    });
  };

  const getStakings = async () => {
    fetch(`${process.env.BACKEND_API}/getStakings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((response) => {
        let i = 0;
        const stakes = response;
        stakes.map((item) => {
          const now = new Date();
          const rnow = new Date(now),
            y1 = rnow.getFullYear(),
            m1 = rnow.getMonth(),
            d1 = rnow.getDay();
          const rnow2 = new Date(2023, 2, 1);
          const dat = new Date(item.fechald),
            y = dat.getFullYear(),
            m = dat.getMonth(),
            d = dat.getDay();
          //const lastDay =new Date(y, m ,d)
          // solucionar como queda todo esto
          if (now > dat) {
            i++;
            setCantC(i);
          }
        });
      })
      .catch((error) => console.error('Error:', error));
  };

  useEffect(() => {
    const seteBalance = async () => {
      const rpc_ETH =
        'https://eth-mainnet.g.alchemy.com/v2/q9zvspHI6cAhD0JzaaxHQDdJp_GqXNMJ'; //se cambia la final

      const provider_ETH = new ethers.providers.JsonRpcProvider(rpc_ETH);
      const numStr = await provider_ETH.getBalance(frenchiesMinter.address);
      const aux = parseFloat(numStr);
      setBalance(ethers.utils.formatUnits(aux.toString(), 'ether'));
    };
    seteBalance();
    getStakings();
    verifyApprove();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setStatus(0);
    }, 3000);
  }, [status]);

  return (
    <>
      <NextSeo
        title="Panel de Retiro  "
        description="Administracion de Usuarios"
      />

      <div className="h-full w-full">
        <div>
          <div className="mt-[5%] mb-[30px] flex justify-center self-center">
            <h1>Balance: {balance} ETH</h1>
          </div>
          <div className="space-between flex flex-row justify-center align-middle">
            <div className="mb-[20px] mr-4 w-[30%] self-center">
              <Listbox value={tipo} onChange={setTipo}>
                <Listbox.Button className="text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5">
                  <div className="flex items-center">
                    {/*<span className="ltr:mr-2 rtl:ml-2">{tipo.icon}</span>*/}
                    {tipo.nombre}
                  </div>
                  <ChevronDown />
                </Listbox.Button>
                <Transition
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute  z-10 mt-1 grid w-[40%] origin-top-right gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-gray-700 dark:bg-gray-800 xs:p-2">
                    {Contractos.map((option) => (
                      <Listbox.Option key={option.id} value={option}>
                        {({ selected }) => (
                          <div
                            className={`flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100  ${
                              selected
                                ? 'bg-gray-200/70 font-medium dark:bg-gray-600/60'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700/70'
                            }`}
                          >
                            {option.nombre}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </Listbox>
            </div>
            <div className="mb-[20px] self-center">
              <Button onClick={withdraw}> Retirar</Button>
            </div>
          </div>
        </div>

        <div>
          <div className="mt-[5%] mb-[30px] flex justify-center self-center">
            <h1>Cambiar TVL</h1>
          </div>
          <div className="space-between flex flex-row justify-center align-middle">
            <div className="mb-[20px] ml-6 mr-4 w-[30%] self-center">
              <Input
                type="text"
                placeholder="$000..."
                onChange={(e) => setTvl(e.target.value)}
                value={tvl}
              />
            </div>
            <div className="mb-[20px] self-center">
              <Button onClick={updateTvl}>Cambiar tvl</Button>
            </div>
          </div>
        </div>

        <div>
          <div className="mt-[5%] mb-[30px] flex justify-center self-center">
            <h1>Depositar balance para staking</h1>
          </div>
          <div className="space-between flex flex-row justify-center align-middle">
            <div className="mb-[20px] ml-6 mr-4 w-[30%] self-center">
              <Input
                type="text"
                placeholder="balance"
                onChange={(e) => setSbalance(e.target.value)}
                value={sbalance}
              />
            </div>
            <div className="mb-[20px] self-center">
              {approvedToken > sbalance && !loading && (
                <Button onClick={approve}>Approve</Button>
              )}
              {approvedToken <= sbalance && sbalance >= 0 && !loading && (
                <Button onClick={depositar}>Depositar</Button>
              )}
              {loading && <Button>cargando</Button>}
            </div>
          </div>
          <div className=" mt-10 flex w-full justify-center">
            {status == 200 && (
              <div
                className="mb-4   flex w-[500px] justify-center self-center rounded-lg bg-green-200 p-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800"
                role="alert"
              >
                <span className="text-center font-medium">
                  {alertMsg.length < 0
                    ? 'Transaccion completada correctamente'
                    : alertMsg}
                </span>
              </div>
            )}

            {status == 100 && (
              <div
                className="mb-4  flex w-[500px] justify-center self-center rounded-lg bg-red-200  p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
                role="alert"
              >
                <span className="text-center font-medium">{alertMsg}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

RetiroPanelPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default RetiroPanelPage;
