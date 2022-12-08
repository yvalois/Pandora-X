import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import ListCard from '@/components/ui/list-card';
import TransactionSearchForm from '@/components/author/transaction-search-form';
import TransactionHistory from '@/components/author/transaction-history';
import CollectionCard from '@/components/ui/collection-card';
import { useDispatch, useSelector } from 'react-redux';
import NFTGrid from '@/components/ui/nft-card';
import StakingTable from '@/components/transaction/stakingTable';
import TransactionUserTable from '@/components/transaction/transactionUserTable';
// static data
import { collections } from '@/data/static/collections';
import {
  authorWallets,
  authorNetworks,
  authorProtocols,
} from '@/data/static/author-profile';
import { useEffect, useState } from 'react';
import { getMintedNftProducts } from '@/redux/Minted/MintedAction';

export default function ProfileTabUser() {
  const [currentItems, setCurrentItems] = useState([]);
  const [currentInv, setCurrentInv] = useState([]);

  const { inventoryp, inventoryi } = useSelector(
    (state: any) => state.blockchain
  );

  const { dataloaded, disponibleNftp, disponibleNfti, priceFormat, MintedNft } =
    useSelector((state: any) => state.minted);

  const Usuario = useSelector((state: any) => state.blockchain.rol);
  const dispatch = useDispatch<AppDispatch>();

  const getNft = async () => {
    await dispatch(getMintedNftProducts());
  };

  useEffect(() => {
    const fetchItems = async () => {
      await getNft();
      //const itemsPerPage = 6
      //const start = (currentPage - 1) * itemsPerPage
      setCurrentItems(inventoryp);
      setCurrentInv(inventoryi);
    };
    fetchItems();
  }, [currentItems, dataloaded]);

  return (
    <ParamTab
      tabMenu={[
        {
          title: 'Mis productos',
          path: 'productos',
        },
        {
          title: 'Inversiones',
          path: 'inversiones',
        },
        {
          title: 'Staking',
          path: 'staking',
        },
        {
          title: 'Pagos',
          path: 'pagos',
        },
      ]}
    >
      <TabPanel className="w-full focus:outline-none">
        <div className="grid w-full gap-4 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-5 xl:gap-6 3xl:grid-cols-3 4xl:grid-cols-4">
          {currentItems?.map((nft) => (
            <NFTGrid
              key={nft.Nombre}
              name={nft.Nombre}
              image={nft.img}
              price={13}
              number={nft.id}
              tipo={nft.tipoN}
              alldata={false}
              type={'productos'}
            />
          ))}
          {currentItems.length == 0 && (
            <div className=" flex h-full  w-full justify-center self-center">
              <div className="w-full items-center justify-center">
                <div className=" h-full w-full">
                  <span>
                    <h1 className="md:text-md text-gray-600 md:w-[500px] xl:w-[700px] xl:text-lg">
                      No tienes Nft's de productos
                    </h1>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </TabPanel>
      <TabPanel className="h-full w-full focus:outline-none">
        <div className="grid h-full w-full gap-4 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-5 xl:gap-6 3xl:grid-cols-3 4xl:grid-cols-4">
          {currentInv?.map((nft) => (
            <NFTGrid
              key={nft.Nombre}
              name={nft.Nombre}
              image={nft.img}
              price={13}
              number={nft.id}
              alldata={false}
              type={'staking'}
            />
          ))}
          {currentInv.length == 0 && (
            <div className="flex h-full w-full  items-center justify-center ">
              <div className=" h-full w-full">
                <span>
                  <h1 className="md:text-md text-gray-600 md:w-[500px] xl:w-[700px] xl:text-lg">
                    No tienes Nft's de inversion
                  </h1>
                </span>
              </div>
            </div>
          )}
        </div>
      </TabPanel>
      <TabPanel className="focus:outline-none">
        <div className="w-[100%] lg:w-[100%] ltr:lg:pr-6 rtl:lg:pl-6 2xl:w-[100%] 3xl:w-[100%]">
          <StakingTable />
        </div>
      </TabPanel>

      <TabPanel className="focus:outline-none">
        <div className="w-[100%] lg:w-[100%] ltr:lg:pr-6 rtl:lg:pl-6 2xl:w-[100%] 3xl:w-[100%]">
          <TransactionUserTable />
        </div>
      </TabPanel>
    </ParamTab>
  );
}
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
