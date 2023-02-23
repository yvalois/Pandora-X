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
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const NFTDetailsPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const { inventoryf, isConnect } = useSelector(
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
          id: 0,
        };
        setNft(nftdata);
      }
    });
  }, [inventoryf]);

  const Usuario = useSelector((state: any) => state.Usuario);

  const _provider = useProvider();
  const { data: signer, isError, isLoading: arroz } = useSigner();
  const { address } = useAccount();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!isConnect) {
      if (address?.length > 0) {
        dispatch(connectWallet(address, _provider, signer));
      } else if (
        Usuario.rol !== 'Admin' &&
        Usuario.rol !== 'usuario' &&
        Usuario.rol !== 'cliente'
      ) {
        window.location.href = '/';
      }
    }
  }, []);

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
