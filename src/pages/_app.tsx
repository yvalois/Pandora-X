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

// base css file
import 'swiper/css';
import '@/assets/css/scrollbar.css';
import '@/assets/css/globals.css';
import '@/assets/css/range-slider.css';
import { Provider, useDispatch } from 'react-redux';
import store from '@/redux/store';

import { alchemyProvider } from 'wagmi/providers/alchemy';

import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum, mainnet, polygon, bsc } from 'wagmi/chains';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';

function CustomApp({ Component, pageProps } /*: AppPropsWithLayout*/) {
  const [domLoaded, setDomLoaded] = useState(false);
  const chains = [mainnet, polygon];

  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
  const config = createConfig(
    getDefaultConfig({
      appName: 'Pandorax',
      alchemyId: 'q4n6QWgqS1tmGE-j9RNRc0yaIBBe4tUw', // or infuraId
      walletConnectProjectId: 'a43b1f2218c49988d0eef7c3863010e2',
      chains,
    })
  );

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
      <WagmiConfig config={config}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <ConnectKitProvider>
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
              </ConnectKitProvider>
            </Hydrate>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </QueryClientProvider>
        </Provider>
      </WagmiConfig>
    </>
  );
}

export default CustomApp;
