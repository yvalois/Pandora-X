'use strict';
exports.__esModule = true;
var react_1 = require('react');
var context_1 = require('@/components/modal-views/context');
var anchor_link_1 = require('../ui/links/anchor-link');
var button_1 = require('../ui/button');
function ModalWithdraw() {
  var closeModal = context_1.useModal().closeModal;
  var _a = react_1.useState(0),
    valor = _a[0],
    setValor = _a[1];
  var _b = react_1.useState(false),
    loading = _b[0],
    setLoading = _b[1];
  var _c = react_1.useState(0),
    approvedToken = _c[0],
    setApprovedToken = _c[1];
  var _d = react_1.useState(0),
    id = _d[0],
    setId = _d[1];
  var _e = react_1.useState(false),
    succes = _e[0],
    setSuccess = _e[1];
  var close = function () {
    closeModal('Withdraw_VIEW');
  };
  return react_1['default'].createElement(
    react_1['default'].Fragment,
    null,
    react_1['default'].createElement(
      'div',
      {
        className:
          'relative z-50 mx-auto h-[200px] w-[400px] max-w-full rounded-lg bg-white px-8 py-8 dark:bg-light-dark',
      },
      react_1['default'].createElement(
        anchor_link_1['default'],
        { href: '/' },
        react_1['default'].createElement(
          'button',
          {
            className:
              'absolute right-[20px] top-[20px] mb-2 flex h-[20px] w-[20px] items-center justify-center rounded-[50%] bg-black text-center   text-2xl font-medium uppercase dark:text-white',
            onClick: close,
          },
          react_1['default'].createElement(
            'span',
            {
              className:
                'blockbg-transparent text-sm text-white outline-none focus:outline-none',
            },
            'X'
          )
        )
      ),
      react_1['default'].createElement(
        'p',
        { className: 'mb-4' },
        'Al presionar aceptar, confirmas estar de acuerdo con no poder recuperar el token hasta cumplir el tiempo establecido'
      ),
      react_1['default'].createElement(
        'div',
        { className: 'flex w-full justify-evenly' },
        react_1['default'].createElement(
          button_1['default'],
          { onClick: close, size: 'small' },
          react_1['default'].createElement(
            'span',
            {
              className:
                'blockbg-transparent text-sm text-white outline-none focus:outline-none',
            },
            'aceptar'
          )
        ),
        react_1['default'].createElement(
          anchor_link_1['default'],
          { href: '/' },
          react_1['default'].createElement(
            button_1['default'],
            { onClick: close, size: 'small' },
            react_1['default'].createElement(
              'span',
              {
                className:
                  'blockbg-transparent text-sm text-white outline-none focus:outline-none',
              },
              'Cancelar'
            )
          )
        )
      )
    )
  );
}
exports['default'] = ModalWithdraw;
