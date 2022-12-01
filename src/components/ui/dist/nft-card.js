'use strict';
var __makeTemplateObject =
  (this && this.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, 'raw', { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
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
var image_1 = require('@/components/ui/image');
var verified_1 = require('@/components/icons/verified');
var styled_components_1 = require('styled-components');
var react_1 = require('react');
var react_redux_1 = require('react-redux');
var ethers_1 = require('ethers');
var react_2 = require('react');
var blockchainAction_1 = require('../../redux/Blockchain/blockchainAction');
var active_link_1 = require('./links/active-link');
var button_1 = require('@/components/ui/button');
function NFTGrid(_a) {
  var _this = this;
  var //author,
    //authorImage,
    image = _a.image,
    name = _a.name,
    number = _a.number,
    price = _a.price,
    alldata = _a.alldata,
    type = _a.type,
    nftInfo = _a.nftInfo,
    setNftInfo = _a.setNftInfo;
  //const { isConnect, account } = useSelector((state) => state.Usuario);
  var _b = react_redux_1.useSelector(function (state) {
      return state.blockchain;
    }),
    productoMinter = _b.productoMinter,
    inversionMinter = _b.inversionMinter,
    isConnect = _b.isConnect,
    accountAddress = _b.accountAddress,
    usdtContract = _b.usdtContract,
    tokenContract = _b.tokenContract;
  var referidor = react_redux_1.useSelector(function (state) {
    return state.Usuario;
  }).referidor;
  /*const signer = provider?.getSigner();
    console.log(signer);
    const tokenContract = new ethers.Contract(
      '0xB797D01EA243bCBFAd70c1c57fB12953e5e4043F',
      abiErc20,
      signer
    );*/
  //token Cambiar ABi solo con fines de prueba
  /*const nudaraMinter = new ethers.Contract(
      '0x6BB9547894806539C1465AeBafb3018adB0a313E',
      nudaraMinterAbi,
      signer
    );*/ //Contracto del marketplace
  var _c = react_1.useState(''),
    tokenAddress = _c[0],
    setTokenAddress = _c[1];
  var _d = react_1.useState(false),
    loading = _d[0],
    setLoading = _d[1];
  var _e = react_1.useState(''),
    cuenta = _e[0],
    setCuenta = _e[1];
  var _f = react_1.useState(0),
    approvedUsdt = _f[0],
    setApprovedUsdt = _f[1];
  var _g = react_1.useState(0),
    approvedToken = _g[0],
    setApprovedToken = _g[1];
  var Usuario = react_redux_1.useSelector(function (state) {
    return state.Usuario;
  });
  var dispatch = react_redux_1.useDispatch();
  var GlassCard = styled_components_1['default'].div(
    templateObject_1 ||
      (templateObject_1 = __makeTemplateObject(
        [
          '\n    background: rgba(255, 255, 255, 0.093);\n    border-radius: 16px;\n    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);\n    backdrop-filter: blur(5.7px);\n    -webkit-backdrop-filter: blur(5.7px);\n    border: 1px solid rgba(255, 255, 255, 0.241);\n    width: 250px;\n    height: 350px;\n    overflow: hidden;\n  ',
        ],
        [
          '\n    background: rgba(255, 255, 255, 0.093);\n    border-radius: 16px;\n    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);\n    backdrop-filter: blur(5.7px);\n    -webkit-backdrop-filter: blur(5.7px);\n    border: 1px solid rgba(255, 255, 255, 0.241);\n    width: 250px;\n    height: 350px;\n    overflow: hidden;\n  ',
        ]
      ))
  );
  var CButton = styled_components_1['default'].div(
    templateObject_2 ||
      (templateObject_2 = __makeTemplateObject(
        [
          '\n    background: #000;\n    border: none;\n    border-radius: 16px;\n    color: #fff;\n    font-size: 14px;\n    font-weight: 600;\n    padding: 5px 20px;\n    text-transform: uppercase;\n    transition: all 0.1s ease-in-out;\n    width: 55%;\n  ',
        ],
        [
          '\n    background: #000;\n    border: none;\n    border-radius: 16px;\n    color: #fff;\n    font-size: 14px;\n    font-weight: 600;\n    padding: 5px 20px;\n    text-transform: uppercase;\n    transition: all 0.1s ease-in-out;\n    width: 55%;\n  ',
        ]
      ))
  );
  var Options = styled_components_1['default'].option(
    templateObject_3 ||
      (templateObject_3 = __makeTemplateObject(
        [
          '\n    color: #fff;\n    background: #000;\n    font-weight: 600;\n    text-transform: uppercase;\n    cursor: pointer;\n  ',
        ],
        [
          '\n    color: #fff;\n    background: #000;\n    font-weight: 600;\n    text-transform: uppercase;\n    cursor: pointer;\n  ',
        ]
      ))
  );
  var Select = styled_components_1['default'].select(
    templateObject_4 ||
      (templateObject_4 = __makeTemplateObject(
        [
          '\n    background: #000;\n    border: none;\n    border-radius: 16px;\n    color: #fff;\n    font-size: 14px;\n    font-weight: 600;\n    padding: 5px 20px;\n    text-transform: uppercase;\n    transition: all 0.1s ease-in-out;\n    cursor: pointer;\n    &:hover {\n      background: #fff;\n      color: #000;\n    }\n  ',
        ],
        [
          '\n    background: #000;\n    border: none;\n    border-radius: 16px;\n    color: #fff;\n    font-size: 14px;\n    font-weight: 600;\n    padding: 5px 20px;\n    text-transform: uppercase;\n    transition: all 0.1s ease-in-out;\n    cursor: pointer;\n    &:hover {\n      background: #fff;\n      color: #000;\n    }\n  ',
        ]
      ))
  );
  var buyNft = function (id) {
    return __awaiter(_this, void 0, void 0, function () {
      var porcentaje, tx, tx, tx, err_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setLoading(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 12, , 13]);
            if (!(type == 'producto')) return [3 /*break*/, 8];
            if (!(!Usuario.isReferido && Usuario.type == 'Agente X'))
              return [3 /*break*/, 4];
            porcentaje = 0;
            if (Usuario.range == 'peerx') {
              porcentaje = 200;
            } else if (Usuario.range == 'blockelite') {
              porcentaje = 250;
            } else if (Usuario.range == 'blockmaster') {
              porcentaje = 350;
            } else if (Usuario.range == 'blockcreator') {
              porcentaje = 400;
            }
            return [
              4 /*yield*/,
              productoMinter.buyTokenWithReferido(
                id.toString(),
                tokenContract.address,
                referidor,
                porcentaje
              ),
            ];
          case 2:
            tx = _a.sent();
            //referidos
            return [4 /*yield*/, tx.wait()];
          case 3:
            //referidos
            _a.sent();
            setLoading(false);
            setApprovedToken(0);
            return [3 /*break*/, 7];
          case 4:
            return [
              4 /*yield*/,
              productoMinter.buyToken(id.toString(), tokenContract.address),
            ];
          case 5:
            tx = _a.sent();
            return [4 /*yield*/, tx.wait()];
          case 6:
            _a.sent(); //tener en cuenta para los proximos cambios
            setLoading(false);
            setApprovedToken(0);
            _a.label = 7;
          case 7:
            return [3 /*break*/, 11];
          case 8:
            if (!(type == 'inversion')) return [3 /*break*/, 11];
            return [4 /*yield*/, inversionMinter.buyToken(id.toString())];
          case 9:
            tx = _a.sent();
            return [4 /*yield*/, tx.wait()];
          case 10:
            _a.sent();
            setLoading(false);
            setApprovedToken(0);
            _a.label = 11;
          case 11:
            return [3 /*break*/, 13];
          case 12:
            err_1 = _a.sent();
            setLoading(false);
            return [3 /*break*/, 13];
          case 13:
            return [2 /*return*/];
        }
      });
    });
  };
  var verifyApprove = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var usdt, usdt, e_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 5, , 6]);
            if (!(type == 'producto')) return [3 /*break*/, 2];
            return [
              4 /*yield*/,
              tokenContract.allowance(accountAddress, productoMinter.address),
            ];
          case 1:
            usdt = _a.sent();
            //setApprovedUsdt(ethers.utils.formatUnits(usdt, 18));
            setApprovedToken(ethers_1.ethers.utils.formatUnits(usdt, 18));
            return [3 /*break*/, 4];
          case 2:
            if (!(type == 'inversion')) return [3 /*break*/, 4];
            return [
              4 /*yield*/,
              tokenContract.allowance(accountAddress, inversionMinter.address),
            ];
          case 3:
            usdt = _a.sent();
            //setApprovedUsdt(ethers.utils.formatUnits(usdt, 18));
            setApprovedToken(ethers_1.ethers.utils.formatUnits(usdt, 18));
            _a.label = 4;
          case 4:
            return [3 /*break*/, 6];
          case 5:
            e_1 = _a.sent();
            console.log(e_1);
            return [3 /*break*/, 6];
          case 6:
            return [2 /*return*/];
        }
      });
    });
  };
  var approve = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var decimals, tx, decimals, tx, e_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setLoading(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 10, , 11]);
            if (!(type == 'producto')) return [3 /*break*/, 5];
            setTokenAddress(tokenContract.address);
            decimals = 18;
            console.log(tokenContract);
            return [
              4 /*yield*/,
              tokenContract.approve(
                productoMinter.address,
                ethers_1.ethers.utils.parseUnits('999', decimals)
              ),
            ];
          case 2:
            tx = _a.sent();
            return [4 /*yield*/, tx.wait()];
          case 3:
            _a.sent();
            return [4 /*yield*/, verifyApprove()];
          case 4:
            _a.sent();
            setLoading(false);
            return [3 /*break*/, 9];
          case 5:
            if (!(type == 'inversion')) return [3 /*break*/, 9];
            setTokenAddress(tokenContract.address);
            decimals = 18;
            return [
              4 /*yield*/,
              tokenContract.approve(
                inversionMinter.address,
                ethers_1.ethers.utils.parseUnits('999', decimals)
              ),
            ];
          case 6:
            tx = _a.sent();
            return [4 /*yield*/, tx.wait()];
          case 7:
            _a.sent();
            return [4 /*yield*/, verifyApprove()];
          case 8:
            _a.sent();
            setLoading(false);
            _a.label = 9;
          case 9:
            return [3 /*break*/, 11];
          case 10:
            e_2 = _a.sent();
            setLoading(false);
            return [3 /*break*/, 11];
          case 11:
            return [2 /*return*/];
        }
      });
    });
  };
  react_2.useEffect(
    function () {
      if (isConnect) {
        setCuenta(accountAddress);
      }
    },
    [isConnect]
  );
  return React.createElement(
    'div',
    {
      className:
        'relative w-[300px] overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark',
    },
    React.createElement(
      'div',
      { className: 'p-4' },
      React.createElement('div', {
        className:
          'flex items-center text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white',
      })
    ),
    React.createElement(
      'div',
      { className: 'relative block w-full pb-full' },
      React.createElement(image_1['default'], {
        src: image,
        //placeholder="blur"
        layout: 'fill',
        objectFit: 'cover',
        alt: '',
      })
    ),
    React.createElement(
      'div',
      { className: 'p-5' },
      React.createElement(
        'div',
        { className: 'text-sm font-medium text-black dark:text-white' },
        name
      ),
      React.createElement(
        'div',
        { className: 'mt-1.5 flex' },
        React.createElement(
          'div',
          {
            className:
              'inline-flex items-center text-xs text-gray-600 dark:text-gray-400',
          },
          parseInt(number) + 1,
          React.createElement(verified_1.Verified, {
            className: 'ltr:ml-1 rtl:mr-1',
          })
        )
      ),
      alldata &&
        React.createElement(
          'div',
          {
            className: 'mt-4 text-lg font-medium text-gray-900 dark:text-white',
          },
          price
        ),
      React.createElement(
        'div',
        null,
        loading &&
          React.createElement(
            button_1['default'],
            { size: 'small', type: 'button', disabled: true },
            React.createElement('span', {
              className: 'spinner-border spinner-border-sm',
              role: 'status',
              'aria-hidden': 'true',
            }),
            'Loading...'
          ),
        alldata &&
          !loading &&
          !isConnect &&
          React.createElement(
            button_1['default'],
            {
              size: 'small',
              onClick: function () {
                dispatch(blockchainAction_1.connectWallet());
              },
            },
            'Connect Wallet'
          ),
        alldata &&
          isConnect &&
          !loading &&
          price > approvedToken &&
          React.createElement(
            button_1['default'],
            { size: 'small', onClick: approve },
            'Approve'
          ),
        alldata &&
          isConnect &&
          !loading /*&& tokenAddress === '0xB797D01EA243bCBFAd70c1c57fB12953e5e4043F'*/ &&
          price <= approvedToken &&
          React.createElement(
            button_1['default'],
            {
              size: 'small',
              onClick: function () {
                return buyNft(number);
              },
            },
            'Buy'
          ),
        type == 'staking' &&
          React.createElement(
            'div',
            { className: ' row ml-[-10px] mt-2   flex justify-evenly' },
            React.createElement(
              active_link_1['default'],
              { href: '/staking/' + number },
              React.createElement(
                button_1['default'],
                { size: 'small' },
                'Stake'
              )
            ),
            React.createElement(
              active_link_1['default'],
              { href: '/infoinv/' + number },
              React.createElement(
                button_1['default'],
                { size: 'small' },
                'Ver mas...'
              )
            )
          ),
        type == 'productos' &&
          React.createElement(
            active_link_1['default'],
            { href: '/info/' + number },
            React.createElement(
              button_1['default'],
              { size: 'small', className: 'mt-2' },
              'Ver mas...'
            )
          )
      )
    )
  );
}
exports['default'] = NFTGrid;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
