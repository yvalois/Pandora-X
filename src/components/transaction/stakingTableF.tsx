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
import {
  uStaking,
  uInvertion,
  uStakingF,
  uFrench,
} from '../../redux/Blockchain/blockchainAction';
import { useWindowScroll } from 'react-use';
import { useAccount } from 'wagmi';

export default function StakingTableF() {
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
  const {
    inventorysf,
    stakingfrenEContract,
    tokenContract,
    chainId,
    stakingfrenPContract,
    accountAddress,
  } = useSelector((state) => state.blockchain);

  const { address } = useAccount();

  const Usuario = useSelector((state) => state.Usuario);
  const dispatch = useDispatch<AppDispatch>();

  const claim = async (value) => {
    setLoading(true);
    const is = await stakingfrenEContract.nftIsStaking(
      accountAddress,
      value.id
    );

    if (is) {
      if (chainId == 1) {
        const now = new Date();
        const fecha = new Date(value.fechaM),
          y = fecha.getFullYear(),
          m = fecha.getMonth();

        const paidDay = new Date(y, m + 1, 5);

        const val = {
          fechap: paidDay,
        };
        /*if(now > fecha){
        alert(now)
        alert(fecha)


      }else{
        alert("no")

      }*/
        setLoading(true);
        try {
          const tx = await stakingfrenPContract.claimReward(
            'CONTRASENACLAIM',
            '0x8aa436dFb04f325BBF191dAB9E557EB571DCA08F'
          );

          await tx.wait();

          dispatch(uStakingF(accountAddress));

          const fecha = new Date(value.fechaM),
            y = fecha.getFullYear(),
            m = fecha.getMonth();
          const paidDay = new Date(y, m + 1, 5);

          const val = {
            fechap: paidDay,
          };

          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API}/actualizarstaking/${value.id}`,
            {
              method: 'PUT',
              body: JSON.stringify(val),
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          setLoading(false);
          setStatusC(200);

          setAlertMsg('Transaccion realizada de manera exitosa');
        } catch (err) {
          setLoading(false);
          setStatusC(100);
          const mess = err.message.split('[');
          //const messa = mess[1].split(":")
          //const messag = messa[3].split(",")
          //const messag_ = messag[0].split("-")
          console.log(mess);
          const rejected = mess[0].split(' ');
          console.log(rejected);
          if (mess[0] == 'insufficient funds for intrinsic transaction cost ') {
            setAlertMsg('Fondos insuficientes');
          } else if (rejected[0] == 'user' && rejected[1] == 'rejected') {
            setAlertMsg('Transacion rechazada');
          } else {
            setAlertMsg(
              'El contracto no cuenta con el balance para realizar esta transaccion por favor intenta mas tarde'
            );
          }
          //
        }
      } else {
        openModal('NETWORK_VIEW');
        setLoading(false);
      }
    } else {
      setLoading(false);
      setStatusC(true);
      setAlertMsg('Token no esta stakeado');
    }
  };

  const withdraw = async (value) => {
    setLoading(true);

    //preguntar si esta en tiempo
    //si no lo esta lanza el modal
    //aprove del 10% del valor del nft
    // llamar a withdraw with punishment
    if (chainId == 1) {
      try {
        const tx = await stakingfrenEContract.withdraw(value);
        await tx.wait();
        dispatch(uStakingF(accountAddress));
        dispatch(uFrench(accountAddress));

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/deleteStaking/${value}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setLoading(false);
        setLoading(false);
        setStatusW(200);

        setAlertMsg('Transaccion realizada de manera exitosa');
      } catch (err) {
        setLoading(false);
        setStatusW(100);
        const mess = err.message.split('[');
        //const messa = mess[1].split(":")
        //const messag = messa[3].split(",")
        //const messag_ = messag[0].split("-")
        console.log(mess);
        const rejected = mess[0].split(' ');
        console.log(rejected);
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

  const COLUMNS = [
    {
      Header: 'ID',
      accessor: 'id',
      minWidth: 20,
      maxWidth: 30,
    },
    {
      Header: () => (
        <div className="ltr:ml-auto rtl:mr-auto">Fecha de pago</div>
      ),
      accessor: 'fechaPago',
      // @ts-ignore
      Cell: ({ cell: { value } }) => (
        <div className="ltr:text-right rtl:text-left">{value.fechaM}</div>
      ),
      minWidth: 100,
      maxWidth: 180,
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
      minWidth: 120,
      maxWidth: 180,
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
      minWidth: 180,
      maxWidth: 120,
    },
  ];

  const data = inventorysf;
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
      setStatusC(false);
      setStatusW(false);
    }, 5000);
  }, [statusC, statusW]);

  useEffect(() => {
    console.log(inventorysf);
  }, []);

  return (
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
      {loading && (
        <div
          className="absolute right-[50px] top-[250px] mb-4 mt-[0px] w-[300px] justify-center self-center rounded-lg bg-gray-200 p-4 text-sm text-gray-700 dark:bg-gray-200 dark:text-gray-800"
          role="alert"
        >
          <span className="self-center font-medium">Loading...</span>
        </div>
      )}

      {statusC == 200 && !loading && (
        <div
          className="absolute right-[50px] top-[250px]  mb-4 mt-[0px] w-[300px] justify-center self-center rounded-lg bg-green-200  p-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          <span className="text-center font-medium">{alertMsg}</span>
        </div>
      )}

      {statusW == 200 && !loading && (
        <div
          className="absolute right-[50px] top-[250px] mb-4 mt-[0px] w-[300px] justify-center self-center rounded-lg bg-green-200  p-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          <span className="text-center font-medium">{alertMsg}</span>
        </div>
      )}

      {statusC == 100 && !loading && (
        <div
          className="absolute right-[50px] top-[250px]  mb-4 mt-[0px] w-[300px] justify-center self-center rounded-lg  bg-red-200  p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          <span className="text-center font-medium">{alertMsg}</span>
        </div>
      )}

      {statusW == 100 && !loading && (
        <div
          className="absolute right-[50px] top-[250px] mb-4 mt-[0px] w-[300px] justify-center self-center rounded-lg  bg-red-200  p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          <span className="text-center font-medium">{alertMsg}</span>
        </div>
      )}
    </div>
  );
}
