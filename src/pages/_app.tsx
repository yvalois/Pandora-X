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
import { ConnectKitProvider } from 'connectkit';

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

function CustomApp({ Component, pageProps } /*: AppPropsWithLayout*/) {
  const [domLoaded, setDomLoaded] = useState(false);
  const chains = [mainnet, polygon];

  const projectId = 'a43b1f2218c49988d0eef7c3863010e2';
  const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId }),
  ]);
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient,
  });
  const ethereumClient = new EthereumClient(wagmiConfig, chains);

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
      <WagmiConfig config={wagmiConfig}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <ThemeProvider
                attribute="class"
                enableSystem={false}
                defaultTheme="light"
              >
                <WalletProvider>
                  <Web3Modal
                    projectId={projectId}
                    ethereumClient={ethereumClient}
                  />

                  {getLayout(<Component {...pageProps} />)}
                  <SettingsButton />
                  <SettingsDrawer />
                  <ModalsContainer />
                  <DrawersContainer />
                </WalletProvider>
              </ThemeProvider>
            </Hydrate>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </QueryClientProvider>
        </Provider>
      </WagmiConfig>
    </>
  );
}

export default CustomApp;
