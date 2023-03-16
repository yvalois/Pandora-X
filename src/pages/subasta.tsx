import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/_dashboard';
import NftDetailsAuction from '@/components/nft/nft-details-auction';
import { nftData } from '@/data/static/single-nft';
import { useEffect, useState } from 'react';
import router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { ethers } from 'ethers';
import { connectWallet } from '@/redux/Blockchain/blockchainAction';
import { useAccount, useProvider, useSigner } from 'wagmi';
import { useModal } from '@/components/modal-views/context';
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const SubastaPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const { inventoryf, isConnect } = useSelector(
    (state: any) => state.blockchain
  );

  const Usuario = useSelector((state: any) => state.Usuario);

  const _provider = useProvider();
  const { data: signer, isError, isLoading: arroz } = useSigner();
  const { address } = useAccount();
  const dispatch = useDispatch<AppDispatch>();

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
      <NftDetailsAuction />
    </>
  );
};

SubastaPage.getLayout = function getLayout(page) {
  return <DashboardLayout contentClassName="!pb-0">{page}</DashboardLayout>;
};

export default SubastaPage;