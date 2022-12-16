'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
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
var react_2 = require('@web3modal/react');
var core_1 = require('@web3modal/core');
var wagmi_1 = require('wagmi');
var react_redux_2 = require('react-redux');
function WalletConnect() {
  var _this = this;
  var _a = context_1.useModal(),
    openModal = _a.openModal,
    closeModal = _a.closeModal;
  var _b = react_1.useContext(use_connect_1.WalletContext),
    disconnectWallet = _b.disconnectWallet,
    balance = _b.balance,
    connectToWallet = _b.connectToWallet,
    error = _b.error;
  var _c = react_redux_1.useSelector(function (state) {
      return state.blockchain;
    }),
    accountAddress = _c.accountAddress,
    isUser = _c.isUser,
    isConnect = _c.isConnect;
  var dispatch = react_redux_2.useDispatch();
  var _d = wagmi_1.useAccount(),
    isConnected = _d.isConnected,
    address = _d.address;
  var open = react_2.useWeb3Modal().open;
  var desconectar = function () {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        disconnectWallet();
        console.log(core_1.ClientCtrl);
        core_1.ClientCtrl === null || core_1.ClientCtrl === void 0
          ? void 0
          : core_1.ClientCtrl.client().disconnect();
        return [2 /*return*/];
      });
    });
  };
  var _e = react_1.useState(false),
    domLoaded = _e[0],
    setDomLoaded = _e[1];
  react_1.useEffect(function () {
    setDomLoaded(true);
  }, []);
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
  react_1.useEffect(
    function () {
      if (isConnected) {
        connectToWallet(address);
        core_1.ModalCtrl.close();
      }
    },
    [isConnected]
  );
  return React.createElement(
    React.Fragment,
    null,
    isConnect
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
                  React.createElement(menu_1.Menu.Item, null)
                )
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'p-3' },
            React.createElement(
              'div',
              {
                className:
                  'flex cursor-pointer items-center gap-3 rounded-lg py-2.5 px-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800',
                onClick: desconectar,
              },
              React.createElement(
                'span',
                {
                  className:
                    'rounded-lg bg-gray-100 px-2 py-1 text-sm tracking-tighter dark:bg-gray-800',
                },
                accountAddress === null || accountAddress === void 0
                  ? void 0
                  : accountAddress.slice(0, 6),
                '...',
                accountAddress === null || accountAddress === void 0
                  ? void 0
                  : accountAddress.slice(
                      (accountAddress === null || accountAddress === void 0
                        ? void 0
                        : accountAddress.length) - 6
                    )
              ),
              React.createElement(power_1.PowerIcon, null),
              React.createElement(
                'div',
                { className: 'hidden md:block' },
                React.createElement(
                  'span',
                  { className: 'grow uppercase' },
                  'Disconnect'
                )
              )
            )
          )
        )
      : React.createElement(
          React.Fragment,
          null,
          React.createElement(
            button_1['default'],
            {
              onClick: function () {
                return open();
              },
              className: 'shadow-main hover:shadow-large',
            },
            'CONNECT'
          ),
          React.createElement('div', null)
        )
  );
}
exports['default'] = WalletConnect;
