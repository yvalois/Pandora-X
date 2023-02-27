import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useSortBy,
  usePagination,
} from 'react-table';
import Button from '@/components/ui/button';
import Scrollbar from '@/components/ui/scrollbar';
import { ChevronDown } from '@/components/icons/chevron-down';
import { LongArrowRight } from '@/components/icons/long-arrow-right';
import { LongArrowLeft } from '@/components/icons/long-arrow-left';
import { LinkIcon } from '@/components/icons/link-icon';
import { TransactionData } from '@/data/static/transaction-data';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import ModalWithdraw from '../modalWithdraw/modalWithdraw';
import { useModal } from '@/components/modal-views/context';
import { useSelector, useDispatch } from 'react-redux';
import { uStaking, uInvertion } from '../../redux/Blockchain/blockchainAction';
import { useWindowScroll } from 'react-use';
import { useAccount, useProvider } from 'wagmi';

export default function StakingTable() {
  const { inversionMinter } = useSelector((state) => state.blockchain);

  const stakings = [];

  const infoStakings = {
    id: 0,
    valor: 'Buy',
    fecha_de_pago: '12 january 2022',
    Apr: 'BTC',
    Balance: 'Pending',
  };

  const [modal, setModal] = useState(false);
  const { openModal, closeModal } = useModal();
  const [stakes, setStakes] = useState(infoStakings);
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [statusC, setStatusC] = useState(0);
  const [statusW, setStatusW] = useState(0);
  const { inventorys, staking, tokenContract, chainId } = useSelector(
    (state) => state.blockchain
  );

  const provider = useProvider();
  const { address } = useAccount();

  const Usuario = useSelector((state) => state.Usuario);
  const dispatch = useDispatch<AppDispatch>();

  const claim = async (value) => {
    try {
      if (chainId == 137) {
        if (Usuario.isreferido && Usuario.categoria == 'BlockMaker') {
          setLoading(true); //usarlos como alerts de cargando y otro de realizado
          const tx = await staking.claimRewardWithReferido(
            value,
            Usuario.referidor,
            tokenContract.address
          );
          await tx.wait();

          setLoading(false);
          setStatusC(true);
          setAlertMsg('Transacion cumplida');
        } else {
          setLoading(true);
          const tx = await staking.claimReward(value, tokenContract.address);
          await tx.wait();

          setLoading(false);
          setStatusC(true);
          setAlertMsg('Transacion cumplida');
        }
      } else {
        openModal('NETWORK_VIEW');
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setStatusC(100);
      //console.log(err)
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

  const withdraw = async (value) => {
    try {
      if (chainId == 137) {
        openModal('UNSTAKING_VIEW');
        window.localStorage.setItem('WithdrawID', value.toString());
        //setaear variables en el local storage obtenerlo y llamar a la funcion desde el boyon aceptar Unstaking.
        setLoading(true);
        const isOutTime = await staking.isOutTime(value);
        if (isOutTime) {
          window.localStorage.setItem('WithdrawID', value.toString());
          openModal('WITHDRAW_VIEW');
          setLoading(false);
        } else {
          const tx = await staking.withdraw(value);
          await tx.wait();

          dispatch(uInvertion(provider, address));
          setLoading(false);
          setStatusW(200);
          setAlertMsg('Transacion cumplida');
        }
      } else {
        openModal('NETWORK_VIEW');
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setStatusW(100);
      //console.log(err)
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

  const COLUMNS = [
    {
      Header: 'ID',
      accessor: 'id',
      minWidth: 60,
      maxWidth: 80,
    },
    {
      Header: () => <div className="ltr:ml-auto rtl:mr-auto">Valor</div>,
      accessor: 'cantPago',
      // @ts-ignore
      Cell: ({ cell: { value } }) => (
        <div className="ltr:text-right rtl:text-left">{value} USDT</div>
      ),
      minWidth: 80,
      maxWidth: 120,
    },
    {
      Header: () => (
        <div className="ltr:ml-auto rtl:mr-auto">Fecha de pago</div>
      ),
      accessor: 'fechaPago',
      // @ts-ignore
      Cell: ({ cell: { value } }) => (
        <div className="ltr:text-right rtl:text-left">{value}</div>
      ),
      minWidth: 220,
      maxWidth: 280,
    },
    {
      Header: () => <div className="ltr:ml-auto rtl:mr-auto">Apr</div>,
      accessor: 'Apr',
      // @ts-ignore
      Cell: ({ cell: { value } }) => (
        <div className="ltr:text-right rtl:text-left">{value}</div>
      ),
      minWidth: 60,
      maxWidth: 80,
    },
    {
      Header: () => <div className="ltr:ml-auto rtl:mr-auto">Balance</div>,
      accessor: 'precio',
      // @ts-ignore
      Cell: ({ cell: { value } }) => (
        <div className="ltr:text-right rtl:text-left">{value}USDT</div>
      ),
      minWidth: 100,
      maxWidth: 190,
    },
    {
      Header: () => <div className="ltr:ml-auto rtl:mr-auto"></div>,
      accessor: 'idCR',
      // @ts-ignore
      Cell: ({ cell: { value } }) => (
        <div className="flex items-center justify-end">
          <Button
            size="small"
            onClick={() => claim(value)}
            className="focus:shadow-outline  rounded"
          >
            Reclamar
          </Button>
        </div>
      ),
      minWidth: 150,
      maxWidth: 220,
    },
    {
      Header: () => <div className="ltr:ml-auto rtl:mr-auto"></div>,
      accessor: 'idW',
      // @ts-ignore
      Cell: ({ cell: { value } }) => (
        <div className="fl  ex items-center justify-end">
          <Button
            size="small"
            onClick={() => withdraw(value)} //onClick={() => openModal('WITHDRAW_VIEW')}
            className="focus:shadow-outline  rounded"
          >
            Retirar
          </Button>
        </div>
      ),
      minWidth: 80,
      maxWidth: 170,
    },
  ];

  const data = inventorys;
  const columns = React.useMemo(() => COLUMNS, []);

  const {
    getTableProps,
    getTableBodyProps,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    headerGroups,
    page,
    nextPage,
    previousPage,
    prepareRow,
  } = useTable(
    {
      // @ts-ignore
      columns,
      data,
      initialState: { pageSize: 5 },
    },
    useSortBy,
    useResizeColumns,
    useFlexLayout,
    usePagination
  );

  const { pageIndex } = state;

  const setStakings = async () => {
    let count = await inversionMinter.getCountOfStaking();
    let i;
    for (i = 0; i < count; i++) {
      const id = await inversionMinter.getId(i + 1);
      const valor = await inversionMinter.getPrice(id);
      const indice = await inversionMinter.getIndice(i + 1);
      const fecha = await inversionMinter.getDate(indice);
      const apr = await inversionMinter.getApr();
      //const valor1 =  await inversionMinter.
      //const balance =;
      setStakes((prevState) => ({ ...prevState, id: id }));
      setStakes((prevState) => ({ ...prevState, valor: valor }));
      setStakes((prevState) => ({ ...prevState, fecha: fecha }));
      setStakes((prevState) => ({ ...prevState, apr: apr }));
      //setStakes((prevState) => ({ ...prevState, id: id }));
      stakings.push(stakes);
      setStakes(infoStakings);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setStatusC(0);
      setStatusW(0);
    }, 5000);
  }, [statusC, statusW]);

  return (
    <>
      {loading || statusC != 0 || statusW != 0 ? (
        <div className="mt-10 flex w-full justify-center align-middle">
          {loading && (
            <div
              className="absolute  mb-8 w-[300px] justify-center self-center rounded-lg bg-gray-200 p-4 text-sm text-gray-700 dark:bg-gray-200 dark:text-gray-800"
              role="alert"
            >
              <span className="text-center font-medium">Loading...</span>
            </div>
          )}

          {statusC == 200 && (
            <div
              className="absolute  mb-8 w-[300px] justify-center self-center rounded-l bg-green-200  p-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800"
              role="alert"
            >
              <center>
                <span className="font-medium ">{alertMsg}</span>
              </center>
            </div>
          )}
          {statusC == 100 && (
            <div
              className="absolute  mb-8 w-[300px] justify-center self-center rounded-l  bg-red-200  p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
              role="alert"
            >
              <center>
                <span className="font-medium ">{alertMsg}</span>
              </center>
            </div>
          )}

          {statusW == 200 && (
            <div
              className="absolute  mb-8 w-[300px] justify-center self-center rounded-l bg-green-200  p-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800"
              role="alert"
            >
              <center>
                <span className="font-medium ">{alertMsg}</span>
              </center>
            </div>
          )}

          {statusW == 100 && (
            <div
              className="absolute  mb-8 w-[300px] justify-center self-center rounded-l bg-red-200  p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
              role="alert"
            >
              <span className="text-center font-medium">s{alertMsg}</span>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
      <div className="">
        <div className="rounded-tl-lg rounded-tr-lg bg-white px-4 pt-6 dark:bg-light-dark md:px-8 md:pt-8">
          <div className="flex flex-col items-center justify-between border-b border-dashed border-gray-200 pb-5 dark:border-gray-700 md:flex-row">
            <h2 className="mb-3 shrink-0 text-lg font-medium uppercase text-black dark:text-white sm:text-xl md:mb-0 md:text-2xl">
              Transaction History
            </h2>
          </div>
        </div>
        <div className="-mx-0.5">
          <Scrollbar style={{ width: '100%' }} autoHide="never">
            <div className="px-0.5">
              <table
                {...getTableProps()}
                className="transaction-table w-full border-separate border-0"
              >
                <thead className="text-sm text-gray-500 dark:text-gray-300">
                  {headerGroups.map((headerGroup, idx) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
                      {headerGroup.headers.map((column, idx) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          key={idx}
                          className="group  bg-white px-2 py-5 font-normal first:rounded-bl-lg last:rounded-br-lg ltr:first:pl-8 ltr:last:pr-8 rtl:first:pr-8 rtl:last:pl-8 dark:bg-light-dark md:px-4"
                        >
                          <div className="flex items-center">
                            {column.render('Header')}
                            {column.canResize && (
                              <div
                                {...column.getResizerProps()}
                                className={`resizer ${
                                  column.isResizing ? 'isResizing' : ''
                                }`}
                              />
                            )}
                            <span className="ltr:ml-1">
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <ChevronDown />
                                ) : (
                                  <ChevronDown className="rotate-180" />
                                )
                              ) : (
                                <ChevronDown className="rotate-180 opacity-0 transition group-hover:opacity-50" />
                              )}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="text-xs font-medium text-gray-900 dark:text-white 3xl:text-sm"
                >
                  {page.map((row, idx) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        key={idx}
                        className="mb-3 items-center rounded-lg bg-white uppercase shadow-card last:mb-0 dark:bg-light-dark"
                      >
                        {row.cells.map((cell, idx) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              key={idx}
                              className="px-2 py-4 tracking-[1px] ltr:first:pl-4 ltr:last:pr-4 rtl:first:pr-8 rtl:last:pl-8 md:px-4 md:py-6 md:ltr:first:pl-8 md:ltr:last:pr-8 3xl:py-5"
                            >
                              {cell.render('Cell')}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Scrollbar>
        </div>
        <div className="mt-3 flex items-center justify-center rounded-lg bg-white px-5 py-4 text-sm shadow-card dark:bg-light-dark lg:py-6">
          <div className="flex items-center gap-5">
            <Button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              title="Previous"
              shape="circle"
              variant="transparent"
              size="small"
              className="text-gray-700 disabled:text-gray-400 dark:text-white disabled:dark:text-gray-400"
            >
              <LongArrowLeft className="h-auto w-4 rtl:rotate-180" />
            </Button>
            <div>
              Page{' '}
              <strong className="font-semibold">
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </div>
            <Button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              title="Next"
              shape="circle"
              variant="transparent"
              size="small"
              className="text-gray-700 disabled:text-gray-400 dark:text-white disabled:dark:text-gray-400"
            >
              <LongArrowRight className="h-auto w-4 rtl:rotate-180 " />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
