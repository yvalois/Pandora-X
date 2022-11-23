import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { contract } from '../redux/blockchainRoutes';

const router = contract();
const RPC_URL = router.RPC_URL;

export const Web3Client = (() => {
  let web3Instance;
  const createInstance = () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          rpc: {
            5: RPC_URL,
          },
          chainId: 5,
        },
      },
    };
    return new Web3Modal({
      network: 'GoerliETH', // optional
      cacheProvider: true, // optional
      providerOptions, // required
    });
  };

  return {
    getInstance: () => {
      if (!web3Instance) {
        web3Instance = createInstance();
      }
      return web3Instance;
    },
  };
})();
