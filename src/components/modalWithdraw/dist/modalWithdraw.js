'use strict';
exports.__esModule = true;
var react_1 = require('react');
var context_1 = require('@/components/modal-views/context');
var button_1 = require('@/components/ui/button');
function ModalWithdraw() {
  var _a = react_1.useState(false),
    toggleCoin = _a[0],
    setToggleCoin = _a[1];
  var _b = context_1.useModal(),
    openModal = _b.openModal,
    closeModal = _b.closeModal;
  return react_1['default'].createElement(
    react_1['default'].Fragment,
    null,
    react_1['default'].createElement(
      'div',
      {
        className:
          'relative z-50 mx-auto h-[400px] w-[400px] max-w-full rounded-lg bg-white px-9 py-16 dark:bg-light-dark',
      },
      react_1['default'].createElement(
        'button',
        {
          className:
            'absolute right-[20px] top-[20px] mb-2 flex h-[20px] w-[20px] items-center justify-center rounded-[50%] bg-black text-center   text-2xl font-medium uppercase dark:text-white',
          onClick: function () {
            return closeModal('Withdraw_VIEW');
          },
        },
        react_1['default'].createElement(
          'span',
          {
            className:
              'blockbg-transparent text-sm text-white outline-none focus:outline-none',
          },
          'X'
        )
      ),
      react_1['default'].createElement(
        'p',
        { className: 'mb-8' },
        'Aun no cumples con la fecha de staking como castigo debes pagar 10% del valor de tu nft para evitar este castigo solo debes esperar  a que tu stakeo se cumpla'
      ),
      react_1['default'].createElement(
        'div',
        { className: 'mb-6' },
        react_1['default'].createElement(
          'label',
          {
            className:
              'mb-1 block text-sm font-bold text-gray-700 dark:text-white',
          },
          'Valor'
        ),
        react_1['default'].createElement('input', {
          className:
            'focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none',
          id: 'username',
          type: 'text',
          placeholder: 'Name',
          value: '10usd',
          disabled: true,
        })
      ),
      react_1['default'].createElement(
        'div',
        { className: 'flex row justify-evenly  w-[100%]' },
        react_1['default'].createElement(button_1['default'], null, 'Approve'),
        react_1['default'].createElement(
          button_1['default'],
          { disabled: true },
          'Paid'
        )
      )
    )
  );
}
exports['default'] = ModalWithdraw;
