'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
exports.__esModule = true;
var image_1 = require('@/components/ui/image');
var metamask_svg_1 = require('@/assets/images/metamask.svg');
var use_connect_1 = require('@/lib/hooks/use-connect');
var context_1 = require('@/components/modal-views/context');
var react_1 = require('react');
function SelectWallet(_a) {
  var props = __rest(_a, []);
  var _b = react_1.useContext(use_connect_1.WalletContext),
    address = _b.address,
    connectToWallet = _b.connectToWallet,
    error = _b.error;
  var closeModal = context_1.useModal().closeModal;
  react_1.useEffect(
    function () {
      if (address) closeModal();
    },
    [address, closeModal]
  );
  return React.createElement(
    'div',
    __assign(
      {
        className:
          'relative z-50 mx-auto w-[440px] max-w-full rounded-lg bg-white px-9 py-16 dark:bg-light-dark',
      },
      props
    ),
    React.createElement(
      'h2',
      {
        className:
          'mb-4 text-center text-2xl font-medium uppercase text-gray-900 dark:text-white',
      },
      'Connect Wallet'
    ),
    React.createElement(
      'p',
      {
        className:
          'text-center text-sm leading-loose tracking-tight text-gray-600 dark:text-gray-400',
      },
      'By connecting your wallet, you agree to our Terms of Service and our Privacy Policy.'
    ),
    React.createElement(
      'div',
      {
        className:
          'mt-12 flex h-14 w-full cursor-pointer items-center justify-between rounded-lg bg-gradient-to-l from-[#ffdc24] to-[#ff5c00] px-4 text-base text-white transition-all hover:-translate-y-0.5',
        onClick: connectToWallet,
      },
      React.createElement('span', null, 'MetaMask'),
      React.createElement(
        'span',
        { className: 'h-auto w-9' },
        React.createElement(image_1['default'], {
          src: metamask_svg_1['default'],
          alt: 'metamask',
        })
      )
    ),
    error &&
      React.createElement(
        'p',
        { className: 'mt-3 text-center text-xs text-red-500' },
        'Please install Metamask plugin in your browser in order to connect wallet.'
      )
  );
}
exports['default'] = SelectWallet;
