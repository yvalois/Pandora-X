import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/_dashboard';
import NftDetails from '@/components/nft/nft-detailsP';
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

const productos = [
  {
    Nombre: 'Pandora X NFT - Podcast-Streaming',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Podcast-Streaming%20%282%29.gif',
    precio: 13,
    tipo: 'PS',
    tipoN: 1,
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    Nombre: 'Pandora X NFT - Academia X',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Academia X%20%281%29.gif',
    precio: 13,
    tipo: 'PA',
    tipoN: 2,
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    Nombre: 'Pandora X NFT - NFT Studio',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20NFT%20Studio%20%282%29.gif',
    precio: 13,
    tipo: 'NS',
    tipoN: 3,
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    Nombre: 'Pandora X NFT - Investing Value',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Investing%20Value%20%282%29.gif',
    precio: 13,
    tipo: 'IV',
    tipoN: 4,
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    Nombre: 'Pandora X NFT - Comunidad Privada',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Comunidad%20Privada.gif',
    precio: 13,
    tipo: 'CP',
    tipoN: 5,
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    Nombre: 'Pandora X NFT - Comunidad Gratuita',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Comunidad%20Gratuita.gif',
    precio: 13,
    tipo: 'CG',
    tipoN: 6,
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    Nombre: 'Pandora X NFT - Coaching',

    precio: 13,
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Coaching.gif',
    tipo: 'NC',
    tipoN: 7,
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    Nombre: 'Pandora X NFT - Alpha Report',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Alpha%20Report.gif',
    precio: 13,
    tipo: 'AP',
    tipoN: 8,
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
];

const inversiones = [
  {
    Nombre: 'UBX Card 100',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%20100.gif',
    precio: 100,
    tipo: '100',
    tipoN: 1,
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    Nombre: 'UBX Card 1K',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%201k%20%281%29.gif',
    precio: 100,
    tipo: '1K',
    tipoN: 2,
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    Nombre: 'UBX Card 5K',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%205k.gif',
    precio: 100,
    tipo: '5K',
    tipoN: 3,
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    Nombre: 'UBX Card 10K',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%2010k.gif',
    precio: 100,
    tipo: '10K',
    tipoN: 4,
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    Nombre: 'UBX Card 20K',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%2020k.gif',
    precio: 100,
    tipo: '20K',
    tipoN: 5,
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    Nombre: 'UBX Card 50K',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%2050k.gif',
    precio: 100,
    tipo: '50K',
    tipoN: 6,
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    Nombre: 'UBX Card 100K',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%20100k.gif',
    precio: 100,
    tipo: '100K',
    tipoN: 7,
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
];
const NFTDetailsPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const { inventoryp, inventoryi, producto } = useSelector(
    (state: any) => state.blockchain
  );

  const nftdata = {
    Nombre: '',
    img: '',
    precio: 0,
    tipo: '',
    descripcion: '',
    id: 0,
  };
  const [type, setType] = useState('');
  const [nft, setNft] = useState(nftdata);

  useEffect(() => {
    //router.query.id
    const id = router.query.id;

    inventoryp.map((inv) => {
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
        description="Nft-Sudio powered by Pandorax"
      />
      <NftDetails tipo={'pcomprado'} />
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
