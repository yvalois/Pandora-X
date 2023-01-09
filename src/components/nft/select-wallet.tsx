import Image from '@/components/ui/image';
import metamaskLogo from '@/assets/images/metamask.svg';
import { WalletContext } from '@/lib/hooks/use-connect';
import { useModal } from '@/components/modal-views/context';
import { useContext, useEffect } from 'react';
import ModalRegister from '@/components/modal-Register/ModalRegister';
import { BrowserView, MobileView } from 'react-device-detect';
import {
  useAccount,
  configureChains,
  createClient,
  WagmiConfig,
  useProvider,
  useNetwork,
  useSwitchNetwork,
} from 'wagmi';
import { useDispatch } from 'react-redux';
import { connectWallet } from '../../redux/Blockchain/blockchainAction';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { mainnet, polygon, goerli } from 'wagmi/chains';

import { ConnectKitButton, useModal as hola } from 'connectkit';

export default function SelectWallet({ ...props }) {
  // const { address, connectToWallet, error, isUser } = useContext(WalletContext);
  const dispatch = useDispatch<AppDispatch>();
  const error = false;
  const { setOpen } = hola();
  const { address } = useAccount();
  const { chain: activeChain } = useNetwork();
  const { switchNetwork, isLoading } = useSwitchNetwork();

  const { closeModal } = useModal();
  useEffect(() => {
    if (address) closeModal();
  }, [address, closeModal]);
  const provider = useProvider();

  const abrir = () => {
    setOpen(true);
  };

  useEffect(() => {
    console.log(activeChain);
    console.log(provider);
    dispatch(connectWallet(address, provider));
    if (address?.length > 1) {
      //  location.reload()
      setOpen(false);
    }
  }, [address]);

  return (
    <>
      <div
        className="relative z-50 mx-auto w-[440px] max-w-full rounded-lg bg-white px-9 py-16 dark:bg-light-dark"
        {...props}
      >
        <h2
          // onClick={connectToWallet}
          className="mb-4 text-center text-2xl font-medium uppercase text-gray-900 dark:text-white"
        >
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
        </div>

        <div
          className="mt-12 flex h-14 w-full cursor-pointer items-center justify-center rounded-lg bg-gradient-to-l from-[#ffdc24] to-[#ff5c00] px-4 text-base text-white transition-all hover:-translate-y-0.5"
          onClick={abrir}
        >
          {/*<span>Conectar Cartera</span>
           <span className="h-auto w-9">
            <Image src={metamaskLogo} alt="metamask" />
          </span> */}
        </div>
        <ConnectKitButton />

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
