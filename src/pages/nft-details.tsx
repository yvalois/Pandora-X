import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/_dashboard';
import NftDetails from '@/components/nft/nft-detailsI';
import { nftData } from '@/data/static/single-nft';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const NFTDetailsPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  return (
    <>
      <NextSeo
        title="NFT details"
        description="Nft-Sudio powered by Pandorax"
      />
      <NftDetails product={nftData} />
    </>
  );
};

NFTDetailsPage.getLayout = function getLayout(page) {
  return <DashboardLayout contentClassName="!pb-0">{page}</DashboardLayout>;
};

export default NFTDetailsPage;
