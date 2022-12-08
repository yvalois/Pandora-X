'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;
var initialState = {
  Transactions: [],
};

var TransactionsReducer = function TransactionsReducer() {
  var state =
    arguments.length > 0 && arguments[0] !== undefined
      ? arguments[0]
      : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'TRANSATION':
      return {
        Transactions: action.payload.Transactions,
      };

    default:
      return state;
  }
};

var _default = TransactionsReducer;
exports['default'] = _default;
