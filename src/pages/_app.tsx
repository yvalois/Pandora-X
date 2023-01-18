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
import { Provider } from 'react-redux';
import store from '@/redux/store';

import { alchemyProvider } from 'wagmi/providers/alchemy';

import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, goerli } from 'wagmi/chains';

/*type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};*/

function CustomApp({ Component, pageProps } /*: AppPropsWithLayout*/) {
  const [domLoaded, setDomLoaded] = useState(false);

  const { chains, provider, webSocketProvider } = configureChains(
    [mainnet],
    [alchemyProvider({ apiKey: 'q9zvspHI6cAhD0JzaaxHQDdJp_GqXNMJ' })]
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
      <WagmiConfig client={client}>
        <Provider store={store}>
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
              </Hydrate>
              <ReactQueryDevtools
                initialIsOpen={false}
                position="bottom-right"
              />
            </QueryClientProvider>
          </ConnectKitProvider>
        </Provider>
      </WagmiConfig>
    </>
  );
}

export default CustomApp;
