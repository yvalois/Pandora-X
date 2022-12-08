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
var react_1 = require('react');
var context_1 = require('@/components/modal-views/context');
var anchor_link_1 = require('../ui/links/anchor-link');
var button_1 = require('../ui/button');
var react_redux_1 = require('react-redux');
var validator_1 = require('validator');
var blockchainAction_1 = require('../../redux/Blockchain/blockchainAction');
function ModalTP() {
  var _this = this;
  var closeModal = context_1.useModal().closeModal;
  var _a = react_1.useState(0),
    valor = _a[0],
    setValor = _a[1];
  var _b = react_1.useState(false),
    loading = _b[0],
    setLoading = _b[1];
  var _c = react_1.useState(false),
    approvedToken = _c[0],
    setApprovedToken = _c[1];
  var _d = react_1.useState(0),
    id = _d[0],
    setId = _d[1];
  var _e = react_1.useState(false),
    succes = _e[0],
    setSuccess = _e[1];
  var _f = react_1.useState(''),
    value = _f[0],
    setValue = _f[1];
  var _g = react_1.useState(''),
    error = _g[0],
    setError = _g[1];
  var _h = react_1.useState(false),
    status = _h[0],
    setStatus = _h[1];
  var _j = react_redux_1.useSelector(function (state) {
      return state.blockchain;
    }),
    inversionMinter = _j.inversionMinter,
    accountAddress = _j.accountAddress;
  var dispatch = react_redux_1.useDispatch();
  var close = function () {
    closeModal('TRANSFER_I');
    window.localStorage.removeItem('TransferIId');
  };
  var verifyApprove = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var isap;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, inversionMinter.getApproved(id)];
          case 1:
            isap = _a.sent();
            //setApprovedUsdt(ethers.utils.formatUnits(usdt, 18));
            if (isap == value) {
              setApprovedToken(true);
            }
            return [2 /*return*/];
        }
      });
    });
  };
  var Approve = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var tx;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!validator_1['default'].isEthereumAddress(value))
              return [3 /*break*/, 4];
            setLoading(true);
            setError('');
            return [4 /*yield*/, inversionMinter.approve(value, id)];
          case 1:
            tx = _a.sent();
            return [4 /*yield*/, tx.wait()];
          case 2:
            _a.sent();
            return [4 /*yield*/, verifyApprove()];
          case 3:
            _a.sent();
            setLoading(false);
            return [3 /*break*/, 5];
          case 4:
            setError('Wallet incorrecta');
            _a.label = 5;
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  var transfer = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var tx;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setLoading(true);
            return [
              4 /*yield*/,
              inversionMinter.transferFrom(accountAddress, value, id),
            ];
          case 1:
            tx = _a.sent();
            return [4 /*yield*/, tx.wait()];
          case 2:
            _a.sent();
            dispatch(blockchainAction_1.uInvertion());
            window.localStorage.removeItem('TransferIId');
            setLoading(false);
            setStatus(true);
            setTimeout(function () {
              close();
            }, 3000);
            return [2 /*return*/];
        }
      });
    });
  };
  react_1.useEffect(function () {
    var _id = window.localStorage.getItem('TransferIId');
    setId(_id);
  }, []);
  react_1.useEffect(
    function () {
      setTimeout(function () {
        setStatus(false);
      }, 5000);
    },
    [status]
  );
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
        'div',
        { className: 'mb-6 mt-2' },
        react_1['default'].createElement(
          'p',
          { className: 'mb-8' },
          'Producto Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit ipsum consectetur nisi et! Illo, sequi?'
        ),
        react_1['default'].createElement(
          'label',
          {
            className:
              'mb-1 block text-sm font-bold text-gray-700 dark:text-white',
          },
          'Id'
        ),
        react_1['default'].createElement('input', {
          className:
            'focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none',
          id: 'username',
          type: 'text',
          placeholder: 'Name',
          value: id,
          disabled: true,
        })
      ),
      react_1['default'].createElement(
        'div',
        { className: 'mb-6 mt-2' },
        react_1['default'].createElement(
          'label',
          {
            className:
              'mb-1 block text-sm font-bold text-gray-700 dark:text-white',
          },
          'To'
        ),
        error.length == 0
          ? react_1['default'].createElement('input', {
              className:
                'focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none',
              id: 'username',
              type: 'text',
              placeholder: '0x',
              value: value,
              onChange: function (e) {
                setValue(e.target.value);
              },
            })
          : react_1['default'].createElement('input', {
              className:
                'focus:shadow-outline w-full appearance-none rounded border border-red-500 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none',
              id: 'username',
              type: 'text',
              placeholder: '0x',
              value: value,
              onChange: function (e) {
                setValue(e.target.value);
              },
            }),
        react_1['default'].createElement(
          'label',
          { className: 'text-red-500 text-sm' },
          error
        )
      ),
      react_1['default'].createElement(
        'div',
        null,
        loading &&
          react_1['default'].createElement(
            button_1['default'],
            { size: 'small' },
            react_1['default'].createElement(
              'span',
              {
                className:
                  'blockbg-transparent text-sm text-white outline-none focus:outline-none',
              },
              'Cargando...'
            )
          )
      ),
      react_1['default'].createElement(
        'div',
        { className: 'flex w-full justify-evenly' },
        !loading &&
          approvedToken &&
          react_1['default'].createElement(
            button_1['default'],
            { onClick: transfer, size: 'small' },
            react_1['default'].createElement(
              'span',
              {
                className:
                  'blockbg-transparent text-sm text-white outline-none focus:outline-none',
              },
              'Transfer'
            )
          ),
        !loading &&
          !approvedToken &&
          react_1['default'].createElement(
            button_1['default'],
            { onClick: Approve, size: 'small' },
            react_1['default'].createElement(
              'span',
              {
                className:
                  'blockbg-transparent text-sm text-white outline-none focus:outline-none',
              },
              'Approve'
            )
          ),
        react_1['default'].createElement(
          anchor_link_1['default'],
          { href: '/' },
          !loading &&
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
    ),
    status == true &&
      react_1['default'].createElement(
        'div',
        {
          className:
            'mb-4 ml-[20px] mt-[30px] flex w-[400px] justify-center self-center rounded-lg bg-green-200 p-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800',
          role: 'alert',
        },
        react_1['default'].createElement(
          'span',
          { className: 'font-medium' },
          'la transferencia se ejecuto correctamente'
        )
      )
  );
}
exports['default'] = ModalTP;
