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

  return (
    <>
      <NextSeo
        title="Panel de Retiro  "
        description="Administracion de Usuarios"
      />

      <div className="h-full w-full">
        <div className="space-between mt-[15%] flex flex-col justify-center align-middle">
          <div className="mb-[20px] w-[50%] self-center">
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
            <h1>Balance: {5000} ETH</h1>
          </div>

          <div className="mb-[20px] self-center">
            <Button> Retirar</Button>
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
