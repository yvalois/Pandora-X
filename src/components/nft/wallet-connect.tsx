import Button from '@/components/ui/button';
import { WalletContext } from '@/lib/hooks/use-connect';
import { Menu } from '@/components/ui/menu';
import { Transition } from '@/components/ui/transition';
import ActiveLink from '@/components/ui/links/active-link';
import { ChevronForward } from '@/components/icons/chevron-forward';
import { PowerIcon } from '@/components/icons/power';
import { useModal } from '@/components/modal-views/context';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Copy } from '@/components/icons/copy';
import { Check } from '@/components/icons/check';
import { useDispatch } from 'react-redux';
import AnchorLink from '../ui/links/anchor-link';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSignMessage,
  useNetwork,
  useSwitchNetwork,
} from 'wagmi';
import { disconectWallet } from '@/redux/Blockchain/blockchainAction';

export default function WalletConnect() {
  const { openModal, closeModal } = useModal();

  const { disconnectWallet, balance, connectToWallet, error } =
    useContext(WalletContext);

  const { accountAddress, isUser, isConnect } = useSelector(
    (state: any) => state.blockchain
  );
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const dispatch = useDispatch<AppDispatch>();
  const [link, setLink] = useState('');
  let [copyButtonStatus, setCopyButtonStatus] = useState(false);

  const [domLoaded, setDomLoaded] = useState(false);
  const Usuario = useSelector((state: any) => state.Usuario);

  const { ban } = useSelector((state: any) => state.Usuario);

  const copiar = () => {
    const aux = window.location.href;
    const a = aux.split('profile');
    const e = a[0];
    setLink(e);
    navigator.clipboard.writeText(`${e}principal/${accountAddress}`);

    setCopyButtonStatus(true);
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 2500);
  };

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  const { disconnect } = useDisconnect();

  const desconect = async () => {
    await dispatch(disconectWallet());
    disconnect();
    if (
      window.location.href != 'https://app.pandorax.co' &&
      window.location.href != 'http://localhost:3000/'
    ) {
      window.location.href = '/';
    }
  };

  useEffect(() => {
    if (isUser == false) {
      openModal('REGISTER_VIEW');
    }
  }, [isUser]);

  useEffect(() => {
    if (ban) {
      openModal('BAN_VIEW');
    }
  }, [ban]);

  // const abrirModal=()=>{
  //   if(isConnected && accountAddress.length === 0){
  //     console.log("no")
  //   }else{
  //     openModal('WALLET_CONNECT_VIEW')
  //   }
  // }

  return (
    <>
      {accountAddress !== '' ? (
        <div className="flex items-center">
          <div className="relative">
            <Menu>
              <Menu.Button className="block h-10 w-10 overflow-hidden rounded-full border-3 border-solid border-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-main transition-all hover:-translate-y-0.5 hover:shadow-large dark:border-gray-700 sm:h-12 sm:w-12"></Menu.Button>
              <Transition
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-300"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-4"
              >
                <Menu.Items className="absolute -right-20 mt-3 w-72 origin-top-right rounded-lg bg-white shadow-large dark:bg-gray-900 sm:-right-14">
                  <Menu.Item>
                    <div className="border-b border-dashed border-gray-200 p-3 dark:border-gray-700">
                      <ActiveLink
                        href="/profile"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
                      >
                        <span className="h-8 w-8 rounded-full border-2 border-solid border-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:border-gray-700"></span>
                        <AnchorLink href="/profile">
                          <span className="grow uppercase">
                            View Your Profile
                          </span>
                        </AnchorLink>

                        <ChevronForward />
                      </ActiveLink>
                    </div>
                  </Menu.Item>
                  {Usuario.rol == 'Admin' && (
                    <Menu.Item>
                      <div className="m-3 inline-flex h-9  items-center rounded-full bg-white shadow-card dark:bg-light-dark xl:mt-6">
                        <div className="inline-flex h-full shrink-0 grow-0 items-center rounded-full bg-gray-900 px-4 text-xs text-white sm:text-sm">
                          Referido
                        </div>
                        <div className="text w-28 grow-0 truncate text-ellipsis bg-center text-xs text-gray-500 ltr:pl-4 rtl:pr-4 dark:text-gray-300 sm:w-32 sm:text-sm">
                          {`${link}principal/${accountAddress}`}
                        </div>
                        <div
                          className="flex cursor-pointer items-center px-4 text-gray-500 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                          title="Copy Address"
                          onClick={copiar}
                        >
                          {copyButtonStatus ? (
                            <Check className="h-auto w-3.5 text-green-500" />
                          ) : (
                            <Copy className="h-auto w-3.5" />
                          )}
                        </div>
                      </div>
                    </Menu.Item>
                  )}

                  {Usuario.rol == 'usuario' && (
                    <Menu.Item>
                      <div className="m-3 inline-flex h-9  items-center rounded-full bg-white shadow-card dark:bg-light-dark xl:mt-6">
                        <div className="inline-flex h-full shrink-0 grow-0 items-center rounded-full bg-gray-900 px-4 text-xs text-white sm:text-sm">
                          Referido
                        </div>
                        <div className="text w-28 grow-0 truncate text-ellipsis bg-center text-xs text-gray-500 ltr:pl-4 rtl:pr-4 dark:text-gray-300 sm:w-32 sm:text-sm">
                          {`${link}principal/${accountAddress}`}
                        </div>
                        <div
                          className="flex cursor-pointer items-center px-4 text-gray-500 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                          title="Copy Address"
                          onClick={copiar}
                        >
                          {copyButtonStatus ? (
                            <Check className="h-auto w-3.5 text-green-500" />
                          ) : (
                            <Copy className="h-auto w-3.5" />
                          )}
                        </div>
                      </div>
                    </Menu.Item>
                  )}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          <div className="p-3">
            <div
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
              onClick={desconect}
            >
              <span className="rounded-lg bg-gray-100 px-2 py-1 text-sm tracking-tighter dark:bg-gray-800">
                {accountAddress?.slice(0, 6)}
                {'...'}
                {accountAddress?.slice(accountAddress?.length - 6)}
              </span>
              <PowerIcon />
              <div className="hidden md:block">
                <span className="grow uppercase">Disconnect</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Button
            onClick={() => openModal('WALLET_CONNECT_VIEW')}
            className="shadow-main hover:shadow-large"
          >
            {isConnected && accountAddress.length === 0
              ? 'Conectando...'
              : 'Conectar'}
          </Button>
          <div></div>
        </>
      )}
    </>
  );
}
