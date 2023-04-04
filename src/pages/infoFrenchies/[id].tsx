import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/_dashboard';
import NftDetailsF from '@/components/nft/nft-detailsF';
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

const NFTDetailsPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const { inventoryf, isConnect, inventoryf2 } = useSelector(
    (state: any) => state.blockchain
  );

  const nftdata = {
    Nombre: '',
    img: '',
    precio: 0,
    descripcion: '',
    attributes: [{}],
    id: 0,
  };

  const [nft, setNft] = useState(nftdata);

  useEffect(() => {
    //router.query.id
    const id = router.query.id;

    inventoryf.map((inv) => {
      if (inv.id == id) {
        const nftdata = {
          Nombre: inv.name,
          img: inv.image,
          precio: inv.precio,
          descripcion: inv.descripcion,
          attributes: inv.attributes,
          id: inv.id,
        };
        console.log(nftdata);
        setNft(nftdata);
      }
    });
    inventoryf2.map((inv) => {
      if (inv.id == id) {
        const nftdata = {
          Nombre: inv.name,
          img: inv.image,
          precio: inv.precio,
          descripcion: inv.descripcion,
          attributes: inv.attributes,
          id: inv.id,
        };
        console.log(nftdata);
        setNft(nftdata);
      }
    });
  }, [inventoryf, inventoryf2]);

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
      <NftDetailsF Nft={nft} />
    </>
  );
};

NFTDetailsPage.getLayout = function getLayout(page) {
  return <DashboardLayout contentClassName="!pb-0">{page}</DashboardLayout>;
};

export default NFTDetailsPage;

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};
