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
//import { setProvider } from '../../NFTROL';
var web3_provider_1 = require('@walletconnect/web3-provider');
var react_redux_1 = require('react-redux');
var blockchainAction_1 = require('../../redux/Blockchain/blockchainAction');
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
  //const Usuario = useSelector((state: any) => state.Usuario);
  var providerOptions = {
    walletconnect: {
      package: web3_provider_1['default'],
      options: {
        rpc: {
          5: 'https://eth-goerli.g.alchemy.com/v2/__HJ4LpJdyM1YHBkGqQf9-SRJ1ZVjP0s',
        },
      },
    },
  };
  var web3Modal =
    typeof window !== 'undefined' &&
    new web3modal_1['default']({
      disableInjectedProvider: false,
      cacheProvider: false,
      providerOptions: providerOptions,
    });
  //agregar provider options
  var _h = react_redux_1.useSelector(function (state) {
      return state.blockchain;
    }),
    accountAddress = _h.accountAddress,
    isUSer = _h.isUSer;
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
  /*const setWalletAddress = async (provider: any) => {
      try {
        const signer = provider.getSigner();
        if (signer) {
          const web3Address = await signer.getAddress();
          setAddress(web3Address);
          console.log(address);
          await conectar(web3Address);
  
          getBalance(provider, web3Address);
        }
      } catch (error) {
        console.log(
          'Account not connected; logged from setWalletAddress function'
        );
      }
    };*/
  //wallet address saldra
  /*const conectar = async () => {
      fetch(`https://pandoraxapi1.herokuapp.com/api/login/${accountAddress}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((response) => {
          if (response !== null) {
            console.log(response);
            connectToMongo(response.Rol, response.Nombre);
          } else {
            connectToMongo('usuario', 'usuario');
          }
        });
    };*/
  /*const disconect = () => {
      dispatch(disconectWallet());
    };*/
  /*const connectBLockchain = (p) => {
      dispatch(connectBLockchain(p));
      console.log('e');
    };*/
  /*const connect = (cuenta: string) => {
      dispatch(
        connectSuccess({
          account: cuenta,
          //web3: web3Modal,
        })
      );
  
      Usuario.account;
    };*/
  /* const connectToMongo = (_rol: string, _nombre: string) => {
      dispatch(
        connectSuccessToMongo({
          rol: _rol,
          nombre: _nombre,
        })
      );
    };*/
  /*const getBalance = async (provider: any, walletAddress: string) => {
      const walletBalance = await provider.getBalance(walletAddress);
      const balanceInEth = ethers.utils.formatEther(walletBalance);
      setBalance(balanceInEth);
    };*/
  var disconnectWallet = function () {
    //setAddress('');
    web3Modal && web3Modal.clearCachedProvider();
    dispatch(blockchainAction_1.disconectWallet());
    setAddress('');
    //disconect();
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
      var error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            setLoading(true);
            checkIfExtensionIsAvailable();
            return [4 /*yield*/, dispatch(blockchainAction_1.connectWallet())];
          case 1:
            _a.sent();
            setLoading(false);
            setAddress(accountAddress);
            return [3 /*break*/, 3];
          case 2:
            error_2 = _a.sent();
            setLoading(false);
            console.log(
              error_2,
              'got this error on connectToWallet catch block while connecting the wallet'
            );
            return [3 /*break*/, 3];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  /*const subscribeProvider = async (connection: any) => {
      connection.on('close', () => {
        disconnectWallet();
      });
      connection.on('accountsChanged', async (accounts: string[]) => {
        if (accounts?.length) {
          setAddress(accounts[0]);
          const provider = new ethers.providers.Web3Provider(connection);
          getBalance(provider, accounts[0]);
          connect(accounts[0]);
        } else {
          disconnectWallet();
        }
      });
    };*/
  return React.createElement(
    exports.WalletContext.Provider,
    {
      value: {
        balance: balance,
        loading: loading,
        error: error,
        connectToWallet: connectToWallet,
        disconnectWallet: disconnectWallet,
        isUSer: isUSer,
      },
    },
    children
  );
};
exports.WalletContext.displayName = 'use-connect';
