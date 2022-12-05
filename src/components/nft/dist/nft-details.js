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
var classnames_1 = require('classnames');
var param_tab_1 = require('@/components/ui/param-tab');
var image_1 = require('@/components/ui/image');
var anchor_link_1 = require('@/components/ui/links/anchor-link');
var button_1 = require('@/components/ui/button');
var _3_png_1 = require('@/assets/images/avatar/3.png');
var context_1 = require('@/components/modal-views/context');
var react_1 = require('react');
var react_redux_1 = require('react-redux');
var ethers_1 = require('ethers');
var blockchainAction_1 = require('../../redux/Blockchain/blockchainAction');
function NftFooter(_a) {
  var _this = this;
  var _b = _a.className,
    className = _b === void 0 ? 'md:hidden' : _b,
    price = _a.price,
    tipo = _a.tipo,
    tipoN = _a.tipoN,
    id = _a.id;
  var openModal = context_1.useModal().openModal;
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
  var _h = react_1.useState(false),
    status = _h[0],
    setStatus = _h[1];
  var _j = react_1.useState(''),
    alertMsg = _j[0],
    setAlertMsg = _j[1];
  var Usuario = react_redux_1.useSelector(function (state) {
    return state.Usuario;
  });
  var _k = react_1.useState(price),
    auxPrice = _k[0],
    setAuxPrice = _k[1];
  var _l = react_redux_1.useSelector(function (state) {
      return state.blockchain;
    }),
    productoMinter = _l.productoMinter,
    inversionMinter = _l.inversionMinter,
    isConnect = _l.isConnect,
    accountAddress = _l.accountAddress,
    tokenContract = _l.tokenContract,
    usdtContract = _l.usdtContract;
  var referidor = react_redux_1.useSelector(function (state) {
    return state.Usuario;
  }).referidor;
  var dispatch = react_redux_1.useDispatch();
  var verifyApprove = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var usdt, usdt, e_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 5, , 6]);
            if (!(tipo == 'producto')) return [3 /*break*/, 2];
            return [
              4 /*yield*/,
              tokenContract.allowance(accountAddress, productoMinter.address),
            ];
          case 1:
            usdt = _a.sent();
            alert(price); //MarketPlace
            //setApprovedUsdt(ethers.utils.formatUnits(usdt, 18));
            setApprovedToken(ethers_1.ethers.utils.formatUnits(usdt, 6));
            return [3 /*break*/, 4];
          case 2:
            if (!(tipo == 'inversion')) return [3 /*break*/, 4];
            return [
              4 /*yield*/,
              tokenContract.allowance(accountAddress, inversionMinter.address),
            ];
          case 3:
            usdt = _a.sent();
            //setApprovedUsdt(ethers.utils.formatUnits(usdt, 18));
            setApprovedToken(ethers_1.ethers.utils.formatUnits(usdt, 6));
            _a.label = 4;
          case 4:
            return [3 /*break*/, 6];
          case 5:
            e_1 = _a.sent();
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
            if (!(tipo == 'producto')) return [3 /*break*/, 5];
            setTokenAddress(tokenContract.address);
            decimals = 6;
            return [
              4 /*yield*/,
              tokenContract.approve(
                productoMinter.address,
                ethers_1.ethers.utils.parseUnits(price.toString(), decimals)
              ),
            ];
          case 2:
            tx = _a.sent();
            setAuxPrice(
              ethers_1.ethers.utils.parseUnits(price.toString(), decimals)
            );
            return [4 /*yield*/, tx.wait()];
          case 3:
            _a.sent();
            return [4 /*yield*/, verifyApprove()];
          case 4:
            _a.sent();
            setLoading(false);
            return [3 /*break*/, 9];
          case 5:
            if (!(tipo == 'inversion')) return [3 /*break*/, 9];
            setTokenAddress(tokenContract.address);
            decimals = 6;
            return [
              4 /*yield*/,
              tokenContract.approve(
                inversionMinter.address,
                ethers_1.ethers.utils.parseUnits(price.toString(), decimals)
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
  var buyNft = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var porcentaje, tx, tx, tx, err_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setLoading(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 12, , 13]);
            if (!(tipo == 'producto')) return [3 /*break*/, 8];
            if (!(Usuario.isReferido && Usuario.type == 'Agente X'))
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
            alert;
            return [
              4 /*yield*/,
              productoMinter.buyTokenWithReferido(
                tipoN,
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
            dispatch(blockchainAction_1.uProduct());
            setStatus(true);
            setAlertMsg('Nft comprado exitosamente');
            return [3 /*break*/, 7];
          case 4:
            return [
              4 /*yield*/,
              productoMinter.buyToken(1, tokenContract.address),
            ];
          case 5:
            tx = _a.sent();
            return [4 /*yield*/, tx.wait()];
          case 6:
            _a.sent(); //tener en cuenta para los proximos cambios
            setLoading(false);
            setApprovedToken(0);
            dispatch(blockchainAction_1.uProduct());
            setStatus(true);
            setAlertMsg('Nft comprado exitosamente');
            _a.label = 7;
          case 7:
            return [3 /*break*/, 11];
          case 8:
            if (!(tipo == 'inversion')) return [3 /*break*/, 11];
            return [
              4 /*yield*/,
              inversionMinter.buyToken(tipoN, tokenContract.address),
            ];
          case 9:
            tx = _a.sent();
            return [4 /*yield*/, tx.wait()];
          case 10:
            _a.sent();
            setLoading(false);
            setApprovedToken(0);
            dispatch(blockchainAction_1.uInvertion());
            setStatus(true);
            setAlertMsg('Nft comprado exitosamente');
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
  react_1.useEffect(
    function () {
      setTimeout(function () {
        setStatus(false);
      }, 5000);
    },
    [status]
  );
  return React.createElement(
    'div',
    {
      className: classnames_1['default'](
        'sticky bottom-0 z-10 bg-body dark:bg-dark md:-mx-2',
        className
      ),
    },
    React.createElement(
      'div',
      {
        className:
          '-mx-4 border-t-2 border-gray-900 px-4 pt-4 pb-5 dark:border-gray-700 sm:-mx-6 sm:px-6 md:mx-2 md:px-0 md:pt-5 lg:pt-6 lg:pb-7',
      },
      React.createElement(
        'div',
        { className: 'flex gap-4 pb-3.5 md:pb-4 xl:gap-5' },
        React.createElement(
          'div',
          { className: 'block w-1/2 shrink-0 md:w-2/5' },
          React.createElement(
            'h3',
            {
              className:
                'mb-1 truncate text-13px font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:mb-1.5 sm:text-sm',
            },
            'Precio ',
            React.createElement('span', { className: 'md:hidden' }, 'by'),
            ' ',
            React.createElement(anchor_link_1['default'], {
              href: '#',
              className:
                'normal-case text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:hidden',
            })
          ),
          React.createElement(
            'div',
            {
              className:
                'text-lg font-medium -tracking-wider md:text-xl xl:text-2xl',
            },
            price,
            ' USDT'
          ),
          React.createElement(
            anchor_link_1['default'],
            {
              href: '#',
              className:
                'mt-2 hidden items-center text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:inline-flex',
            },
            React.createElement(
              'div',
              { className: 'h-6 w-6 rounded-full ltr:mr-2 rtl:ml-2' },
              React.createElement(image_1['default'], {
                src: _3_png_1['default'],
                alt: 'avatar',
                width: 24,
                height: 24,
              })
            ),
            '@PandoraX'
          )
        )
      ),
      tipo == 'producto' &&
        React.createElement(
          'div',
          { className: 'grid grid-cols-2 gap-3' },
          !loading &&
            parseInt(price) > approvedToken &&
            React.createElement(
              button_1['default'],
              {
                shape: 'rounded',
                onClick: function () {
                  return approve();
                },
              },
              'Aprobar'
            ),
          !loading &&
            parseInt(price) <= approvedToken &&
            React.createElement(
              button_1['default'],
              {
                shape: 'rounded',
                onClick: function () {
                  return buyNft();
                },
              },
              'Comprar por ' + price + ' '
            ),
          loading &&
            React.createElement(
              button_1['default'],
              { shape: 'rounded' },
              'Cargando...'
            ),
          React.createElement(
            button_1['default'],
            {
              shape: 'rounded',
              variant: 'solid',
              color: 'gray',
              className: 'dark:bg-gray-800',
              onClick: function () {
                return openModal('SHARE_VIEW');
              },
            },
            'Compartir'
          )
        ),
      tipo == 'inversion' &&
        React.createElement(
          'div',
          { className: 'grid grid-cols-2 gap-3' },
          !loading &&
            parseInt(price) > approvedToken &&
            React.createElement(
              button_1['default'],
              {
                shape: 'rounded',
                onClick: function () {
                  return approve();
                },
              },
              'Aprobar'
            ),
          !loading &&
            parseInt(price) <= approvedToken &&
            React.createElement(
              button_1['default'],
              {
                shape: 'rounded',
                onClick: function () {
                  return buyNft();
                },
              },
              'Comprar por ' + price + ' '
            ),
          loading &&
            React.createElement(
              button_1['default'],
              { shape: 'rounded' },
              'Cargando...'
            ),
          React.createElement(
            button_1['default'],
            {
              shape: 'rounded',
              variant: 'solid',
              color: 'gray',
              className: 'dark:bg-gray-800',
              onClick: function () {
                return openModal('SHARE_VIEW');
              },
            },
            'Compartir'
          )
        ),
      tipo == 'pcomprado' &&
        React.createElement(
          'div',
          { className: 'grid grid-cols-2 gap-3' },
          React.createElement(
            button_1['default'],
            { shape: 'rounded' },
            'Transfer'
          )
        ),
      tipo == 'invcomprado' &&
        React.createElement(
          'div',
          { className: 'grid grid-cols-2 gap-3' },
          React.createElement(
            button_1['default'],
            { shape: 'rounded' },
            'Transfer'
          ),
          React.createElement(
            anchor_link_1['default'],
            { href: '/staking/' + id },
            React.createElement(
              button_1['default'],
              { variant: 'solid', shape: 'rounded' },
              'Stake'
            )
          )
        )
    ),
    status &&
      React.createElement(
        'div',
        {
          className:
            'absolute top-[200px] right-[100px] mb-4 mt-[0px] w-[300px] justify-center self-center rounded-lg bg-green-200  p-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800',
          role: 'alert',
        },
        React.createElement('span', { className: 'font-medium' }, alertMsg)
      )
  );
}
function NftDetails(_a) {
  var _this = this;
  var product = _a.product,
    type = _a.type;
  var img = product.img,
    Nombre = product.Nombre,
    descripcion = product.descripcion,
    precio = product.precio,
    id = product.id,
    tipo = product.tipo,
    tipoN = product.tipoN;
  var _b = react_1.useState(''),
    tokenAddress = _b[0],
    setTokenAddress = _b[1];
  var _c = react_1.useState(false),
    loading = _c[0],
    setLoading = _c[1];
  var _d = react_1.useState(''),
    cuenta = _d[0],
    setCuenta = _d[1];
  var _e = react_1.useState(0),
    approvedUsdt = _e[0],
    setApprovedUsdt = _e[1];
  var _f = react_1.useState(0),
    approvedToken = _f[0],
    setApprovedToken = _f[1];
  var _g = react_1.useState(false),
    status = _g[0],
    setStatus = _g[1];
  var _h = react_1.useState(''),
    alertMsg = _h[0],
    setAlertMsg = _h[1];
  var Usuario = react_redux_1.useSelector(function (state) {
    return state.Usuario;
  });
  var _j = react_redux_1.useSelector(function (state) {
      return state.blockchain;
    }),
    productoMinter = _j.productoMinter,
    inversionMinter = _j.inversionMinter,
    isConnect = _j.isConnect,
    accountAddress = _j.accountAddress,
    usdtContract = _j.usdtContract,
    tokenContract = _j.tokenContract;
  var referidor = react_redux_1.useSelector(function (state) {
    return state.Usuario;
  }).referidor;
  var dispatch = react_redux_1.useDispatch();
  var verifyApprove = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var usdt, usdt, e_3;
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
            setApprovedToken(ethers_1.ethers.utils.formatUnits(usdt, 6));
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
            setApprovedToken(ethers_1.ethers.utils.formatUnits(usdt, 6));
            _a.label = 4;
          case 4:
            return [3 /*break*/, 6];
          case 5:
            e_3 = _a.sent();
            return [3 /*break*/, 6];
          case 6:
            return [2 /*return*/];
        }
      });
    });
  };
  var approve = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var decimals, tx, decimals, tx, e_4;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setLoading(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 10, , 11]);
            if (!(type == 'producto')) return [3 /*break*/, 5];
            setTokenAddress(tokenContract.address);
            decimals = 6;
            return [
              4 /*yield*/,
              tokenContract.approve(
                productoMinter.address,
                ethers_1.ethers.utils.parseUnits(
                  product.precio.toString(),
                  decimals
                )
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
            decimals = 6;
            return [
              4 /*yield*/,
              tokenContract.approve(
                inversionMinter.address,
                ethers_1.ethers.utils.parseUnits(
                  product.precio.toString(),
                  decimals
                )
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
            e_4 = _a.sent();
            setLoading(false);
            return [3 /*break*/, 11];
          case 11:
            return [2 /*return*/];
        }
      });
    });
  };
  var buyNft = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var porcentaje, tx, tx, tx, err_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setLoading(true);
            alert('a');
            _a.label = 1;
          case 1:
            _a.trys.push([1, 12, , 13]);
            if (!(type == 'producto')) return [3 /*break*/, 8];
            if (!(Usuario.isReferido && Usuario.type == 'Agente X'))
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
            alert(approvedToken);
            return [
              4 /*yield*/,
              productoMinter.buyTokenWithReferido(
                tipoN,
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
            dispatch(blockchainAction_1.uProduct());
            setStatus(true);
            setAlertMsg('Nft comprado exitosamente');
            alert('a');
            return [3 /*break*/, 7];
          case 4:
            return [
              4 /*yield*/,
              productoMinter.buyToken(tipoN, tokenContract.address),
            ];
          case 5:
            tx = _a.sent();
            return [4 /*yield*/, tx.wait()];
          case 6:
            _a.sent(); //tener en cuenta para los proximos cambios
            setLoading(false);
            setApprovedToken(0);
            dispatch(blockchainAction_1.uProduct());
            setStatus(true);
            setAlertMsg('Nft comprado exitosamente');
            _a.label = 7;
          case 7:
            return [3 /*break*/, 11];
          case 8:
            if (!(type == 'inversion')) return [3 /*break*/, 11];
            return [
              4 /*yield*/,
              inversionMinter.buyToken(tipoN, tokenContract.address),
            ];
          case 9:
            tx = _a.sent();
            return [4 /*yield*/, tx.wait()];
          case 10:
            _a.sent();
            setLoading(false);
            setApprovedToken(0);
            dispatch(blockchainAction_1.uInvertion());
            setStatus(true);
            setAlertMsg('Nft comprado exitosamente');
            _a.label = 11;
          case 11:
            return [3 /*break*/, 13];
          case 12:
            err_2 = _a.sent();
            setLoading(false);
            return [3 /*break*/, 13];
          case 13:
            return [2 /*return*/];
        }
      });
    });
  };
  react_1.useEffect(
    function () {
      setTimeout(function () {
        setStatus(false);
      }, 5000);
    },
    [status]
  );
  return React.createElement(
    'div',
    { className: 'flex flex-grow' },
    React.createElement(
      'div',
      {
        className:
          'mx-auto flex w-full flex-grow flex-col transition-all xl:max-w-[1360px] 4xl:max-w-[1760px]',
      },
      React.createElement(
        'div',
        {
          className:
            'relative mb-5 flex flex-grow items-center justify-center md:pb-7 md:pt-4 ltr:md:left-0 ltr:md:pl-6 rtl:md:right-0 rtl:md:pr-6 lg:fixed lg:mb-0 lg:h-[calc(100%-96px)] lg:w-[calc(100%-492px)] ltr:lg:pl-8 rtl:lg:pr-8 xl:w-[calc(100%-550px)] ltr:xl:pr-12 ltr:xl:pl-[340px] rtl:xl:pl-12 rtl:xl:pr-[340px] ltr:2xl:pl-96 rtl:2xl:pr-96 3xl:w-[calc(100%-632px)] ltr:4xl:pl-0 rtl:4xl:pr-0',
        },
        React.createElement(
          'div',
          {
            className:
              'flex h-full max-h-full w-full items-center justify-center lg:max-w-[768px]',
          },
          React.createElement(
            'div',
            {
              className:
                'relative aspect-square max-h-full w-full overflow-hidden rounded-lg',
            },
            React.createElement(image_1['default'], {
              src: img,
              //placeholder="blur"
              layout: 'fill',
              objectFit: 'cover',
              alt: '',
              className: 'h-full bg-gray-200 dark:bg-light-dark',
            })
          )
        )
      ),
      React.createElement(
        'div',
        {
          className:
            'relative mt-10 flex w-full flex-grow flex-col justify-between ltr:md:ml-auto ltr:md:pl-8 rtl:md:mr-auto rtl:md:pr-8 lg:min-h-[calc(100vh-96px)] lg:w-[460px] ltr:lg:pl-12 rtl:lg:pr-12 xl:w-[592px] ltr:xl:pl-20 rtl:xl:pr-20',
        },
        React.createElement(
          'div',
          { className: 'block' },
          React.createElement(
            'div',
            { className: 'block' },
            React.createElement(
              'div',
              { className: 'flex justify-between' },
              React.createElement(
                'h2',
                {
                  className:
                    'text-xl font-medium leading-[1.45em] -tracking-wider text-gray-900 dark:text-white md:text-2xl xl:text-3xl',
                },
                Nombre
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'mt-5 flex flex-col pb-5 xl:mt-9' },
            React.createElement(
              param_tab_1['default'],
              {
                tabMenu: [
                  {
                    title: 'Details',
                    path: 'details',
                  },
                ],
              },
              React.createElement(
                param_tab_1.TabPanel,
                { className: 'focus:outline-none' },
                React.createElement(
                  'div',
                  { className: 'space-y-6' },
                  React.createElement(
                    'div',
                    { className: 'block' },
                    React.createElement(
                      'h3',
                      {
                        className:
                          'text-heading-style mb-2 uppercase text-gray-900 dark:text-white',
                      },
                      'Description'
                    ),
                    React.createElement(
                      'div',
                      {
                        className:
                          'text-sm leading-6 -tracking-wider text-gray-600 dark:text-gray-400',
                      },
                      descripcion
                    )
                  ),
                  React.createElement(
                    'div',
                    { className: 'block' },
                    React.createElement(
                      'h3',
                      {
                        className:
                          'text-heading-style mb-2 uppercase text-gray-900 dark:text-white',
                      },
                      'Owner'
                    ),
                    React.createElement(
                      'div',
                      { className: 'inline-flex' },
                      React.createElement(
                        'span',
                        {
                          className:
                            'rounded-full p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white',
                        },
                        '@PandoraX'
                      ),
                      ' '
                    )
                  ),
                  React.createElement(
                    'div',
                    { className: 'block' },
                    React.createElement(
                      'h3',
                      {
                        className:
                          'text-heading-style mb-2 uppercase text-gray-900 dark:text-white',
                      },
                      'Block Chain'
                    ),
                    React.createElement(
                      'div',
                      { className: 'flex flex-col gap-2' },
                      React.createElement(
                        'div',
                        { className: 'inline-flex' },
                        React.createElement(
                          'span',
                          {
                            className:
                              'rounded-full p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white',
                          },
                          'Polygon'
                        )
                      )
                    )
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'mt-12 justify-evenly space-x-10' },
                  loading &&
                    React.createElement(
                      button_1['default'],
                      null,
                      React.createElement('span', {
                        className: 'spinner-border spinner-border-sm',
                        role: 'status',
                        'aria-hidden': 'true',
                      }),
                      'Loading...'
                    ),
                  type !== 'invcomprado' &&
                    type !== 'pcomprado' &&
                    !loading &&
                    product.precio <= approvedToken &&
                    React.createElement(
                      button_1['default'],
                      {
                        onClick: function () {
                          return buyNft();
                        },
                      },
                      'Buy'
                    ),
                  React.createElement(NftFooter, {
                    className: 'hidden md:block',
                    price: precio,
                    tipo: type,
                    tipoN: tipoN,
                    id: id,
                  })
                )
              )
            )
          )
        )
      )
    )
  );
}
exports['default'] = NftDetails;
