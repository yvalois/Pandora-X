import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import abiErc20 from '../abi/abiERC20.json'; //Buscar
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
      nombre: 'Inversiones',
      value: '',
    },
  ];

  const Aprs = [
    {
      nombre: '1 ',
      value: 1,
    },
    {
      nombre: '2',
      value: 2,
    },
    {
      nombre: '3',
      value: 3,
    },
    {
      nombre: '4',
      value: 4,
    },
    {
      nombre: '5',
      value: 5,
    },
  ];

  let [tipo, setTipo] = useState(Contractos[0]);
  let [apr, setApr] = useState(Aprs[0]);

  const [balance, setBalance] = useState(0);
  const {
    staking,
    tokenContract,
    accountAddress,
    frenchiesMinter,
    chainId,
    inversionMinter,
  } = useSelector((state) => state.blockchain);
  const [tvl, setTvl] = useState('');
  const [porcentajeR, setPorcentajeR] = useState(0);
  const [porcentajeAPR, setPorcentajeAPR] = useState(0);

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
          staking.address,
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
          const tx = await tokenContract.transfer(staking.address, total);
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
    if (chainId == 137) {
      try {
        setLoading(true);
        if (balance.toString() > parseFloat('0').toFixed(2)) {
          console.log(inversionMinter);
          const tx = await inversionMinter.withdrawToken(tokenContract.address);
          await tx.wait();
          setStatus(200);
          setAlertMsg('Retiro realizado correctamente');
          setLoading(false);
        } else {
          setStatus(100);
          setAlertMsg('Su saldo es de: 0');
          setLoading(false);
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

  const updatePR = async () => {
    try {
      setLoading(true);
      if (porcentajeR > 0 && porcentajeR <= 100) {
        const per = porcentajeR * 10;
        const tx = await staking.setPercentageR(per.toString());
        await tx.wait();
        setStatus(200);
        setAlertMsg('Cambio realizado correctamente');
        setLoading(false);
      } else {
        setStatus(100);
        setAlertMsg('Valor invalido');

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setStatus(100);
      const mess = error.message.split('[');
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

  const updateAPR = async () => {
    try {
      setLoading(true);
      if (apr.value > 0 && apr.value < 6) {
        if (porcentajeAPR > 0 && porcentajeAPR <= 100) {
          const per = porcentajeAPR * 100000000;

          const tx = await staking.setApr(apr.value, per.toString());
          await tx.wait();
          setStatus(200);
          setAlertMsg('Cambio realizado correctamente');
          setLoading(false);
        } else {
          setStatus(100);
          setAlertMsg('Porcentaje invalido');
          setLoading(false);
        }
      } else {
        setStatus(100);
        setAlertMsg('Valor invalido');
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setStatus(100);
      const mess = error.message.split('[');
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

  const getStakings = async () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/getStakings`, {
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
      const rpc_MAC =
        'https://polygon-mainnet.g.alchemy.com/v2/XVy5Duyf5VwZzcxJaIlxyQEehwKzosov';
      const provider_MAC = new ethers.providers.JsonRpcProvider(rpc_MAC);

      const tokenContract1 = new ethers.Contract(
        tokenContract.address,
        abiErc20,
        provider_MAC
      );

      const numStr = await tokenContract1.balanceOf(inversionMinter.address);
      setBalance(ethers.utils.formatUnits(numStr, 6));
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
          <div className=" mb-[20px] flex justify-center self-center">
            <h1>Balance: {balance} USDT</h1>
          </div>
          <div className="space-between flex flex-row justify-center align-middle">
            <div className="mb-[20px] mr-4 w-[30%] self-center">
              <Listbox value={tipo} onChange={setTipo}>
                <Listbox.Button className="text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5">
                  <div className="flex w-10 items-center">
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
              {!loading && <Button onClick={withdraw}> Retirar</Button>}
              {loading && <Button> Cargando</Button>}
            </div>
          </div>
        </div>

        <div>
          <div className="mt-[40px] mb-[30px] flex justify-center self-center">
            <h1>Cambiar porcentaje Referido</h1>
          </div>
          <div className="space-between flex flex-row justify-center align-middle">
            <div className="mb-[20px] ml-6 mr-4 w-[30%] self-center">
              <Input
                type="text"
                placeholder="%"
                onChange={(e) => setPorcentajeR(e.target.value)}
                value={porcentajeR}
              />
            </div>

            <div className="mb-[20px] self-center">
              {!loading && <Button onClick={updatePR}>Cambiar</Button>}
              {loading && <Button> Cargando</Button>}
            </div>
          </div>
        </div>

        <div className="flex-column w-full items-center justify-center ">
          <div className="mt-[40px] mb-[30px] flex justify-center self-center">
            <h1>Cambiar porcentaje</h1>
          </div>

          <div className="space-between flex flex-row justify-center align-middle">
            <div className="mb-[20px] ml-6 mr-4 w-[40%]  self-center">
              <Listbox value={apr} onChange={setApr}>
                <Listbox.Button className="text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5">
                  <div className="flex w-10 items-center">
                    {/*<span className="ltr:mr-2 rtl:ml-2">{tipo.icon}</span>*/}
                    {apr.nombre}
                  </div>
                  <ChevronDown />
                </Listbox.Button>
                <Transition
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute  z-10 mt-1 grid w-[40%] origin-top-right gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-gray-700 dark:bg-gray-800 xs:p-2">
                    {Aprs.map((option) => (
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
          </div>
          <div className="space-between flex flex-row justify-center align-middle">
            <div className="mb-[20px] ml-6 mr-4 w-[40%]  self-center">
              <Input
                type="text"
                placeholder="%"
                onChange={(e) => setPorcentajeAPR(e.target.value)}
                value={porcentajeAPR}
              />
            </div>
          </div>

          <div className="mb-[20px] flex justify-center self-center">
            {!loading && (
              <Button onClick={updateAPR}>Cambiar procentaje</Button>
            )}
            {loading && <Button>Cargando</Button>}
          </div>
        </div>

        <div>
          <div className="mt-[40px] mb-[30px] flex justify-center self-center">
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
