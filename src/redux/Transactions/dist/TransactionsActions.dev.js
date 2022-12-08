'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.transations = void 0;

var transations = function transations(payload) {
  return {
    type: 'TRANSATION',
    payload: payload,
  };
};

exports.transations = transations;
