import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/_dashboard';
import NftDetailsFG from '@/components/nft/nft-detailsF-general';

import { nftData } from '@/data/static/single-nft';
import { useEffect, useState } from 'react';
import router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { ethers } from 'ethers';
import { connectWallet } from '@/redux/Blockchain/blockchainAction';
import { useAccount } from 'wagmi';
import { useModal } from '@/components/modal-views/context';
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const GeneralPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const { inventoryf, isConnect } = useSelector(
    (state: any) => state.blockchain
  );

  const { openModal, closeModal } = useModal();

  useEffect(() => {
    const is = window.localStorage.getItem('wagmi.store');
    const es = JSON.parse(is);

    const si = es.state.data.account;
    if (si != undefined && !isConnect) {
      openModal('WALLET_CONNECT_VIEW');
    }
  }, [isConnect]);

  return (
    <>
      <NextSeo
        title="NFT details"
        description="Nft-Sudio powered by Pandorax"
      />
      <NftDetailsFG />
    </>
  );
};

GeneralPage.getLayout = function getLayout(page) {
  return <DashboardLayout contentClassName="!pb-0">{page}</DashboardLayout>;
};

export default GeneralPage;
