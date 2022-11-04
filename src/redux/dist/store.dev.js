'use strict';
import thunk from 'redux-thunk';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _redux = require('redux');

var _reduxThunk = _interopRequireDefault(require(thunk));

var _UsuarioReducers = _interopRequireDefault(
  require('./Usuario/UsuarioReducers')
);

var _blockchainReducer = _interopRequireDefault(
  require('./Blockchain/blockchainReducer')
);

var _MintedReducer = _interopRequireDefault(require('./Minted/MintedReducer'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var rootReducer = (0, _redux.combineReducers)({
  Usuario: _UsuarioReducers['default'],
  blockchain: _blockchainReducer['default'],
  minted: _MintedReducer['default'],
});
var middleware = [_reduxThunk['default']];
var composeEnhancers = (0, _redux.compose)(
  _redux.applyMiddleware.apply(void 0, middleware)
);

var configureStore = function configureStore() {
  return (0, _redux.createStore)(rootReducer, composeEnhancers);
};

var store = configureStore();
var _default = store;
exports['default'] = _default;
