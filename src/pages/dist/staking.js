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
var react_1 = require('react');
var next_seo_1 = require('next-seo');
var _dashboard_1 = require('@/layouts/_dashboard');
var image_1 = require('@/components/ui/image');
var button_1 = require('@/components/ui/button');
var input_1 = require('@/components/ui/forms/input');
var input_label_1 = require('@/components/ui/input-label');
var react_redux_1 = require('react-redux');
var MintedAction_1 = require('../redux/Minted/MintedAction');
var nftSlider_1 = require('@/components/ui/nftSlider');
var StakingPage = function () {
  //la idea es mostrar los nfts de staking del usuario
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
  var _c = react_1.useState(0),
    status = _c[0],
    setStatus = _c[1];
  var _d = react_1.useState([]),
    currentItems = _d[0],
    setCurrentItems = _d[1];
  var _e = react_1.useState([]),
    currentInv = _e[0],
    setCurrentInv = _e[1];
  var _f = react_redux_1.useSelector(function (state) {
      return state.minted;
    }),
    dataloaded = _f.dataloaded,
    disponibleNftp = _f.disponibleNftp,
    disponibleNfti = _f.disponibleNfti,
    priceFormat = _f.priceFormat,
    MintedNft = _f.MintedNft;
  var dispatch = react_redux_1.useDispatch();
  var inversionMinter = react_redux_1.useSelector(function (state) {
    return state.blockchain;
  }).inversionMinter;
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
  var getTime = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var tipo;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, inversionMinter.getTypeOfStaking(nftInfo.id)];
          case 1:
            tipo = _a.sent();
            if (tipo === '1Y') {
              setTime(1);
            } else if (tipo == '2Y') {
              setTime(2);
            } else if (tipo == '3Y') {
              setTime(3);
            } else if (tipo == '4Y') {
              setTime(4);
            } else if (tipo == '5Y') {
              setTime(5);
            }
            return [2 /*return*/];
        }
      });
    });
  };
  var Stake = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var tx;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              inversionMinter.stake(nftInfo.id, time),
              //si esta referido llamar a otra funcion y mandar la wallet del stake
            ];
          case 1:
            tx = _a.sent();
            //si esta referido llamar a otra funcion y mandar la wallet del stake
            if (tx.result == 1) {
              //setear la transiccion como correcta
            } else {
              //setear la transacion como incorrecta
            }
            return [2 /*return*/];
        }
      });
    });
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
  /*useEffect(() => {
      getTime();
    }, [nftSelect])*/
  react_1.useEffect(
    function () {
      setTimeout(function () {
        setStatus(0);
      }, 5000);
    },
    [status]
  );
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(next_seo_1.NextSeo, {
      title: 'Create NFT',
      description: 'Criptic - React Next Web3 NFT Crypto Dashboard Template',
    }),
    React.createElement(
      'div',
      {
        className:
          'mb-8 w-full h-[630px] sm:mb-0 sm:w-1/2 sm:ltr:pr-6 sm:rtl:pl-6 md:w-[100%] lg:w-[100%] 2xl:w-[100%] 3xl:w-[100%]',
      },
      React.createElement(nftSlider_1['default'], {
        nfts: currentInv,
        priceFormat: priceFormat,
        nftInfo: nftInfo,
        setNftInfo: setNftInfo,
        type: 'staking',
      })
    ),
    React.createElement(
      'div',
      {
        className:
          'mx-auto w-full px-4 pt-8 pb-14 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8 xl:px-10 2xl:px-0',
      },
      React.createElement(
        'div',
        { className: 'mb-8 grid grid-cols-1 gap-12 lg:grid-cols-3' },
        React.createElement(
          'div',
          { className: 'lg:col-span-2' },
          React.createElement(
            'div',
            { className: 'mb-8' },
            React.createElement(input_label_1['default'], {
              title: 'Name',
              important: true,
            }),
            React.createElement(input_1['default'], {
              type: 'text',
              placeholder: 'Item name',
              //onChange={(e) => setNombre(e.target.value)}
              value: nftSelect.nombre,
              disabled: true,
            })
          ),
          React.createElement(
            'div',
            { className: 'mb-8' },
            React.createElement(input_label_1['default'], { title: 'Id' }),
            React.createElement(input_1['default'], {
              type: 'text',
              placeholder: 'https://yourimage.io/item/123',
              //onChange={(e) => setUrl(e.target.value)}
              value: nftSelect.id,
              disabled: true,
            })
          ),
          React.createElement(
            'div',
            { className: 'mb-8' },
            React.createElement(input_label_1['default'], {
              title: 'Tiempo de staking',
            }),
            React.createElement(input_1['default'], {
              type: 'text',
              placeholder: '0',
              //onChange={(e) => setUrl(e.target.value)}
              value: '5 Años',
              disabled: true,
            })
          ),
          React.createElement(
            'div',
            { className: 'mb-8' },
            React.createElement(input_label_1['default'], { title: 'APR' }),
            React.createElement(input_1['default'], {
              type: 'text',
              placeholder: '0',
              //onChange={(e) => setUrl(e.target.value)}
              value: '10%',
              disabled: true,
            })
          ),
          React.createElement(
            'div',
            { className: 'mb-8' },
            React.createElement(
              'div',
              { className: 'mb-8' },
              React.createElement('div', { className: 'relative' })
            ),
            1 === 0 &&
              React.createElement(
                button_1['default'],
                {
                  shape: 'rounded',
                  onClick: function () {
                    return Stake();
                  },
                },
                'Stake'
              ),
            1 === 1 &&
              React.createElement(
                button_1['default'],
                {
                  shape: 'rounded',
                  onClick: function () {
                    return Stake();
                  },
                },
                'Approve'
              )
          )
        ),
        React.createElement(
          'div',
          { className: 'hidden flex-col lg:flex' },
          React.createElement(input_label_1['default'], { title: 'Preview' }),
          React.createElement(
            'div',
            {
              className:
                'relative flex flex-grow flex-col overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark',
            },
            React.createElement(
              'div',
              { className: 'relative block w-full pb-full' },
              React.createElement(image_1['default'], {
                src: nftSelect.image,
                layout: 'fill',
                objectFit: 'cover',
                alt: 'Pulses of Imagination #214',
              })
            ),
            React.createElement(
              'div',
              { className: 'p-5' },
              React.createElement(
                'div',
                { className: 'text-sm font-medium text-black dark:text-white' },
                nftSelect.nombre
              ),
              React.createElement(
                'div',
                {
                  className:
                    'mt-4 text-lg font-medium text-gray-900 dark:text-white',
                },
                nftSelect.price,
                ' USDT'
              )
            )
          )
        )
      )
    ),
    status == 200 &&
      React.createElement(
        'div',
        {
          className:
            'p-4 mb-4 text-sm w-[300px] flex self-center justify-center ml-[580px] mt-[30px] text-green-700 bg-green-200 rounded-lg dark:bg-green-200 dark:text-green-800',
          role: 'alert',
        },
        React.createElement(
          'span',
          { className: 'font-medium' },
          'Usuario creado correctamente'
        )
      ),
    status == 100 &&
      React.createElement(
        'div',
        {
          className:
            'p-4 mb-4 text-sm w-[300px] ml-[580px] mt-[30px] self-center justify-center  text-red-700 bg-red-200 rounded-lg dark:bg-red-200 dark:text-red-800',
          role: 'alert',
        },
        React.createElement(
          'span',
          { className: 'font-medium' },
          'operacion fallo en el minteo'
        )
      )
  );
};
StakingPage.getLayout = function getLayout(page) {
  return React.createElement(_dashboard_1['default'], null, page);
};
exports['default'] = StakingPage;
function dispatch(arg0) {
  throw new Error('Function not implemented.');
}
