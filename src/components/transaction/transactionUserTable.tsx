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
import { useSelector } from 'react-redux';
import Alert from '../ui/alert';
import { ethers } from 'ethers';

const COLUMNS = [
  {
    Header: 'type',
    accessor: 'tipo',
    minWidth: 60,
    maxWidth: 80,
  },

  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Porcentaje</div>,
    accessor: 'porcentaje',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="ltr:text-right rtl:text-left">{value}</div>
    ),
    minWidth: 60,
    maxWidth: 80,
  },

  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Address</div>,
    accessor: 'wallet',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="flex items-center justify-end">
        <LinkIcon className="h-[18px] w-[18px] ltr:mr-2 rtl:ml-2" /> {value}
      </div>
    ),
    minWidth: 80,
    maxWidth: 100,
  },
  {
    Header: () => <div className="ltr:ml-auto rtl:mr-auto">Amount</div>,
    accessor: 'pago',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="-tracking-[1px] ltr:text-right rtl:text-left">
        <strong className="mb-0.5 flex justify-end text-base md:mb-1.5 md:text-lg lg:text-base 3xl:text-2xl">
          {value}
          <span className="inline-block ltr:ml-1.5 rtl:mr-1.5 md:ltr:ml-2 md:rtl:mr-2">
            TUSD
          </span>
        </strong>
        -
      </div>
    ),
    minWidth: 60,
    maxWidth: 90,
  },
];

//const Pagos = []
export default function TransactionUserTable() {
  const { inversionMinter, productoMinter } = useSelector(
    (state) => state.blockchain
  );

  const { paid } = useSelector((state) => state.Usuario);

  const user = [];

  const infoUser = {
    tipo: 0,
    procentaje: 'Buy',
    address: 'BTC',
    monto: 'Pending',
  };

  /*const data = React.useMemo(() => TransactionData, []);*/

  //segun el tipo de nft cambiara la funcin

  /*const setStakings = async () => {
    let count = await productoMinter.cantPagos();
    let i;
    for (i = 0; i < count; i++) {
      const address = await productoMinter.getWallet(i + 1);
      const monto = await productoMinter.getPagoUser(i + 1);

      //const valor1 =  await inversionMinter.
      //const balance =;
      setStakes((prevState) => ({ ...prevState, id: 'staking' })); //segun la transacion rango y rol
      setStakes((prevState) => ({ ...prevState, valor: '25%' })); //segun el tipo de rango y rol
      setStakes((prevState) => ({ ...prevState, address: address }));
      setStakes((prevState) => ({ ...prevState, monto: monto }));
      //setStakes((prevState) => ({ ...prevState, id: id }));
      user.push(stakes);
      setStakes(infoUser);
    }
  };
  /*const infoPagos = async()=>{
            const cant = await productoMinter.cantPagos()
            let i;  
            if(Pagos.length <  cant ){
            for(i=0; i<cant;i++){
                const paid = await productoMinter.getPagoUser(i+1)
                const wallet = await productoMinter.getWallet(i+1)
                const paidFormat =parseFloat(ethers.utils.formatUnits(paid, 18)).toFixed(2);
                setInfor((prevState) => ({ ...prevState, pago: paidFormat }))
                setInfor((prevState) => ({ ...prevState, wallet: wallet }))
                let tipo;
                if(Usuario.categoria == "Agente X"){
                    tipo= "Compra"
                }
                let porcentaje;
                if(Usuario.rango == "peerx"){
                    porcentaje = "20%" 
                }else if(Usuario.tange == "blockelite"){
                    porcentaje ="25%" 
                }else if(Usuario.tange == "blockmaster"){
                    porcentaje = "35%" 
                }else if(Usuario.tange == "blockcreator"){
                    porcentaje = "40%" 
                }
                    const pago1 = {
                        pago: paidFormat,
                        wallet:wallet,
                        porcentaje:porcentaje,
                        tipo:tipo
                    }

                Pagos.push(pago1)
            }
            }
        }

        useEffect(() => {

            if(call == true){
                infoPagos()
                setCall(false)
            }

        }, [Pagos])*/

  const data = paid;
  const columns = COLUMNS;
  const [stakes, setStakes] = useState(infoUser);
  const Usuario = useSelector((state) => state.Usuario);
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

  return (
    <div className="">
      <div className="rounded-tl-lg rounded-tr-lg bg-white px-4 pt-6 dark:bg-light-dark md:px-8 md:pt-8">
        <div className="flex flex-col items-center justify-between border-b border-dashed border-gray-200 pb-5 dark:border-gray-700 md:flex-row">
          <h2 className="mb-3 shrink-0 text-lg font-medium uppercase text-black dark:text-white sm:text-xl md:mb-0 md:text-2xl">
            Pagos
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
                          <span className="ltr:ml-1 rtl:mr-1">
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
  );
}
