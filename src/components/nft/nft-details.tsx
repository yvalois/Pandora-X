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
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ethers } from 'ethers';
import { uProduct, uInvertion } from '../../redux/Blockchain/blockchainAction';

interface NftFooterProps {
  className?: string;
  currentBid: any;
  auctionTime: Date | string | number;
  isAuction?: boolean;
  price?: number;
}

type Avatar = {
  id: string | number;
  name: string;
  slug: string;
  logo: StaticImageData;
};

export default function NftDetails({ product, type }) {
  const { img, nombre, descripcion, precio, id, tipo, tipoN } = product;

  const [tokenAddress, setTokenAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [cuenta, setCuenta] = useState('');
  const [approvedUsdt, setApprovedUsdt] = useState(0);
  const [approvedToken, setApprovedToken] = useState(0);
  const Usuario = useSelector((state) => state.Usuario);

  const {
    productoMinter,
    inversionMinter,
    isConnect,
    accountAddress,
    usdtContract,
    tokenContract,
  } = useSelector((state) => state.blockchain);

  const { referidor } = useSelector((state) => state.Usuario);
  const dispatch = useDispatch<AppDispatch>();

  const verifyApprove = async () => {
    try {
      if (type == 'producto') {
        const usdt = await tokenContract.allowance(
          accountAddress,
          productoMinter.address
        ); //MarketPlace
        //setApprovedUsdt(ethers.utils.formatUnits(usdt, 18));
        setApprovedToken(ethers.utils.formatUnits(usdt, 18));
      } else if (type == 'inversion') {
        const usdt = await tokenContract.allowance(
          accountAddress,
          inversionMinter.address
        ); //MarketPlace
        //setApprovedUsdt(ethers.utils.formatUnits(usdt, 18));
        setApprovedToken(ethers.utils.formatUnits(usdt, 18));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const approve = async () => {
    setLoading(true);
    alert(type);
    try {
      if (type == 'producto') {
        setTokenAddress(tokenContract.address);

        const decimals = 18;

        console.log(tokenContract);

        const tx = await tokenContract.approve(
          productoMinter.address,
          ethers.utils.parseUnits(product.precio.toString(), decimals)
        );

        await tx.wait();
        await verifyApprove();
        setLoading(false);
      } else if (type == 'inversion') {
        setTokenAddress(tokenContract.address);
        const decimals = 18;
        const tx = await tokenContract.approve(
          inversionMinter.address,
          ethers.utils.parseUnits(product.precio.toString(), decimals)
        );

        await tx.wait();
        await verifyApprove();
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const buyNft = async () => {
    setLoading(true);
    try {
      if (type == 'producto') {
        if (!Usuario.isReferido && Usuario.type == 'Agente X') {
          let porcentaje = 0;
          if (Usuario.range == 'peerx') {
            porcentaje = 200;
          } else if (Usuario.range == 'blockelite') {
            porcentaje = 250;
          } else if (Usuario.range == 'blockmaster') {
            porcentaje = 350;
          } else if (Usuario.range == 'blockcreator') {
            porcentaje = 400;
          }

          const tx = await productoMinter.buyTokenWithReferido(
            tipoN,
            tokenContract.address,
            referidor,
            porcentaje
          );
          //referidos
          await tx.wait();
          setLoading(false);
          setApprovedToken(0);
          dispatch(uProduct());
        } else {
          const tx = await productoMinter.buyToken(
            tipoN,
            tokenContract.address
          );

          await tx.wait(); //tener en cuenta para los proximos cambios
          setLoading(false);
          setApprovedToken(0);
          dispatch(uProduct());
        }
      } else if (type == 'inversion') {
        const tx = await inversionMinter.buyToken(tipoN, tokenContract.address);
        await tx.wait();
        setLoading(false);
        setApprovedToken(0);
        dispatch(uInvertion());
      }
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-grow">
      <div className="mx-auto flex w-full flex-grow flex-col transition-all xl:max-w-[1360px] 4xl:max-w-[1760px]">
        <div className="relative mb-5 flex flex-grow items-center justify-center md:pb-7 md:pt-4 ltr:md:left-0 ltr:md:pl-6 rtl:md:right-0 rtl:md:pr-6 lg:fixed lg:mb-0 lg:h-[calc(100%-96px)] lg:w-[calc(100%-492px)] ltr:lg:pl-8 rtl:lg:pr-8 xl:w-[calc(100%-550px)] ltr:xl:pr-12 ltr:xl:pl-[340px] rtl:xl:pl-12 rtl:xl:pr-[340px] ltr:2xl:pl-96 rtl:2xl:pr-96 3xl:w-[calc(100%-632px)] ltr:4xl:pl-0 rtl:4xl:pr-0">
          <div className="flex h-full max-h-full w-full items-center justify-center lg:max-w-[768px]">
            <div className="relative aspect-square max-h-full w-full overflow-hidden rounded-lg">
              <Image
                src={img}
                //placeholder="blur"
                layout="fill"
                objectFit="cover"
                alt=""
                className="h-full bg-gray-200 dark:bg-light-dark"
              />
            </div>
          </div>
        </div>

        <div className="relative mt-10 flex w-full flex-grow flex-col justify-between ltr:md:ml-auto ltr:md:pl-8 rtl:md:mr-auto rtl:md:pr-8 lg:min-h-[calc(100vh-96px)] lg:w-[460px] ltr:lg:pl-12 rtl:lg:pr-12 xl:w-[592px] ltr:xl:pl-20 rtl:xl:pr-20">
          <div className="block">
            <div className="block">
              <div className="flex justify-between">
                <h2 className="text-xl font-medium leading-[1.45em] -tracking-wider text-gray-900 dark:text-white md:text-2xl xl:text-3xl">
                  {nombre}
                </h2>
              </div>

              <h6 className="mt-2  text-2xl text-gray-900  dark:text-white">
                <span>{precio}$ USDT </span>
              </h6>
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
                        {descripcion}
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 justify-evenly space-x-10">
                    {type !== 'invcomprado' &&
                      type !== 'pcomprado' &&
                      product.precio > approvedToken && (
                        <Button onClick={approve}>Approve</Button>
                      )}

                    {type !== 'pcomprado' && type !== 'invcomprado' && (
                      <Button>Buy without cripto</Button>
                    )}

                    {type !== 'invcomprado' &&
                      type !== 'pcomprado' &&
                      product.precio <= approvedToken && (
                        <Button onClick={() => buyNft()}>Buy</Button>
                      )}

                    {type == 'pcomprado' && type !== 'invcomprado' && (
                      <Button onClick={() => buyNft()}>transfer</Button>
                    )}

                    {type == 'invcomprado' && (
                      <Button onClick={() => buyNft()}>Stake</Button>
                    )}
                    {type == 'invcomprado' && (
                      <Button onClick={() => buyNft()}>Transfer</Button>
                    )}
                  </div>
                </TabPanel>
              </ParamTab>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
