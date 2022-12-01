'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.updateAccount =
  exports.connect =
  exports.updateAccountRequest =
  exports.connectFailed =
  exports.disconectWallet =
  exports.connectSuccessToMongo =
  exports.connectSuccess =
  exports.connectRequest =
    void 0;

var _ethers = require('ethers');

// log
var connectRequest = function connectRequest() {
  return {
    type: 'CONNECTION_REQUEST',
  };
};

exports.connectRequest = connectRequest;

var connectSuccess = function connectSuccess(payload) {
  return {
    type: 'CONNECTION_SUCCESS',
    payload: payload,
  };
};

exports.connectSuccess = connectSuccess;

var connectSuccessToMongo = function connectSuccessToMongo(payload) {
  return {
    type: 'CONNECT_TO_MONGO',
    payload: payload,
  };
};

exports.connectSuccessToMongo = connectSuccessToMongo;

var disconectWallet = function disconectWallet() {
  return {
    type: 'DISCONECT_WALLET',
  };
};

exports.disconectWallet = disconectWallet;

var connectFailed = function connectFailed(payload) {
  return {
    type: 'CONNECTION_FAILED',
    payload: payload,
  };
};

exports.connectFailed = connectFailed;

var updateAccountRequest = function updateAccountRequest(payload) {
  return {
    type: 'UPDATE_ACCOUNT',
    payload: payload,
  };
};

exports.updateAccountRequest = updateAccountRequest;

var connectToWallet = function connectToWallet() {
  var connection, provider;
  return regeneratorRuntime.async(
    function connectToWallet$(_context) {
      while (1) {
        switch ((_context.prev = _context.next)) {
          case 0:
            _context.prev = 0;
            _context.t0 = web3Modal;

            if (!_context.t0) {
              _context.next = 6;
              break;
            }

            _context.next = 5;
            return regeneratorRuntime.awrap(web3Modal.connect());

          case 5:
            _context.t0 = _context.sent;

          case 6:
            connection = _context.t0;
            provider = new _ethers.ethers.providers.Web3Provider(connection);
            _context.next = 10;
            return regeneratorRuntime.awrap(subscribeProvider(connection));

          case 10:
            setProvider(provider);
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t1 = _context['catch'](0);
            console.log(
              _context.t1,
              'got this error on connectToWallet catch block while connecting the wallet'
            );

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    },
    null,
    null,
    [[0, 13]]
  );
};

var connect = function connect() {
  return function _callee(dispatch) {
    var accounts;
    return regeneratorRuntime.async(
      function _callee$(_context2) {
        while (1) {
          switch ((_context2.prev = _context2.next)) {
            case 0:
              dispatch(connectRequest());
              _context2.prev = 1;

              if (!(1 == 1)) {
                _context2.next = 9;
                break;
              }

              _context2.next = 5;
              return regeneratorRuntime.awrap(connectToWallet());

            case 5:
              _context2.next = 7;
              return regeneratorRuntime.awrap(
                window.ethereum.request({
                  method: 'eth_requestAccounts',
                })
              );

            case 7:
              accounts = _context2.sent;
              //dispatch(connectToMongo(accounts[0]));
              dispatch(
                connectSuccess({
                  account: '0x',
                  web3: web3Modal,
                })
              );

            case 9:
              _context2.next = 14;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2['catch'](1);
              dispatch(connectFailed(_context2.t0));

            case 14:
            case 'end':
              return _context2.stop();
          }
        }
      },
      null,
      null,
      [[1, 11]]
    );
  };
};

exports.connect = connect;

var updateAccount = function updateAccount(account) {
  return function _callee2(dispatch) {
    return regeneratorRuntime.async(function _callee2$(_context3) {
      while (1) {
        switch ((_context3.prev = _context3.next)) {
          case 0:
            dispatch(
              updateAccountRequest({
                account: account,
              })
            );
            dispatch(fetchData(account));

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    });
  };
};

exports.updateAccount = updateAccount;
