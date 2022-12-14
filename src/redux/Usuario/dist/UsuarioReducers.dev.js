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
  account: '',
  errorMsg: '',
  rol: '',
  nombre: '',
  isConnect: false,
  isReferido: false,
  referidor: '',
  range: '',
  type: '',
  categoria: '',
  rango: '',
  paid: [],
  perfil: '',
  banner: '',
  descripcion: '',
};

var UsuariosReducer = function UsuariosReducer() {
  var state =
    arguments.length > 0 && arguments[0] !== undefined
      ? arguments[0]
      : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'CONNECTION_REQUEST':
      return _objectSpread({}, state, {
        loading: true,
      });

    case 'CONNECTION_SUCCESS':
      return _objectSpread({}, state, {
        loading: false,
        account: action.payload.account,
        //smartContract: action.payload.smartContract,
        //web3: action.payload.web3,
        //rol: action.payload.rol,
        //nombre: action.payload.nombre,
        isConnect: true,
      });

    case 'CONNECTION_FAILED':
      return _objectSpread({}, state, {
        loading: false,
        errorMsg: action.payload,
      });

    case 'UPDATE_ACCOUNT':
      return _objectSpread({}, state, {
        account: action.payload.account,
        rol: action.payload.rol,
        nombre: action.payload.nombre,
      });

    case 'DISCONECT_WALLET':
      return initialState;

    case 'CONNECT_TO_MONGO':
      return _objectSpread({}, state, {
        loading: false,
        rol: action.payload.rol,
        nombre: action.payload.nombre,
        isreferido: action.payload.isreferido,
        referidor: action.payload.referidor,
        range: action.payload.range,
        type: action.payload.type,
        categoria: action.payload.categoria,
        rango: action.payload.rango,
        paid: action.payload.paid,
        perfil: action.payload.perfil,
        banner: action.payload.banner,
        descripcion: action.payload.descripcion,
      });

    case 'UPDATE_MONGO':
      return _objectSpread({}, state, {
        loading: false,
        nombre: action.payload.nombre,
        perfil: action.payload.perfil,
        banner: action.payload.banner,
        descripcion: action.payload.descripcion,
      });

    default:
      return state;
  }
};

var _default = UsuariosReducer;
exports['default'] = _default;
