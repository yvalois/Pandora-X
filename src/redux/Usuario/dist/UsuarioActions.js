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
exports.updateAccount = exports.connectToMongo = exports.connect = void 0;
// constants
var web3modal_1 = require('web3modal');
var web3_provider_1 = require('@walletconnect/web3-provider');
var NFTROL_1 = require('../../NFTROL');
var ethers_1 = require('ethers');
// log
var connectRequest = function () {
  return {
    type: 'CONNECTION_REQUEST',
  };
};
var connectSuccess = function (payload) {
  return {
    type: 'CONNECTION_SUCCESS',
    payload: payload,
  };
};
var connectFailed = function (payload) {
  return {
    type: 'CONNECTION_FAILED',
    payload: payload,
  };
};
var updateAccountRequest = function (payload) {
  return {
    type: 'UPDATE_ACCOUNT',
    payload: payload,
  };
};
var connectToWallet = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var connection, _a, provider, error_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 3, , 4]);
          checkIfExtensionIsAvailable();
          _a = web3Modal;
          if (!_a) return [3 /*break*/, 2];
          return [4 /*yield*/, web3Modal.connect()];
        case 1:
          _a = _b.sent();
          _b.label = 2;
        case 2:
          connection = _a;
          provider = new ethers_1.ethers.providers.Web3Provider(connection);
          NFTROL_1.setProvider(provider);
          return [3 /*break*/, 4];
        case 3:
          error_1 = _b.sent();
          console.log(
            error_1,
            'got this error on connectToWallet catch block while connecting the wallet'
          );
          return [3 /*break*/, 4];
        case 4:
          return [2 /*return*/];
      }
    });
  });
};
var providerOptions = {
  walletconnect: {
    package: web3_provider_1['default'],
    options: {
      chainId: 31337,
    },
  },
};
var web3Modal2 =
  typeof window !== 'undefined' &&
  new web3modal_1['default']({
    cacheProvider: true,
    providerOptions: providerOptions,
  });
exports.connect = function (dispatch) {
  return function (dispatch) {
    return __awaiter(void 0, void 0, void 0, function () {
      var err_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            dispatch(connectRequest());
            if (!(window && window.ethereum)) return [3 /*break*/, 6];
            _a.label = 1;
          case 1:
            _a.trys.push([1, 4, , 5]);
            if (!localStorage.getItem(web3modalStorageKey))
              return [3 /*break*/, 3];
            return [4 /*yield*/, connectToWallet()];
          case 2:
            _a.sent();
            dispatch(exports.connectToMongo(accounts[0]));
            dispatch(
              connectSuccess({
                account: accounts[0],
                smartContract: SmartContractObj,
                web3: web3Modal2,
              })
            );
            window.ethereum.on('accountsChanged', function (accounts) {
              dispatch(exports.updateAccount(accounts[0]));
            });
            window.ethereum.on('chainChanged', function () {
              window.location.reload();
            });
            _a.label = 3;
          case 3:
            // Add listeners start
            window.ethereum.on('accountsChanged', function (accounts) {
              dispatch(exports.updateAccount(accounts[0]));
            });
            window.ethereum.on('chainChanged', function () {
              window.location.reload();
            });
            // Add listeners end
            exports.connectToMongo(accounts[0]);
            return [3 /*break*/, 5];
          case 4:
            err_1 = _a.sent();
            dispatch(connectFailed(err_1));
            return [3 /*break*/, 5];
          case 5:
            return [3 /*break*/, 7];
          case 6:
            dispatch(connectFailed('Install Metamask.'));
            _a.label = 7;
          case 7:
            return [2 /*return*/];
        }
      });
    });
  };
};
exports.connectToMongo = function (wallet) {
  fetch('https://localhost:8000/api/login/' + wallet, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (response) {
      dispatch(
        connectSuccess({
          rol: response.ROl,
          nombre: response.Nombre,
          isConnect: false,
        })
      );
    });
};
exports.updateAccount = function (account) {
  return function (dispatch) {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        dispatch(updateAccountRequest({ account: account }));
        dispatch(fetchData(account));
        return [2 /*return*/];
      });
    });
  };
};
