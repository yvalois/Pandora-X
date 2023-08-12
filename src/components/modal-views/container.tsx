import { Fragment, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Dialog } from '@/components/ui/dialog';
import { Transition } from '@/components/ui/transition';
import Button from '@/components/ui/button';
import { Close } from '@/components/icons/close';
import { useModal, MODAL_VIEW } from '@/components/modal-views/context';
// dynamic imports
const SearchView = dynamic(() => import('@/components/search/view'));
const ShareView = dynamic(() => import('@/components/nft/share-view'));
const SelectWallet = dynamic(() => import('@/components/nft/select-wallet'));
const Register = dynamic(
  () => import('@/components/modal-Register/ModalRegister')
);
const Withdraw = dynamic(
  () => import('@/components/modalWithdraw/modalWithdraw')
);
const Staking = dynamic(
  () => import('@/components/modalCondiciones/modalStaking')
);
const TransferP = dynamic(() => import('@/components/modalTransfer/modalTP'));

const TransferI = dynamic(() => import('@/components/modalTransfer/modalTI'));

const TransferF = dynamic(() => import('@/components/modalTransfer/modalTF'));

const Ban = dynamic(() => import('@/components/modal-ban/ModalBan'));
const Change = dynamic(() => import('@/components/modal-change/ModalChange'));
const Banned = dynamic(() => import('@/components/Banned-views/ModalBanned'));
const Venta = dynamic(() => import('@/components/market-views/modal-venta'));
const Subasta = dynamic(
  () => import('@/components/market-views/modal-subasta')
);
const Oferta = dynamic(() => import('@/components/market-views/modal-oferta'));

const Puja = dynamic(() => import('@/components/market-views/modal-puja'));

const Unstaking = dynamic(
  () => import('@/components/modalCondiciones/modalUnstaking')
);

const Network = dynamic(
  () => import('@/components/SoporteNetwork-views/ModalNetwork')
);

function renderModalContent(view: MODAL_VIEW | string) {
  switch (view) {
    case 'SEARCH_VIEW':
      return <SearchView />;
    case 'SHARE_VIEW':
      return <ShareView />;
    case 'WALLET_CONNECT_VIEW':
      return <SelectWallet />;
    case 'REGISTER_VIEW':
      return <Register />;
    case 'WITHDRAW_VIEW':
      return <Withdraw />;
    case 'STAKING_VIEW':
      return <Staking />;
    case 'TRANSFER_P':
      return <TransferP />;
    case 'TRANSFER_I':
      return <TransferI />;
    case 'TRANSFER_F':
      return <TransferF />;
    case 'BAN':
      return <Ban />;
    case 'CHANGE':
      return <Change />;
    case 'BAN_VIEW':
      return <Banned />;
    case 'NETWORK_VIEW':
      return <Network />;
    case 'UNSTAKING_VIEW':
      return <Unstaking />;
    case 'AUCTION_VIEW':
      return <Subasta />;
    case 'SELL_VIEW':
      return <Venta />;
    case 'OFFER_VIEW':
      return <Oferta />;
    case 'BID_VIEW':
      return <Puja />;
    default:
      return null;
  }
}

export default function ModalContainer() {
  const router = useRouter();
  const { view, isOpen, closeModal } = useModal();
  useEffect(() => {
    // close search modal when route change
    router.events.on('routeChangeStart', closeModal);
    return () => {
      router.events.off('routeChangeStart', closeModal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <div
        className="fixed inset-0 z-10 h-full w-full overflow-y-auto overflow-x-hidden p-4 text-center sm:p-6 lg:p-8 xl:p-10 3xl:p-12"
        onClick={() => {
          if (
            view &&
            view !== 'REGISTER_VIEW' &&
            view !== 'STAKING_VIEW' &&
            view !== 'BAN_VIEW' &&
            view !== 'WALLET_CONNECT_VIEW' &&
            view !== 'OFFER_VIEW' &&
            view !== 'BID_VIEW' &&
            view !== 'SELL_VIEW'
          ) {
            closeModal();
          }
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0  bg-gray-700 bg-opacity-60 backdrop-blur" />
        </Transition.Child>

        {/* This element is to trick the browser into centering the modal contents. */}
        {view && view !== 'SEARCH_VIEW' && (
          <span className="inline-block h-full align-middle" aria-hidden="true">
            &#8203;
          </span>
        )}

        {/* This element is need to fix FocusTap headless-ui warning issue */}
        <div className="sr-only">
          <Button
            size="small"
            color="gray"
            shape="circle"
            onClick={closeModal}
            className="opacity-50 hover:opacity-80 "
          >
            <Close className="h-auto w-[13px]" />
          </Button>
        </div>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-105"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-105"
        >
          <div className="relative inline-block w-full text-left align-middle xs:w-auto">
            {view && renderModalContent(view)}
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
}
