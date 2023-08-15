import Image from '@/components/ui/image';
import metamaskLogo from '@/assets/images/metamask.svg';
import { WalletContext } from '@/lib/hooks/use-connect';
import { useModal } from '@/components/modal-views/context';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectWallet } from '../../redux/Blockchain/blockchainAction';
import { useWeb3Modal } from '@web3modal/react';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSignMessage,
} from 'wagmi';
import { getEthersProvider, getEthersSigner } from '@/utils/ethers.js';
import { ConnectKitButton, useModal as hola } from 'connectkit';
import Button from '../ui/button';
import { getPublicClient, getWalletClient } from '@wagmi/core';

export default function SelectWallet({ ...props }) {
  const { disconnectWallet } = useContext(WalletContext);
  const dispatch = useDispatch<AppDispatch>();
  const error = false;
  const { address } = useAccount();
  const [Id, setId] = useState(0);
  const { isConnect, accountAddress } = useSelector(
    (state) => state.blockchain
  );

  const [is, setIs] = useState(false);

  const { isOpen, open, close, setDefaultChain } = useWeb3Modal();
  const {
    address: account,
    isConnecting,
    isDisconnected,
    isConnected,
  } = useAccount();

  const { connect, connectors, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();
  const { closeModal, openModal } = useModal();

  const getSign = async () => {
    //openModal('WALLET_CONNECT_VIEW')
    setTimeout(async () => {
      const signer = await getEthersSigner(chain?.id);

      const provider = getEthersProvider(chain?.id);
      provider.on('display_uri', async (uri: string) => {
        console.log('Disconenct');
      });
      await dispatch(connectWallet(address, provider, signer));
      window.localStorage.removeItem('wc@2:core:0.3//keychain');
      closeModal();
    }, 500);
  };
  const { chain } = useNetwork();

  const abrir = () => {
    if (!isConnected) {
      open();
      window.localStorage.removeItem('ChainId');
    }
  };

  const switchChain = async () => {
    setTimeout(async () => {
      const walletClient = await getWalletClient(chain?.id);
      await walletClient?.switchChain({ id: 1 });
    }, 2000);
  };

  useEffect(() => {
    if (
      isConnected &&
      accountAddress.length === 0 &&
      is === false &&
      chain?.unsupported !== undefined &&
      chain.unsupported === false
    ) {
      getSign();
      setIs(true);
    } else if (
      isConnected &&
      accountAddress.length === 0 &&
      chain?.unsupported !== undefined &&
      chain.unsupported === true
    ) {
      setIs(false);
      switchChain();
    }
  }, [isConnected, accountAddress, account, chain, is]);

  return (
    <>
      <div
        className="relative  mx-auto w-[440px] max-w-full rounded-lg bg-white px-9 py-16 dark:bg-light-dark"
        {...props}
      >
        <button
          className="absolute right-[25px] top-[25px] mb-2 flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-black text-center   text-2xl font-medium uppercase dark:text-white"
          onClick={() => closeModal()}
        >
          <span className="blockbg-transparent text-sm text-white outline-none focus:outline-none">
            X
          </span>
        </button>
        <h2 className="mb-4 text-center text-2xl font-medium uppercase text-gray-900 dark:text-white">
          Connect Wallet
        </h2>
        <div className="text-center text-sm leading-loose tracking-tight text-gray-600 dark:text-gray-400">
          By connecting your wallet, you agree to our{' '}
          <a
            onClick={() => {
              window.open('https://pandorax.co/terms-of-use');
            }}
            className="cursor-pointer text-blue-600 hover:underline dark:text-blue-500"
          >
            Terms of Service
          </a>{' '}
          and our
          <a
            className="cursor-pointer text-blue-600 hover:underline dark:text-blue-500"
            onClick={() => {
              window.open('https://pandorax.co/privacy-policy');
            }}
          >
            {' '}
            Privacy Policy
          </a>
          .
          {chain?.id != 0 && chain?.id != undefined && (
            <p className="font-bold">
              <bold>
                Recuerda cambiar la red a {Id == 1 ? 'Ethereum' : 'Polygon'}
              </bold>
            </p>
          )}
        </div>
        <div className="flex w-full justify-center">
          <Button
            className="mt-12 flex h-14 cursor-pointer items-center justify-center rounded-lg bg-gradient-to-l "
            onClick={abrir}
          >
            {isConnected && accountAddress.length === 0 ? (
              'Conectando...'
            ) : isConnected && accountAddress.length > 0 ? (
              <p>
                {accountAddress?.slice(0, 6)}
                {'...'}
                {accountAddress?.slice(accountAddress?.length - 6)}
              </p>
            ) : (
              'Conectar'
            )}
          </Button>
        </div>

        {/* <MobileView>
            <h1>XD</h1>
          </MobileView> */}

        {error && (
          <p className="mt-3 text-center text-xs text-red-500">
            Please install Metamask plugin in your browser in order to connect
            wallet.
          </p>
        )}
      </div>
    </>
  );
}
