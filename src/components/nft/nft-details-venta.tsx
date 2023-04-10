import cn from 'classnames';
import { StaticImageData } from 'next/image';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import Image from '@/components/ui/image';
import FeaturedCard from '@/components/nft/featured-card';
import ListCard from '@/components/ui/list-card';
import AuctionCountdown from '@/components/nft/auction-countdown';
import AnchorLink from '@/components/ui/links/anchor-link';
import Button from '@/components/ui/button';
import { ArrowLinkIcon } from '@/components/icons/arrow-link-icon';
import { DotsIcon } from '@/components/icons/dots-icon';
import Avatar1 from '@/assets/images/avatar/3.png';
import { useModal } from '@/components/modal-views/context';
import { nftData } from '@/data/static/single-nft';
import NftDropDown from './nft-dropdown';
import Avatar from '@/components/ui/avatar';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ethers } from 'ethers';

interface NftFooterProps {
  className?: string;
  currentBid: any;
  auctionTime: Date | string | number;
  isAuction?: boolean;
  price?: number;
}

function NftFooter({ className = 'md:hidden', currentBid }: NftFooterProps) {
  const { openModal } = useModal();
  const [isFinish, setIsFinish] = useState(true);
  const { accountAddress, ventasContract, chainId } = useSelector(
    (state) => state.blockchain
  );
  const [status, setStatus] = useState(0);
  const [alertMsg, setAlertMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [comprado, setComprado] = useState(true);

  const Comprar = async () => {
    if (chainId == 5) {
      setLoading(true);
      try {
        const bid = currentBid.price;
        const options = {
          value: ethers.utils.parseUnits(bid.toString(), 'wei'),
        };
        const tx = await ventasContract.buyNFT(currentBid.id, options);
        await tx.wait();
        setStatus(200);
        setLoading(false);
        setAlertMsg('Transaccion completada correctamente');
      } catch (err) {
        setLoading(false);
        setStatus(100);
        const mess = err.message.split('[');
        const rejected = mess[0].split(' ');
        console.log(err);
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

  const Reclamar = async () => {
    if (chainId == 5) {
      setLoading(true);
      try {
        const tx = await ventasContract.cancelSale(currentBid.id);
        await tx.wait();
        setStatus(200);
        setLoading(false);
        setAlertMsg('Transaccion completada correctamente');
      } catch (err) {
        setLoading(false);
        setStatus(100);
        const mess = err.message.split('[');
        const rejected = mess[0].split(' ');
        console.log(err);
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

  useEffect(() => {
    setTimeout(() => {
      if (status != 0) {
        setStatus(0);
        window.location.href = '/frenchies';
      }
    }, 3000);
  }, [status]);

  return (
    <div
      className={cn(
        'sticky bottom-0 z-10 bg-body dark:bg-dark md:-mx-2',
        className
      )}
    >
      <div className="-mx-4 border-t-2 border-gray-900 px-4 pt-4 pb-5 dark:border-gray-700 sm:-mx-6 sm:px-6 md:mx-2 md:px-0 md:pt-5 lg:pt-6 lg:pb-7">
        {currentBid.active && (
          <div className="flex gap-4 pb-3.5 md:pb-4 xl:gap-5">
            <div className="block w-1/2 shrink-0 md:w-2/5">
              <h3 className="mb-1 truncate text-13px font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:mb-1.5 sm:text-sm">
                Current bid <span className="md:hidden">by</span>{' '}
                <AnchorLink
                  href={'#'}
                  className="normal-case text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:hidden"
                >
                  @{currentBid?.currentWinner}
                </AnchorLink>
              </h3>
              <div className="text-lg font-medium -tracking-wider md:text-xl xl:text-2xl">
                {parseFloat(currentBid?.price / 1000000000000000000).toFixed(3)}{' '}
                ETH
              </div>
            </div>
            {/*<div className="block w-1/2 shrink-0 md:w-3/5">
              <h3 className="mb-1 truncate text-13px font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:mb-1.5 sm:text-sm">
                Auction ends in
              </h3>
              <AuctionCountdown date={dateTime - (3600 * 1000)} />
        </div>*/}
          </div>
        )}

        {currentBid.owner == accountAddress && (
          <div className="grid grid-cols-2 gap-3">
            {!loading && (
              <Button
                shape="rounded"
                variant="solid"
                color="gray"
                className="dark:bg-gray-800"
                onClick={Reclamar}
              >
                Retirar
              </Button>
            )}
            {loading && (
              <Button
                shape="rounded"
                variant="solid"
                color="gray"
                className="dark:bg-gray-800"
              >
                Cargando
              </Button>
            )}
            <Button
              shape="rounded"
              variant="solid"
              color="gray"
              className="dark:bg-gray-800"
              onClick={() => openModal('SHARE_VIEW')}
            >
              SHARE
            </Button>
          </div>
        )}

        {currentBid.owner != accountAddress && (
          <div className="grid grid-cols-2 gap-3">
            {!loading && (
              <Button shape="rounded" onClick={Comprar}>
                {`Comprar ${parseFloat(
                  currentBid?.price / 1000000000000000000
                ).toFixed(3)} ETH`}
              </Button>
            )}

            {loading && <Button shape="rounded">Cargando</Button>}
            <Button
              shape="rounded"
              variant="solid"
              color="gray"
              className="dark:bg-gray-800"
              onClick={() => openModal('SHARE_VIEW')}
            >
              SHARE
            </Button>
          </div>
        )}

        <div className="mt-2 flex w-full justify-center align-middle">
          {status == 200 && (
            <div
              className="flex w-[400px] justify-center rounded-lg bg-green-200 p-4 align-middle text-sm text-green-700 dark:bg-green-200 dark:text-green-800"
              role="alert"
            >
              <span className="text-center font-medium">{alertMsg}</span>
            </div>
          )}

          {status == 100 && (
            <div
              className="flex w-[400px] justify-center rounded-lg bg-red-200  p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
              role="alert"
            >
              <span className="text-center font-medium">{alertMsg}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type Avatar = {
  id: string | number;
  name: string;
  slug: string;
  logo: StaticImageData;
};
type NftDetailsProps = {
  isAuction?: boolean;
  image: StaticImageData;
  name: string;
  description: string;
  minted_date: string;
  minted_slug: string;
  price: number;
  creator: Avatar;
  collection: Avatar;
  owner: Avatar;
  block_chains: Avatar[];
};

export default function NftDetailsVenta() {
  const nftdata = {
    id: '',
    seller: '',
    startBlock: 0,
    endBlock: 0,
    startPrice: 0,
    currentPrice: 0,
    currentWinner: '',
    active: false,
    name: '',
    image: '',
    id: 0,
    type: '',
    description: '',
  };

  const [nft, setNft] = useState(nftdata);

  useEffect(() => {
    const storedJsonString = window.localStorage.getItem('nft');
    const storedObject = JSON.parse(storedJsonString);
    setNft(storedObject);
    console.log(storedObject);
  }, []);

  const blockChain = [
    {
      id: 1,
      logo: {
        src: 'https://seeklogo.com/images/E/ethereum-classic-eth-etc-logo-B0094454A6-seeklogo.com.png',
        height: 32,
        width: 32,
      },
      name: 'Ethereum',
      slug: '#',
    },
  ];

  const creator = {
    id: 1,
    logo: {
      src: '/_next/static/media/Pandora-X-icon-04.6bfef801.svg',
      height: 32,
      width: 32,
    },
    name: '@pandorax',
    slug: '#',
  };
  const collecion = {
    id: 1,
    logo: {
      src: 'https://i.seadn.io/gcs/files/fcc9fed18a60cee2ab8e6d47a693b8bf.jpg?auto=format&w=1920',
      height: 32,
      width: 32,
    },
    name: 'Fr3nchies',
    slug: '#',
  };

  const owner = {
    id: 1,
    logo: {
      src: '/_next/static/media/Pandora-X-icon-04.6bfef801.svg',
      height: 32,
      width: 32,
    },
    name: '@pandorax',
    slug: '#',
  };

  const bidder = [
    {
      amount: nft.currentPrice,
      authorSlug: '#',
      avatar: {
        blurDataURL:
          '/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F2.3e7881c0.png&w=8&q=70',
        blurHeight: 8,
        blurWidth: 8,
        height: 40,
        src: '/_next/static/media/2.3e7881c0.png',
        width: 40,
      },
      id: 2,
      label: 'Puja hecha',
      name: nft.currentWinner,
      transactionUrl: '#',
    },
  ];

  return (
    <div className="flex flex-grow">
      <div className="mx-auto flex w-full flex-grow flex-col transition-all xl:max-w-[1360px] 4xl:max-w-[1760px]">
        <div className="rtl:md:t-6 relative mb-5 flex flex-grow items-center justify-center md:pb-7 md:pt-4 ltr:md:left-0 ltr:md:pl-6 rtl:md:right-0 lg:fixed lg:mb-0 lg:h-[calc(100%-96px)] lg:w-[calc(100%-492px)] ltr:lg:pl-8 rtl:lg:pr-8 xl:w-[calc(100%-550px)] ltr:xl:pr-12 ltr:xl:pl-[340px] rtl:xl:pl-12 rtl:xl:pr-[340px] ltr:2xl:pl-96 rtl:2xl:pr-96 3xl:w-[calc(100%-632px)] ltr:4xl:pl-0 rtl:4xl:pr-0">
          <div className="flex h-full max-h-full w-full items-center justify-center lg:max-w-[768px]">
            <div className="relative aspect-square max-h-full w-full overflow-hidden rounded-lg">
              <Image
                src={nft.image}
                //placeholder="blur
                layout="fill"
                objectFit="cover"
                alt=""
                className="h-full bg-gray-200 dark:bg-light-dark"
              />
            </div>
          </div>
        </div>

        <div className="relative flex w-full flex-grow flex-col justify-between ltr:md:ml-auto ltr:md:pl-8 rtl:md:mr-auto rtl:md:pr-8 lg:min-h-[calc(100vh-96px)] lg:w-[460px] ltr:lg:pl-12 rtl:lg:pr-12 xl:w-[592px] ltr:xl:pl-20 rtl:xl:pr-20">
          <div className="block">
            <div className="block">
              <div className="flex justify-between">
                <h2 className="text-xl font-medium leading-[1.45em] -tracking-wider text-gray-900 dark:text-white md:text-2xl xl:text-3xl">
                  {nft.name}
                </h2>
                <div className="mt-1.5 shrink-0 ltr:ml-3 rtl:mr-3 xl:mt-2">
                  <NftDropDown />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-6 pt-0.5 lg:-mx-6 lg:mt-6 lg:gap-0">
                <div className="shrink-0 border-dashed border-gray-200 dark:border-gray-700 lg:px-6 lg:ltr:border-r lg:rtl:border-l">
                  <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                    Created By
                  </h3>

                  <ListCard
                    item={creator}
                    className="rounded-full p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  />
                </div>
                <div className="shrink-0 lg:px-6">
                  <h3 className="text-heading-style mb-2.5 uppercase text-gray-900 dark:text-white">
                    Collection
                  </h3>

                  <ListCard
                    item={collecion}
                    className="rounded-full p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-col pb-5 xl:mt-9">
              <ParamTab
                tabMenu={[
                  {
                    title: 'Details',
                    path: 'details',
                  },
                ]}
              >
                <TabPanel className="focus:outline-none">
                  <div className="space-y-6">
                    <div className="block">
                      <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                        Description
                      </h3>
                      <div className="text-sm leading-6 -tracking-wider text-gray-600 dark:text-gray-400">
                        The Frenchies Blue collection combines fantastic art
                        with detailed tokenomics and fun gamification. Holders
                        have DEFI utility, also have access to the private
                        membership, which includes networking and collaboraFtion
                        opportunities with other professionals, as well as the
                        opportunity to participate in group discussion and
                        brainstorming sessions.
                      </div>
                    </div>
                    <div className="block">
                      <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                        Owner
                      </h3>
                      <AnchorLink href={owner?.slug} className="inline-block">
                        <ListCard
                          item={owner}
                          className="rounded-full p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        />
                      </AnchorLink>
                    </div>
                    <div className="block">
                      <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                        Block Chain
                      </h3>
                      <div className="flex flex-col gap-2">
                        {blockChain?.map((item: any) => (
                          <AnchorLink
                            href="#"
                            className="inline-flex"
                            key={item?.id}
                          >
                            <ListCard
                              item={item}
                              className="rounded-full p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                            />
                          </AnchorLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </ParamTab>
            </div>
          </div>
          <NftFooter className="hidden md:block" currentBid={nft} />
        </div>
        <NftFooter currentBid={nft} />
      </div>
    </div>
  );
}
