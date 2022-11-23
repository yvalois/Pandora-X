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
exports.getStaticProps = void 0;
var next_seo_1 = require('next-seo');
var _dashboard_1 = require('@/layouts/_dashboard');
var overview_chart_1 = require('@/components/ui/chats/overview-chart');
var transaction_table_1 = require('@/components/transaction/transaction-table');
var nftSlider_1 = require('@/components/ui/nftSlider');
var react_redux_1 = require('react-redux');
var MintedAction_1 = require('../redux/Minted/MintedAction');
var react_1 = require('react');
exports.getStaticProps = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [
        2 /*return*/,
        {
          props: {},
        },
      ];
    });
  });
};
var HomePage = function () {
  var nftInfo = {
    nombre: '',
    image: '',
    price: '',
    id: 0,
  };
  var _a = react_1.useState(nftInfo),
    nftSelect = _a[0],
    setNftSelect = _a[1];
  var _b = react_1.useState(0),
    time = _b[0],
    setTime = _b[1];
  var _c = react_1.useState([]),
    currentItems = _c[0],
    setCurrentItems = _c[1];
  var _d = react_1.useState([]),
    currentInv = _d[0],
    setCurrentInv = _d[1];
  var _e = react_redux_1.useSelector(function (state) {
      return state.minted;
    }),
    dataloaded = _e.dataloaded,
    disponibleNftp = _e.disponibleNftp,
    disponibleNfti = _e.disponibleNfti,
    priceFormat = _e.priceFormat,
    MintedNft = _e.MintedNft;
  var dispatch = react_redux_1.useDispatch();
  var getNft = function () {
    return __awaiter(void 0, void 0, void 0, function () {
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
  var setNftInfo = function (_nombre, _image, _price, _id) {
    setNftSelect(function (prevState) {
      return __assign(__assign({}, prevState), { nombre: _nombre });
    });
    setNftSelect(function (prevState) {
      return __assign(__assign({}, prevState), { image: _image });
    });
    setNftSelect(function (prevState) {
      return __assign(__assign({}, prevState), { price: _price });
    });
    setNftSelect(function (prevState) {
      return __assign(__assign({}, prevState), { id: _id });
    });
    //funcion que llame el tipo de staking
  };
  react_1.useEffect(
    function () {
      var fetchItems = function () {
        return __awaiter(void 0, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [4 /*yield*/, getNft()];
              case 1:
                _a.sent();
                //const itemsPerPage = 6
                //const start = (currentPage - 1) * itemsPerPage
                setCurrentItems(disponibleNftp);
                setCurrentInv(disponibleNfti);
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
    React.Fragment,
    null,
    React.createElement(next_seo_1.NextSeo, {
      title: 'Pandora X',
      description: 'Criptic - React Next Web3 NFT Crypto Dashboard Template',
    }),
    React.createElement(
      'div',
      { className: 'flex ' },
      React.createElement(
        'div',
        {
          className:
            'mb-8 w-full sm:mb-0 sm:w-1/2 sm:ltr:pr-6 sm:rtl:pl-6 md:w-[calc(100%-358px)] lg:w-[calc(100%-358px)] 2xl:w-[calc(100%-358px)] 3xl:w-[calc(100%-358px)]',
        },
        React.createElement(nftSlider_1['default'], {
          nfts: currentInv,
          priceFormat: priceFormat,
          nftInfo: nftInfo,
          setNftInfo: setNftInfo,
        })
      ),
      React.createElement(
        'div',
        {
          className:
            ' mb-8 grid w-full grid-cols-1 gap-6 sm:mb-10 sm:grid-cols-2  lg:mb-0 lg:flex sm:w-1/2 md:w-64 lg:w-72 lg:flex-col 2xl:w-80 3xl:w-[358px]',
        },
        React.createElement(overview_chart_1['default'], null)
      )
    ),
    React.createElement(
      'div',
      { className: 'flex flex-wrap' },
      React.createElement(
        'div',
        {
          className:
            'w-[100%] lg:w-[100%] ltr:lg:pr-6 rtl:lg:pl-6 2xl:w-[100%] 3xl:w-[100%]',
        },
        React.createElement(transaction_table_1['default'], null)
      ),
      React.createElement('div', {
        className:
          'order-first mb-8 grid w-full grid-cols-1 gap-6 sm:mb-10 sm:grid-cols-2 lg:order-1 lg:mb-0 lg:flex lg:w-72 lg:flex-col 2xl:w-80 3xl:w-[358px]',
      })
    )
  );
};
HomePage.getLayout = function getLayout(page) {
  return React.createElement(_dashboard_1['default'], null, page);
};
exports['default'] = HomePage;
