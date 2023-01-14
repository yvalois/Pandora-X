import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/_dashboard';
import NftDetailsF from '@/components/nft/nft-detailsF';
import { nftData } from '@/data/static/single-nft';
import { useEffect, useState } from 'react';
import router from 'next/router';
import { useSelector } from 'react-redux';
import { ethers } from 'ethers';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const NFTDetailsPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const { inventoryf } = useSelector((state: any) => state.blockchain);

  const nftdata = {
    Nombre: '',
    img: '',
    precio: 0,
    descripcion: '',
    id: 0,
  };

  const [nft, setNft] = useState(nftdata);

  useEffect(() => {
    //router.query.id
    const id = router.query.id;

    inventoryf.map((inv) => {
      if (inv.id == id) {
        setNft(inv);
      }
    });
  }, []);

  const Usuario = useSelector((state: any) => state.Usuario);
  useEffect(() => {
    if (
      Usuario.rol !== 'Admin' &&
      Usuario.rol !== 'usuario' &&
      Usuario.rol !== 'cliente'
    ) {
      window.location.href = '/';
    }
  });

  return (
    <>
      <NextSeo
        title="NFT details"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
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
