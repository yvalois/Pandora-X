import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/_dashboard';
import NftDetails from '@/components/nft/nft-details';
import { nftData } from '@/data/static/single-nft';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { ethers } from 'ethers';
import { getMintedNftProducts } from '@/redux/Minted/MintedAction';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const NFTDetailsPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const nftdata = {
    Nombre: '',
    img: '',
    precio: 0,
    tipo: '',
    tipoN: 0,
    descripcion: '',
  };
  const [type, setType] = useState('');
  const [nft, setNft] = useState(nftdata);
  const Usuario = useSelector((state: any) => state.Usuario);
  const { productos, inversiones } = useSelector((state) => state.minted);

  const dispatch = useDispatch<AppDispatch>();

  const t = Router;

  const getNft = async () => {
    await dispatch(getMintedNftProducts());
  };

  useEffect(() => {
    const fetch = async () => {
      await getNft();
    };
    fetch();
  }, []);

  useEffect(() => {
    //Router.query.id
    const tipo = Router.query.tipo;

    productos.map((producto) => {
      if (producto.tipo == tipo) {
        setNft(producto);
        setType('producto');
      }
    });

    inversiones.map((inversion) => {
      if (inversion.tipo == tipo) {
        setNft(inversion);
        setType('inversion');
      }
    });
  }, []);

  /*useEffect(() => {
    if (
      Usuario.rol !== 'Admin' &&
      Usuario.rol !== 'usuario' &&
      Usuario.rol !== 'cliente'
    ) {
      window.location.href = '/';
    }
  });*/

  return (
    <>
      <NextSeo
        title="NFT details"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <NftDetails product={nft} type={type} />
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
