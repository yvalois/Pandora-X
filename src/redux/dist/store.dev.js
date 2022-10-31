'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _redux = require('redux');

var _reduxThunk = _interopRequireDefault(require('redux-thunk'));

var _UsuarioReducers = _interopRequireDefault(
  require('./Usuario/UsuarioReducers')
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var rootReducer = (0, _redux.combineReducers)({
  Usuario: _UsuarioReducers['default'],
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
