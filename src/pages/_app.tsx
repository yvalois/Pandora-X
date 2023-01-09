// import type { AppProps } from 'next/app';
// import type { NextPageWithLayout } from '@/types';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'next-themes';
import ModalsContainer from '@/components/modal-views/container';
import DrawersContainer from '@/components/drawer-views/container';
import SettingsButton from '@/components/settings/settings-button';
import SettingsDrawer from '@/components/settings/settings-drawer';
import { WalletProvider } from '@/lib/hooks/use-connect';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';

// base css file
import 'swiper/css';
import '@/assets/css/scrollbar.css';
import '@/assets/css/globals.css';
import '@/assets/css/range-slider.css';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { alchemyProvider } from 'wagmi/providers/alchemy';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from '@web3modal/ethereum';

import { configureChains, createClient, WagmiConfig } from 'wagmi';
import {
  arbitrum,
  avalanche,
  bsc,
  fantom,
  mainnet,
  optimism,
  polygon,
  goerli,
} from 'wagmi/chains';

/*type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};*/

function CustomApp({ Component, pageProps } /*: AppPropsWithLayout*/) {
  const [domLoaded, setDomLoaded] = useState(false);

  const { chains, provider, webSocketProvider } = configureChains(
    [polygon],
    [alchemyProvider({ apiKey: 'gcYJsxItcYNjfy01aHklipg1J6foSUFn' })]
  );

  const client = createClient({
    autoConnect: false,
    connectors: [
      new MetaMaskConnector({
        chains,
        options: {
          UNSTABLE_shimOnConnectSelectAccount: true,
        },
      }),
      /*  new CoinbaseWalletConnector({
        chains,
        options: {
          appName: 'wagmi',
          headlessMode: true,
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
        },
      }),
      new InjectedConnector({
        chains,
        options: {
          name: 'Injected',
          shimDisconnect: true,
        },
      }), */
    ],
    provider,
    webSocketProvider,
  });

  /*  const client = createClient(
    getDefaultClient({
      appName: 'NFT Studio',
      //infuraId: process.env.REACT_APP_INFURA_ID,
      alchemyId:  'gcYJsxItcYNjfy01aHklipg1J6foSUFn',
      chains: [polygon],
    })
  ); */

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const [queryClient] = useState(() => new QueryClient());
  const getLayout = Component.getLayout ?? ((page) => page);
  //could remove this if you don't need to page level layout
  return (
    <>
      <Head>
        {/* maximum-scale 1 meta tag need to prevent ios input focus auto zooming */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
      </Head>
      <Provider store={store}>
        <WagmiConfig client={client}>
          <ConnectKitProvider theme="auto">
            <QueryClientProvider client={queryClient}>
              <Hydrate state={pageProps.dehydratedState}>
                <ThemeProvider
                  attribute="class"
                  enableSystem={false}
                  defaultTheme="light"
                >
                  <WalletProvider>
                    {getLayout(<Component {...pageProps} />)}
                    <SettingsButton />
                    <SettingsDrawer />
                    <ModalsContainer />
                    <DrawersContainer />
                  </WalletProvider>
                </ThemeProvider>
                {/* <Web3Modal
        ethereumClient={ethereumClient}
        // Custom Linking Mobile Wallets
        mobileWallets={[
          {
            id: 'trust',
            name: 'Trust Wallet',
            links: { native: 'trust://', universal: 'https://link.trustwallet.com' }
          },
          {
            id: 'rainbow',
            name: 'Rainbow',
            links: { native: 'rainbow://', universal: 'https://rainbow.me' }
          },
          {
            id: 'zerion',
            name: 'Zerion',
            links: { native: 'zerion://', universal: 'https://wallet.zerion.io' }
          },
          {
            id: 'tokenary',
            name: 'Tokenary',
            links: { native: 'tokenary://', universal: 'https://tokenary.io' }
          }
        ]}
        // Custom Linking Desktop Wallets
        desktopWallets={[
          {
            id: 'ledger',
            name: 'Ledger',
            links: { native: 'ledgerlive://', universal: 'https://www.ledger.com' }
          },
          {
            id: 'zerion',
            name: 'Zerion',
            links: { native: 'zerion://', universal: 'https://wallet.zerion.io' }
          },
          {
            id: 'tokenary',
            name: 'Tokenary',
            links: { native: 'tokenary://', universal: 'https://tokenary.io' }
          },
          {
            id: 'oreid',
            name: 'OREID',
            links: {
              native: '',
              universal: 'https://www.oreid.io/'
            }
          }
        ]}
        // Custom Wallet Images
        walletImages={{
          metaMask: '../../assets/images/images.jpg',
          brave: '/images/wallet_brave.webp',
          ledger: '/images/wallet_ledger.webp',
          coinbaseWallet: '/images/wallet_coinbase.webp',
          zerion: '/images/wallet_zerion.webp',
          trust: '/images/wallet_trust.webp',
          rainbow: '/images/wallet_rainbow.webp',
          oreid: '/images/wallet_oreid.svg'
        }}
        // Custom Chain Images
        chainImages={{
          137: '/images/chain_polygon.webp',
          10: '/images/chain_optimism.webp',
          42161: '/images/chain_arbitrum.webp'
        }}
      /> */}
              </Hydrate>
              <ReactQueryDevtools
                initialIsOpen={false}
                position="bottom-right"
              />
            </QueryClientProvider>
          </ConnectKitProvider>
        </WagmiConfig>
      </Provider>
    </>
  );
}

export default CustomApp;
