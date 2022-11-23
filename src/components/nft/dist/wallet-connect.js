'use strict';
exports.__esModule = true;
var button_1 = require('@/components/ui/button');
var use_connect_1 = require('@/lib/hooks/use-connect');
var menu_1 = require('@/components/ui/menu');
var transition_1 = require('@/components/ui/transition');
var active_link_1 = require('@/components/ui/links/active-link');
var chevron_forward_1 = require('@/components/icons/chevron-forward');
var power_1 = require('@/components/icons/power');
var context_1 = require('@/components/modal-views/context');
var react_1 = require('react');
var react_redux_1 = require('react-redux');
function WalletConnect() {
  var _a = context_1.useModal(),
    openModal = _a.openModal,
    closeModal = _a.closeModal;
  var _b = react_1.useContext(use_connect_1.WalletContext),
    disconnectWallet = _b.disconnectWallet,
    balance = _b.balance,
    address = _b.address,
    connectToWallet = _b.connectToWallet,
    error = _b.error;
  var _c = react_redux_1.useSelector(function (state) {
      return state.blockchain;
    }),
    accountAddress = _c.accountAddress,
    isUser = _c.isUser;
  react_1.useEffect(
    function () {
      if (isUser == false) {
        openModal('REGISTER_VIEW');
      } else if (isUser == true) {
        closeModal();
      }
    },
    [isUser]
  );
  return React.createElement(
    React.Fragment,
    null,
    accountAddress !== ''
      ? React.createElement(
          'div',
          { className: 'flex items-center gap-3 sm:gap-6 lg:gap-8' },
          React.createElement(
            'div',
            { className: 'relative' },
            React.createElement(
              menu_1.Menu,
              null,
              React.createElement(menu_1.Menu.Button, {
                className:
                  'block h-10 w-10 overflow-hidden rounded-full border-3 border-solid border-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-main transition-all hover:-translate-y-0.5 hover:shadow-large dark:border-gray-700 sm:h-12 sm:w-12',
              }),
              React.createElement(
                transition_1.Transition,
                {
                  enter: 'ease-out duration-300',
                  enterFrom: 'opacity-0 translate-y-4',
                  enterTo: 'opacity-100 translate-y-0',
                  leave: 'ease-in duration-300',
                  leaveFrom: 'opacity-100 translate-y-0',
                  leaveTo: 'opacity-0 translate-y-4',
                },
                React.createElement(
                  menu_1.Menu.Items,
                  {
                    className:
                      'absolute -right-20 mt-3 w-72 origin-top-right rounded-lg bg-white shadow-large dark:bg-gray-900 sm:-right-14',
                  },
                  React.createElement(
                    menu_1.Menu.Item,
                    null,
                    React.createElement(
                      'div',
                      {
                        className:
                          'border-b border-dashed border-gray-200 p-3 dark:border-gray-700',
                      },
                      React.createElement(
                        active_link_1['default'],
                        {
                          href: '/profile',
                          className:
                            'flex items-center gap-3 rounded-lg py-2.5 px-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800',
                        },
                        React.createElement('span', {
                          className:
                            'h-8 w-8 rounded-full border-2 border-solid border-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:border-gray-700',
                        }),
                        React.createElement(
                          'span',
                          { className: 'grow uppercase' },
                          'View Your Profile'
                        ),
                        React.createElement(
                          chevron_forward_1.ChevronForward,
                          null
                        )
                      )
                    )
                  ),
                  React.createElement(
                    menu_1.Menu.Item,
                    null,
                    React.createElement(
                      menu_1.Menu.Item,
                      null,
                      React.createElement(
                        'div',
                        {
                          className:
                            'border-b border-dashed border-gray-200 px-6 py-5 dark:border-gray-700',
                        },
                        React.createElement(
                          'div',
                          {
                            className:
                              'flex items-center justify-between gap-3',
                          },
                          React.createElement(
                            'span',
                            {
                              className:
                                'text-sm font-medium -tracking-tighter text-gray-600 dark:text-gray-400',
                            },
                            'Balance'
                          ),
                          React.createElement('span', {
                            className:
                              'rounded-lg bg-gray-100 px-2 py-1 text-sm tracking-tighter dark:bg-gray-800',
                          })
                        ),
                        React.createElement(
                          'div',
                          {
                            className:
                              'mt-3 font-medium uppercase tracking-wider text-gray-900 dark:text-white',
                          },
                          balance,
                          ' ETH'
                        )
                      )
                    )
                  ),
                  React.createElement(
                    menu_1.Menu.Item,
                    null,
                    React.createElement(
                      'div',
                      { className: 'p-3' },
                      React.createElement(
                        'div',
                        {
                          className:
                            'flex cursor-pointer items-center gap-3 rounded-lg py-2.5 px-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800',
                          onClick: disconnectWallet,
                        },
                        React.createElement(power_1.PowerIcon, null),
                        React.createElement(
                          'span',
                          { className: 'grow uppercase' },
                          'Disconnect'
                        )
                      )
                    )
                  )
                )
              )
            )
          ),
          React.createElement(
            active_link_1['default'],
            { href: '/create-nft' },
            React.createElement(
              button_1['default'],
              { className: 'shadow-main hover:shadow-large' },
              'CREATE'
            )
          )
        )
      : React.createElement(
          button_1['default'],
          {
            onClick: connectToWallet,
            className: 'shadow-main hover:shadow-large',
          },
          'CONNECT'
        )
  );
}
exports['default'] = WalletConnect;
