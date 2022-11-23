import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import ListCard from '@/components/ui/list-card';
import TransactionSearchForm from '@/components/author/transaction-search-form';
import TransactionHistory from '@/components/author/transaction-history';
import CollectionCard from '@/components/ui/collection-card';
import { useSelector } from 'react-redux';
import NFTGrid from '@/components/ui/nft-card';
import StakingTable from '@/components/transaction/stakingTable';
// static data
import { collections } from '@/data/static/collections';
import {
  authorWallets,
  authorNetworks,
  authorProtocols,
} from '@/data/static/author-profile';
import { useEffect, useState } from 'react';

export default function ProfileTab() {
  const [currentItems, setCurrentItems] = useState([]);
  const [currentInv, setCurrentInv] = useState([]);

  const { inventoryp, inventoryi } = useSelector(
    (state: any) => state.blockchain
  );

  useEffect(() => {
    setCurrentItems(inventoryp);
    setCurrentInv(inventoryi);
  }, [inventoryp, inventoryi]);

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
      ]}
    >
      <TabPanel className="focus:outline-none">
        <div className="grid gap-4 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-5 xl:gap-6 3xl:grid-cols-3 4xl:grid-cols-4">
          {currentItems?.map((nft) => (
            <NFTGrid
              key={nft.name}
              name={nft.name}
              image={nft.image}
              price={82}
              number={nft.number}
              alldata={false}
            />
          ))}
        </div>
      </TabPanel>
      <TabPanel className="focus:outline-none">
        <div className="grid gap-4 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-5 xl:gap-6 3xl:grid-cols-3 4xl:grid-cols-4">
          {currentInv?.map((nft) => (
            <NFTGrid
              key={nft.name}
              name={nft.name}
              image={nft.image}
              price={82}
              number={nft.number}
              alldata={false}
            />
          ))}
        </div>
      </TabPanel>
      <TabPanel className="focus:outline-none">
        <div className="w-[100%] lg:w-[100%] ltr:lg:pr-6 rtl:lg:pl-6 2xl:w-[100%] 3xl:w-[100%]">
          <StakingTable />
        </div>
      </TabPanel>
    </ParamTab>
  );
}
