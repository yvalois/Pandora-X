'use strict';
exports.__esModule = true;
var react_1 = require('react');
var dynamic_1 = require('next/dynamic');
var router_1 = require('next/router');
var dialog_1 = require('@/components/ui/dialog');
var transition_1 = require('@/components/ui/transition');
var button_1 = require('@/components/ui/button');
var close_1 = require('@/components/icons/close');
var context_1 = require('@/components/modal-views/context');
// dynamic imports
var SearchView = dynamic_1['default'](function () {
  return Promise.resolve().then(function () {
    return require('@/components/search/view');
  });
});
var ShareView = dynamic_1['default'](function () {
  return Promise.resolve().then(function () {
    return require('@/components/nft/share-view');
  });
});
var SelectWallet = dynamic_1['default'](function () {
  return Promise.resolve().then(function () {
    return require('@/components/nft/select-wallet');
  });
});
var Register = dynamic_1['default'](function () {
  return Promise.resolve().then(function () {
    return require('@/components/modal-Register/ModalRegister');
  });
});
var Withdraw = dynamic_1['default'](function () {
  return Promise.resolve().then(function () {
    return require('@/components/modalWithdraw/modalWithdraw');
  });
});
var Staking = dynamic_1['default'](function () {
  return Promise.resolve().then(function () {
    return require('@/components/modalCondiciones/modalStaking');
  });
});
var TransferP = dynamic_1['default'](function () {
  return Promise.resolve().then(function () {
    return require('@/components/modalTransfer/modalTP');
  });
});
var TransferI = dynamic_1['default'](function () {
  return Promise.resolve().then(function () {
    return require('@/components/modalTransfer/modalTI');
  });
});
function renderModalContent(view) {
  switch (view) {
    case 'SEARCH_VIEW':
      return React.createElement(SearchView, null);
    case 'SHARE_VIEW':
      return React.createElement(ShareView, null);
    case 'WALLET_CONNECT_VIEW':
      return React.createElement(SelectWallet, null);
    case 'REGISTER_VIEW':
      return React.createElement(Register, null);
    case 'WITHDRAW_VIEW':
      return React.createElement(Withdraw, null);
    case 'STAKING_VIEW':
      return React.createElement(Staking, null);
    case 'TRANSFER_P':
      return React.createElement(TransferP, null);
    case 'TRANSFER_I':
      return React.createElement(TransferI, null);
    default:
      return null;
  }
}
function ModalContainer() {
  var router = router_1.useRouter();
  var _a = context_1.useModal(),
    view = _a.view,
    isOpen = _a.isOpen,
    closeModal = _a.closeModal;
  react_1.useEffect(function () {
    // close search modal when route change
    router.events.on('routeChangeStart', closeModal);
    return function () {
      router.events.off('routeChangeStart', closeModal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return React.createElement(
    transition_1.Transition,
    { appear: true, show: isOpen, as: react_1.Fragment },
    React.createElement(
      dialog_1.Dialog,
      {
        as: 'div',
        className:
          'fixed inset-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden p-4 text-center sm:p-6 lg:p-8 xl:p-10 3xl:p-12',
        onClose: function () {
          if (view && view !== 'REGISTER_VIEW' && view !== 'STAKING_VIEW') {
            closeModal();
          }
        },
      },
      React.createElement(
        transition_1.Transition.Child,
        {
          as: react_1.Fragment,
          enter: 'ease-out duration-300',
          enterFrom: 'opacity-0',
          enterTo: 'opacity-100',
          leave: 'ease-in duration-200',
          leaveFrom: 'opacity-100',
          leaveTo: 'opacity-0',
        },
        React.createElement(dialog_1.Dialog.Overlay, {
          className:
            'fixed inset-0 z-40 cursor-pointer bg-gray-700 bg-opacity-60 backdrop-blur',
        })
      ),
      view &&
        view !== 'SEARCH_VIEW' &&
        React.createElement(
          'span',
          {
            className: 'inline-block h-full align-middle',
            'aria-hidden': 'true',
          },
          '\u200B'
        ),
      React.createElement(
        'div',
        { className: 'sr-only' },
        React.createElement(
          button_1['default'],
          {
            size: 'small',
            color: 'gray',
            shape: 'circle',
            onClick: closeModal,
            className: 'opacity-50 hover:opacity-80 ',
          },
          React.createElement(close_1.Close, { className: 'h-auto w-[13px]' })
        )
      ),
      React.createElement(
        transition_1.Transition.Child,
        {
          as: react_1.Fragment,
          enter: 'ease-out duration-300',
          enterFrom: 'opacity-0 scale-105',
          enterTo: 'opacity-100 scale-100',
          leave: 'ease-in duration-200',
          leaveFrom: 'opacity-100 scale-100',
          leaveTo: 'opacity-0 scale-105',
        },
        React.createElement(
          'div',
          {
            className:
              'relative z-50 inline-block w-full text-left align-middle xs:w-auto',
          },
          view && renderModalContent(view)
        )
      )
    )
  );
}
exports['default'] = ModalContainer;
