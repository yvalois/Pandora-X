import Image from '@/components/ui/image';
import metamaskLogo from '@/assets/images/metamask.svg';
import { WalletContext } from '@/lib/hooks/use-connect';
import { useModal } from '@/components/modal-views/context';
import { useContext, useEffect, useState } from 'react';
import { useAccount, useNetwork, useProvider, useSigner } from 'wagmi';
import { useDispatch, useSelector } from 'react-redux';
import { connectWallet } from '../../redux/Blockchain/blockchainAction';

import { ConnectKitButton, useModal as hola } from 'connectkit';

export default function SelectWallet({ ...props }) {
  const { disconnectWallet } = useContext(WalletContext);
  const dispatch = useDispatch<AppDispatch>();
  const error = false;
  const { setOpen, open } = hola();
  const { address } = useAccount();
  const [Id, setId] = useState(0);
  const { isConnect, accountAddress } = useSelector(
    (state) => state.blockchain
  );

  const { closeModal } = useModal();

  const provider = useProvider();
  const { data: signer, isError, isLoading: arroz } = useSigner();

  const abrir = () => {
    setOpen(true);
    window.localStorage.removeItem('ChainId');
  };

  useEffect(() => {
    if (!arroz && signer !== undefined) {
      dispatch(connectWallet(address, provider, signer));

      setOpen(false);
    }
  }, [signer, arroz]);

  useEffect(() => {
    disconnectWallet();
  }, []);

  const { chain } = useNetwork();

  useEffect(() => {
    if (isConnect && !chain?.unsupported) {
      closeModal();
    }
  }, [isConnect, chain]);

  useEffect(() => {
    const id = window.localStorage.getItem('ChainId');
    setId(id);
  }, []);

  const _provider = useProvider();

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
          {Id != 0 && Id != undefined && (
            <p className="font-bold">
              <bold>
                Recuerda cambiar la red a {Id == 1 ? 'Ethereum' : 'Polygon'}
              </bold>
            </p>
          )}
        </div>

        <div
          className="mt-12 flex h-14 cursor-pointer items-center justify-center rounded-lg bg-gradient-to-l "
          onClick={abrir}
        >
          {/*<span>Conectar con metamask</span>
          <span className="h-auto w-9">
            <Image src={metamaskLogo} alt="metamask" />
          </span> */}
          <ConnectKitButton />
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
