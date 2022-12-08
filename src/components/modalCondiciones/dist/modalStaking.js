'use strict';
exports.__esModule = true;
var react_1 = require('react');
var context_1 = require('@/components/modal-views/context');
var anchor_link_1 = require('../ui/links/anchor-link');
var button_1 = require('../ui/button');
var warning_1 = require('@/components/icons/warning');
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
  var _f = react_1.useState(false),
    msg = _f[0],
    setMsg = _f[1];
  var _g = react_1.useState(''),
    alert = _g[0],
    setAlert = _g[1];
  var close = function () {
    closeModal('Withdraw_VIEW');
  };
  var verify = function () {
    if (msg == true) {
      close();
    } else {
      setAlert('Debes aceptar los terminos');
    }
  };
  var change = function () {
    setMsg(!msg);
  };
  return react_1['default'].createElement(
    react_1['default'].Fragment,
    null,
    react_1['default'].createElement(
      'div',
      {
        className:
          'relative z-50 mx-auto h-auto w-[430px] column  justify-center items-center max-w-full rounded-lg bg-white px-8 py-8 dark:bg-light-dark',
      },
      react_1['default'].createElement(
        'div',
        { className: 'width-full flex justify-center items-center mb-8' },
        react_1['default'].createElement(warning_1.Warning, {
          className: 'text-[#2a52be] ',
        })
      ),
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
        { className: 'mb-8' },
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, assumenda voluptatem! Optio iusto eum qui voluptate aperiam mollitia corporis! Ullam id commodi ad consectetur suscipit architecto delectus nobis veritatis. Accusamus asperiores eaque nihil quaerat neque modi. Laborum, ad. Aperiam quis qui necessitatibus vel labore voluptatem praesentium ullam quos saepe possimus placeat optio consectetur porro id odio ex quam assumenda quaerat fugiat, ipsum explicabo voluptate. Quas veritatis architecto itaque ut doloremque?'
      ),
      react_1['default'].createElement(
        'div',
        { className: 'flex items-center mb-0' },
        react_1['default'].createElement('input', {
          id: 'link-checkbox',
          type: 'checkbox',
          value: msg,
          onChange: change,
          className:
            'w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600',
        }),
        react_1['default'].createElement(
          'label',
          {
            for: 'link-checkbox',
            className:
              'ml-2 text-sm font-medium text-gray-900 dark:text-gray-300',
          },
          'I agree with the ',
          react_1['default'].createElement(
            'a',
            {
              href: '#',
              className: 'text-blue-600 dark:text-blue-500 hover:underline',
            },
            'terms and conditions'
          ),
          '.'
        )
      ),
      react_1['default'].createElement(
        'div',
        { className: 'mb-6' },
        '    ',
        !msg &&
          alert.length > 0 &&
          react_1['default'].createElement(
            'label',
            { className: 'ml-6 text-xs text-red-500' },
            alert
          )
      ),
      react_1['default'].createElement(
        'div',
        { className: 'flex w-full justify-evenly' },
        react_1['default'].createElement(
          button_1['default'],
          { onClick: verify, size: 'small' },
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
