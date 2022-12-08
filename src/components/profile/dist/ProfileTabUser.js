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
var param_tab_1 = require('@/components/ui/param-tab');
var react_redux_1 = require('react-redux');
var nft_card_1 = require('@/components/ui/nft-card');
var stakingTable_1 = require('@/components/transaction/stakingTable');
var transactionUserTable_1 = require('@/components/transaction/transactionUserTable');
var react_1 = require('react');
var MintedAction_1 = require('@/redux/Minted/MintedAction');
function ProfileTabUser() {
  var _this = this;
  var _a = react_1.useState([]),
    currentItems = _a[0],
    setCurrentItems = _a[1];
  var _b = react_1.useState([]),
    currentInv = _b[0],
    setCurrentInv = _b[1];
  var _c = react_redux_1.useSelector(function (state) {
      return state.blockchain;
    }),
    inventoryp = _c.inventoryp,
    inventoryi = _c.inventoryi;
  var _d = react_redux_1.useSelector(function (state) {
      return state.minted;
    }),
    dataloaded = _d.dataloaded,
    disponibleNftp = _d.disponibleNftp,
    disponibleNfti = _d.disponibleNfti,
    priceFormat = _d.priceFormat,
    MintedNft = _d.MintedNft;
  var Usuario = react_redux_1.useSelector(function (state) {
    return state.blockchain.rol;
  });
  var dispatch = react_redux_1.useDispatch();
  var getNft = function () {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              dispatch(MintedAction_1.getMintedNftProducts()),
            ];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  react_1.useEffect(
    function () {
      var fetchItems = function () {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [4 /*yield*/, getNft()];
              case 1:
                _a.sent();
                //const itemsPerPage = 6
                //const start = (currentPage - 1) * itemsPerPage
                setCurrentItems(inventoryp);
                setCurrentInv(inventoryi);
                return [2 /*return*/];
            }
          });
        });
      };
      fetchItems();
    },
    [currentItems, dataloaded]
  );
  return React.createElement(
    param_tab_1['default'],
    {
      tabMenu: [
        {
          title: 'Mis productos',
          path: 'productos',
        },
        {
          title: 'Inversiones',
          path: 'inversiones',
        },
        {
          title: 'Staking',
          path: 'staking',
        },
        {
          title: 'Pagos',
          path: 'pagos',
        },
      ],
    },
    React.createElement(
      param_tab_1.TabPanel,
      { className: 'focus:outline-none w-full' },
      React.createElement(
        'div',
        {
          className:
            'w-full grid gap-4 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-5 xl:gap-6 3xl:grid-cols-3 4xl:grid-cols-4',
        },
        currentItems === null || currentItems === void 0
          ? void 0
          : currentItems.map(function (nft) {
              return React.createElement(nft_card_1['default'], {
                key: nft.Nombre,
                name: nft.Nombre,
                image: nft.img,
                price: 13,
                number: nft.id,
                tipo: nft.tipoN,
                alldata: false,
                type: 'productos',
              });
            }),
        currentItems.length == 0 &&
          React.createElement(
            'div',
            { className: ' h-full justify-center  self-center flex w-full' },
            React.createElement(
              'div',
              { className: 'w-full justify-center items-center' },
              React.createElement(
                'div',
                { className: ' h-full w-full' },
                React.createElement(
                  'span',
                  null,
                  React.createElement(
                    'h1',
                    {
                      className:
                        'xl:w-[700px] md:w-[500px] xl:text-lg md:text-md text-gray-600',
                    },
                    "No tienes Nft's de productos"
                  )
                )
              )
            )
          )
      )
    ),
    React.createElement(
      param_tab_1.TabPanel,
      { className: 'focus:outline-none w-full h-full' },
      React.createElement(
        'div',
        {
          className:
            'grid gap-4 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-5 xl:gap-6 3xl:grid-cols-3 4xl:grid-cols-4 w-full h-full',
        },
        currentInv === null || currentInv === void 0
          ? void 0
          : currentInv.map(function (nft) {
              return React.createElement(nft_card_1['default'], {
                key: nft.Nombre,
                name: nft.Nombre,
                image: nft.img,
                price: 13,
                number: nft.id,
                alldata: false,
                type: 'staking',
              });
            }),
        currentInv.length == 0 &&
          React.createElement(
            'div',
            { className: 'justify-center items-center h-full  flex w-full ' },
            React.createElement(
              'div',
              { className: ' h-full w-full' },
              React.createElement(
                'span',
                null,
                React.createElement(
                  'h1',
                  {
                    className:
                      'xl:w-[700px] md:w-[500px] xl:text-lg md:text-md text-gray-600',
                  },
                  "No tienes Nft's de inversion"
                )
              )
            )
          )
      )
    ),
    React.createElement(
      param_tab_1.TabPanel,
      { className: 'focus:outline-none' },
      React.createElement(
        'div',
        {
          className:
            'w-[100%] lg:w-[100%] ltr:lg:pr-6 rtl:lg:pl-6 2xl:w-[100%] 3xl:w-[100%]',
        },
        React.createElement(stakingTable_1['default'], null)
      )
    ),
    React.createElement(
      param_tab_1.TabPanel,
      { className: 'focus:outline-none' },
      React.createElement(
        'div',
        {
          className:
            'w-[100%] lg:w-[100%] ltr:lg:pr-6 rtl:lg:pl-6 2xl:w-[100%] 3xl:w-[100%]',
        },
        React.createElement(transactionUserTable_1['default'], null)
      )
    )
  );
}
exports['default'] = ProfileTabUser;
function dispatch(arg0) {
  throw new Error('Function not implemented.');
}
