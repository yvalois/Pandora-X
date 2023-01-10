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
  const [currentF, setCurrentF] = useState([]);

  const { inventoryp, inventoryi, inventoryf, frenchiesMinter } = useSelector(
    (state: any) => state.blockchain
  );

  const getData = async () => {
    //const item = currentF[0].id
    const data = await frenchiesMinter.tokenURI(0);

    const _data = data.toString();

    setTimeout(() => {
      console.log(_data);
      fetch(
        'https://aqua-many-alpaca-308.mypinata.cloud/ipfs/QmckrnsqYqVAP8E281xCL8WBebMgcqxbo8aZUDEY3jZ8az',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
        });
    }, 5000);
  };

  useEffect(() => {
    setCurrentItems(inventoryp);
    setCurrentInv(inventoryi);
    setCurrentF(inventoryf);

    setTimeout(() => {}, 5000);
  }, [inventoryp, inventoryi, inventoryf]);

  return (
    <ParamTab
      tabMenu={[
        /*{
          title: 'Mis productos',
          path: 'productos',
        },
        {
          title: 'Inversiones',
          path: 'inversiones',
        }, */
        {
          title: 'My NFTs',
          path: 'coleccion',
        },
        {
          title: 'Staking',
          path: 'staking',
        },
      ]}
    >
      {/* <TabPanel className="vw-[100%] focus:outline-none">
        <div className="grid gap-4 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-5 xl:gap-6 xl:space-x-8 3xl:grid-cols-3 4xl:grid-cols-4">
          {currentItems?.map((nft) => (
            <NFTGrid
              key={nft.Nombre}
              name={nft.Nombre}
              image={nft.img}
              price={nft.precio}
              number={nft.id}
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
          </TabPanel> */}
      {/* <TabPanel className="focus:outline-none">
        <div className="grid h-[100%] w-[100%] gap-4 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-5 xl:gap-6 xl:space-x-8 3xl:grid-cols-3 4xl:grid-cols-4">
          {currentInv?.map((nft) => (
            <NFTGrid
              key={nft.Nombre}
              name={nft.Nombre}
              image={nft.img}
              price={nft.precio}
              number={nft.id}
              alldata={false}
              type={'staking'}
            />
          ))}

          {currentInv.length == 0 && (
            <div className=" flex h-full  w-full justify-center self-center">
              <div className="w-full items-center justify-center">
                <div className=" h-full w-full">
                  <span>
                    <h1 className="md:text-md text-gray-600 md:w-[500px] xl:w-[700px] xl:text-lg">
                      No tienes Nft's de Inversion
                    </h1>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
          </TabPanel> */}
      <TabPanel className="focus:outline-none">
        <div className="grid h-full w-full  gap-4 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-5 xl:gap-6 xl:space-x-8 3xl:grid-cols-3 4xl:grid-cols-4">
          {currentF?.map((nft) => (
            <NFTGrid
              key={nft.Nombre}
              name={nft.Nombre}
              image={
                'https://gateway.pinata.cloud/ipfs/QmaCeYr88rrDvjxMPHfKtihuq7DmYYzfjkeKC2A4BD8EfW'
              }
              price={13}
              number={nft.id}
              alldata={false}
              type={'Frenchies Blues'}
            />
          ))}
          {currentF.length == 0 && (
            <div className="flex h-full w-full  items-center justify-center ">
              <div className=" h-full w-full">
                <span>
                  <h1 className="md:text-md text-gray-600 md:w-[500px] xl:w-[700px] xl:text-lg">
                    No tienes Nft's
                  </h1>
                </span>
              </div>
            </div>
          )}
        </div>
      </TabPanel>

      <TabPanel className="w-full focus:outline-none  ">
        <div className="grid h-full w-full  gap-4 xs:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 lg:gap-5 xl:gap-6 xl:space-x-8 3xl:grid-cols-1 4xl:grid-cols-1">
          <StakingTable />
        </div>
      </TabPanel>
    </ParamTab>
  );
}
