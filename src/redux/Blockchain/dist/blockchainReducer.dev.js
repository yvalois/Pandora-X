'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var initialState = {
  loading: false,
  dataloaded: false,
  error: null,
  errorMsg: null,
  usdtContract: null,
  tokenContract: null,
  //busdContract: null,
  //usdcContract: null,
  //daiContract: null,
  productoMinter: null,
  inversionMinter: null,
  staking: null,
  accountAddress: '',
  //usdtBalance: null,
  //busdBalance: null,
  //usdcBalance: null,
  //daiBalance: null,
  inventoryp: [],
  inventoryi: [],
  inventorys: [],
  isConnect: false,
  rol: '',
  nombre: '',
  instance: null,
  isUser: null,
  paid: [],
  balancep: 0,
};

var blockchainReducer = function blockchainReducer() {
  var state =
    arguments.length > 0 && arguments[0] !== undefined
      ? arguments[0]
      : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'LOADING':
      return _objectSpread({}, state, {
        loading: true,
      });

    case 'DATA_LOADED':
      return _objectSpread({}, state, {
        loading: false,
        dataloaded: true,
        usdtContract: action.payload.usdtContract,
        tokenContract: action.payload.tokenContract,
        //busdContract: action.payload.busdContract,
        //usdcContract: action.payload.usdcContract,
        //daiContract: action.payload.daiContract,
        productoMinter: action.payload.productoMinter,
        inversionMinter: action.payload.inversionMinter,
        staking: action.payload.staking,
        accountAddress: action.payload.accountAddress,
        //usdtBalance: action.payload.usdtBalance,
        //tokenBalance: action.payload.usdtBalance,
        //busdBalance: action.payload.busdBalance,
        //usdcBalance: action.payload.usdcBalance,
        //daiBalance: action.payload.daiBalance,
        inventoryp: action.payload.inventoryp,
        inventoryi: action.payload.inventoryi,
        inventorys: action.payload.inventorys,
        isConnect: true,
        isUser: true,
        balancep: action.payload.balancep,
      });

    case 'ERROR':
      return _objectSpread({}, state, {
        loading: false,
        error: true,
        errorMsg: action.payload,
      });

    case 'UPDATE_BALANCE':
      return _objectSpread({}, state, {
        loading: false,
        error: false,
        errorMsg: null,
        //usdtBalance: action.payload.usdtBalance,
        //tokenBalance: action.payload.tokenBalance,
        //busdBalance: action.payload.busdBalance,
        //usdcBalance: action.payload.usdcBalance,
        //daiBalance: action.payload.daiBalance,
        inventoryp: action.payload.inventoryp,
        inventoryi: action.payload.inventoryi,
        inventorys: action.payload.inventorys,
      });

    case 'LOGOUT':
      return {
        initialState: initialState,
      };

    case 'DISCONECT_WALLET':
      return initialState;

    case 'CONNECT_TO_MONGO':
      return _objectSpread({}, state, {
        loading: false,
        rol: action.payload.rol,
        nombre: action.payload.nombre,
      });

    case 'REGISTER':
      return _objectSpread({}, state, {
        isUser: false,
      });

    case 'ADD_PAID':
      return _objectSpread({}, state, {
        paid: action.payload.pagos,
      });

    case 'UPDATE_PRODUCT':
      return _objectSpread({}, state, {
        inventoryp: action.payload.inventoryp,
      });

    case 'UPDATE_INVERTION':
      return _objectSpread({}, state, {
        inventoryi: action.payload.inventoryi,
      });

    case 'UPDATE_STAKING':
      return _objectSpread({}, state, {
        inventorys: action.payload.inventorys,
      });

    default:
      return state;
  }
};

var _default = blockchainReducer;
exports['default'] = _default;
