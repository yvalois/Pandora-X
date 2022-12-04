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
var react_redux_1 = require('react-redux');
var button_1 = require('@/components/ui/button');
var ethers_1 = require('ethers');
var blockchainAction_1 = require('../../redux/Blockchain/blockchainAction');
function ModalWithdraw() {
  var _this = this;
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
  var _f = react_redux_1.useSelector(function (state) {
      return state.blockchain;
    }),
    inversionMinter = _f.inversionMinter,
    staking = _f.staking,
    tokenContract = _f.tokenContract,
    accountAddress = _f.accountAddress;
  var dispatch = react_redux_1.useDispatch();
  var getInfo = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var _id, _val, _valor, lastValor;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _id = window.localStorage.getItem('WithdrawID');
            setId(_id);
            return [4 /*yield*/, inversionMinter.getPricePlusFee(_id)];
          case 1:
            _val = _a.sent();
            _valor = parseFloat(
              ethers_1.ethers.utils.formatUnits(_val, 18)
            ).toFixed(2);
            lastValor = _valor * (10 / 1000);
            setValor(lastValor);
            return [2 /*return*/];
        }
      });
    });
  };
  var verifyApprove = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var usdt, e_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [
              4 /*yield*/,
              tokenContract.allowance(accountAddress, staking.address),
            ];
          case 1:
            usdt = _a.sent();
            //MarketPlace
            //setApprovedUsdt(ethers.utils.formatUnits(usdt, 18));
            setApprovedToken(ethers_1.ethers.utils.formatUnits(usdt, 6));
            return [3 /*break*/, 3];
          case 2:
            e_1 = _a.sent();
            return [3 /*break*/, 3];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  var approve = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var decimals, tx, e_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setLoading(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 5, , 6]);
            decimals = 6;
            return [
              4 /*yield*/,
              tokenContract.approve(
                staking.address,
                ethers_1.ethers.utils.parseUnits(valor.toString(), decimals)
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
            return [3 /*break*/, 6];
          case 5:
            e_2 = _a.sent();
            setLoading(false);
            return [3 /*break*/, 6];
          case 6:
            return [2 /*return*/];
        }
      });
    });
  };
  var withdraw = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var tx;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setLoading(true);
            return [4 /*yield*/, staking.withdraw(id)];
          case 1:
            tx = _a.sent();
            return [4 /*yield*/, tx.wait()];
          case 2:
            _a.sent();
            dispatch(blockchainAction_1.uStaking());
            dispatch(blockchainAction_1.uInvertion());
            setLoading(false);
            closeModal('Withdraw_VIEW');
            setSuccess(true);
            setTimeout(function () {
              setSuccess(false);
              window.localStorage.removeItem('WithdrawID');
            }, 3000);
            return [2 /*return*/];
        }
      });
    });
  };
  var close = function () {
    window.localStorage.removeItem('WithdrawID');
    closeModal('Withdraw_VIEW');
  };
  react_1.useEffect(function () {
    getInfo();
  }, []);
  return react_1['default'].createElement(
    react_1['default'].Fragment,
    null,
    react_1['default'].createElement(
      'div',
      {
        className:
          'relative z-50 mx-auto h-[400px] w-[400px] max-w-full rounded-lg bg-white px-6 py-16 dark:bg-light-dark',
      },
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
      ),
      react_1['default'].createElement(
        'p',
        { className: 'mb-8' },
        'Aun no cumples con la fecha de staking como castigo debes pagar 10% del valor de tu nft para evitar este castigo solo debes esperar a que tu stakeo se cumpla'
      ),
      react_1['default'].createElement(
        'div',
        { className: 'mb-6' },
        react_1['default'].createElement(
          'label',
          {
            className:
              'mb-1 block text-sm font-bold text-gray-700 dark:text-white',
          },
          'Valor'
        ),
        react_1['default'].createElement('input', {
          className:
            'focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none',
          id: 'username',
          type: 'text',
          placeholder: 'Name',
          value: valor,
          disabled: true,
        })
      ),
      !loading &&
        approvedToken < valor &&
        react_1['default'].createElement(
          'div',
          { className: 'row flex w-[100%]  justify-between' },
          react_1['default'].createElement(
            button_1['default'],
            { onClick: approve },
            'Aprobar'
          )
        ),
      !loading &&
        approvedToken >= valor &&
        react_1['default'].createElement(
          'div',
          { className: 'row flex w-[100%]  justify-between' },
          react_1['default'].createElement(
            button_1['default'],
            { onClick: withdraw },
            'Pagar'
          )
        ),
      loading &&
        react_1['default'].createElement(
          'div',
          { className: 'row flex w-[100%]  justify-between' },
          react_1['default'].createElement(
            button_1['default'],
            null,
            'Cargando...'
          )
        )
    ),
    succes &&
      react_1['default'].createElement(
        'div',
        {
          className:
            'absolute top-[430px] right-[50px] mb-4 mt-[0px] w-[300px] justify-center self-center rounded-lg bg-green-200  p-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800',
          role: 'alert',
        },
        react_1['default'].createElement(
          'span',
          { className: 'font-medium' },
          'Transaccion exitosa'
        )
      )
  );
}
exports['default'] = ModalWithdraw;
