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
exports.WalletProvider = exports.WalletContext = void 0;
var react_1 = require('react');
var web3modal_1 = require('web3modal');
var ethers_1 = require('ethers');
var NFTROL_1 = require('../../NFTROL');
var web3_provider_1 = require('@walletconnect/web3-provider');
var react_redux_1 = require('react-redux');
var UsuarioActions_1 = require('../../redux/Usuario/UsuarioActions');
var web3modalStorageKey = 'WEB3_CONNECT_CACHED_PROVIDER';
exports.WalletContext = react_1.createContext({});
exports.WalletProvider = function (_a) {
  var children = _a.children;
  var _b = react_1.useState(''),
    address = _b[0],
    setAddress = _b[1];
  var _c = react_1.useState(''),
    balance = _c[0],
    setBalance = _c[1];
  var _d = react_1.useState(false),
    loading = _d[0],
    setLoading = _d[1];
  var _e = react_1.useState(false),
    error = _e[0],
    setError = _e[1];
  var _f = react_1.useState(''),
    rol = _f[0],
    setRol = _f[1];
  var _g = react_1.useState(''),
    nombre = _g[0],
    setNombre = _g[1];
  var dispatch = react_redux_1.useDispatch();
  var Usuario = react_redux_1.useSelector(function (state) {
    return state.Usuario;
  });
  var providerOptions = {
    walletconnect: {
      package: web3_provider_1['default'],
      options: {
        chainId: 31337,
      },
    },
  };
  var web3Modal =
    typeof window !== 'undefined' &&
    new web3modal_1['default']({
      cacheProvider: true,
      providerOptions: providerOptions,
    }); //agregar provider options
  /* This effect will fetch wallet address if user has already connected his/her wallet */
  react_1.useEffect(function () {
    function checkConnection() {
      return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 5, , 6]);
              if (!(window && window.ethereum)) return [3 /*break*/, 3];
              if (!localStorage.getItem(web3modalStorageKey))
                return [3 /*break*/, 2];
              return [4 /*yield*/, connectToWallet()];
            case 1:
              _a.sent();
              _a.label = 2;
            case 2:
              return [3 /*break*/, 4];
            case 3:
              console.log('window or window.ethereum is not available');
              _a.label = 4;
            case 4:
              return [3 /*break*/, 6];
            case 5:
              error_1 = _a.sent();
              console.log(error_1, 'Catch error Account is not connected');
              return [3 /*break*/, 6];
            case 6:
              return [2 /*return*/];
          }
        });
      });
    }
    checkConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var setWalletAddress = function (provider) {
    return __awaiter(void 0, void 0, void 0, function () {
      var signer, web3Address, error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 4, , 5]);
            signer = provider.getSigner();
            if (!signer) return [3 /*break*/, 3];
            return [4 /*yield*/, signer.getAddress()];
          case 1:
            web3Address = _a.sent();
            setAddress(web3Address);
            console.log(address);
            return [4 /*yield*/, conectar(web3Address)];
          case 2:
            _a.sent();
            getBalance(provider, web3Address);
            _a.label = 3;
          case 3:
            return [3 /*break*/, 5];
          case 4:
            error_2 = _a.sent();
            console.log(
              'Account not connected; logged from setWalletAddress function'
            );
            return [3 /*break*/, 5];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  var conectar = function (_address) {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        fetch('https://pandoraxapi1.herokuapp.com/api/login/' + _address, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (response) {
            if (response !== null) {
              console.log(response);
              connectToMongo(response.Rol, response.Nombre);
            } else {
              connectToMongo('usuario', 'usuario');
            }
          });
        return [2 /*return*/];
      });
    });
  };
  var disconect = function () {
    dispatch(UsuarioActions_1.disconectWallet());
  };
  var connect = function (cuenta) {
    dispatch(
      UsuarioActions_1.connectSuccess({
        account: cuenta,
      })
    );
    Usuario.account;
  };
  var connectToMongo = function (_rol, _nombre) {
    dispatch(
      UsuarioActions_1.connectSuccessToMongo({
        rol: _rol,
        nombre: _nombre,
      })
    );
  };
  var getBalance = function (provider, walletAddress) {
    return __awaiter(void 0, void 0, void 0, function () {
      var walletBalance, balanceInEth;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, provider.getBalance(walletAddress)];
          case 1:
            walletBalance = _a.sent();
            balanceInEth = ethers_1.ethers.utils.formatEther(walletBalance);
            setBalance(balanceInEth);
            return [2 /*return*/];
        }
      });
    });
  };
  var disconnectWallet = function () {
    setAddress('');
    web3Modal && web3Modal.clearCachedProvider();
    disconect();
  };
  var request = function () {
    dispatch(UsuarioActions_1.connectRequest());
  };
  var checkIfExtensionIsAvailable = function () {
    if (
      (window && window.web3 === undefined) ||
      (window && window.ethereum === undefined)
    ) {
      setError(true);
      web3Modal && web3Modal.toggleModal();
    }
  };
  // seteamos el provider
  var connectToWallet = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var connection, _a, provider, error_3;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            request();
            _b.label = 1;
          case 1:
            _b.trys.push([1, 5, , 6]);
            setLoading(true);
            checkIfExtensionIsAvailable();
            _a = web3Modal;
            if (!_a) return [3 /*break*/, 3];
            return [4 /*yield*/, web3Modal.connect()];
          case 2:
            _a = _b.sent();
            _b.label = 3;
          case 3:
            connection = _a;
            provider = new ethers_1.ethers.providers.Web3Provider(connection);
            return [4 /*yield*/, subscribeProvider(connection)];
          case 4:
            _b.sent();
            NFTROL_1.setProvider(provider);
            setWalletAddress(provider);
            setLoading(false);
            connect(address);
            return [3 /*break*/, 6];
          case 5:
            error_3 = _b.sent();
            setLoading(false);
            console.log(
              error_3,
              'got this error on connectToWallet catch block while connecting the wallet'
            );
            return [3 /*break*/, 6];
          case 6:
            return [2 /*return*/];
        }
      });
    });
  };
  var subscribeProvider = function (connection) {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        connection.on('close', function () {
          disconnectWallet();
        });
        connection.on('accountsChanged', function (accounts) {
          return __awaiter(void 0, void 0, void 0, function () {
            var provider;
            return __generator(this, function (_a) {
              if (
                accounts === null || accounts === void 0
                  ? void 0
                  : accounts.length
              ) {
                setAddress(accounts[0]);
                provider = new ethers_1.ethers.providers.Web3Provider(
                  connection
                );
                getBalance(provider, accounts[0]);
                connect(accounts[0]);
              } else {
                disconnectWallet();
              }
              return [2 /*return*/];
            });
          });
        });
        return [2 /*return*/];
      });
    });
  };
  return React.createElement(
    exports.WalletContext.Provider,
    {
      value: {
        address: address,
        balance: balance,
        loading: loading,
        error: error,
        connectToWallet: connectToWallet,
        disconnectWallet: disconnectWallet,
      },
    },
    children
  );
};
exports.WalletContext.displayName = 'use-connect';
