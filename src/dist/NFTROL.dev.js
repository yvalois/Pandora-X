"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setProvider = setProvider;
exports.getRange = exports.getType = exports.mint = exports.NFTROL = void 0;

var _NftsRol = _interopRequireDefault(require("./NftsRol.json"));

var _ethers = require("ethers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NFTROL = new _ethers.ethers.Contract("0xb029ac7caf182421dbb72ac6645fbbb499020bfc", _NftsRol["default"].abi);
exports.NFTROL = NFTROL;
var provider;

function setProvider(_provider) {
  provider = _provider;
}

var mint = function mint(address, type, range) {
  var tx, signer, NFTROLPROVIDER, txReceipt;
  return regeneratorRuntime.async(function mint$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          signer = provider.getSigner();
          NFTROLPROVIDER = NFTROL.connect(signer);
          _context.next = 4;
          return regeneratorRuntime.awrap(NFTROLPROVIDER.mint(address, type, range));

        case 4:
          tx = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(provider.waitForTransaction(tx.hash, 3));

        case 7:
          txReceipt = _context.sent;
          return _context.abrupt("return", {
            status: txReceipt.status,
            txHash: tx.hash
          });

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.mint = mint;

var getType = function getType(address) {
  var signer, NFTROLPROVIDER, Type;
  return regeneratorRuntime.async(function getType$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          signer = provider.getSigner();
          NFTROLPROVIDER = NFTROL.connect(signer);
          _context2.next = 4;
          return regeneratorRuntime.awrap(NFTROLPROVIDER.getType(address));

        case 4:
          Type = _context2.sent;
          return _context2.abrupt("return", Type);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getType = getType;

var getRange = function getRange(address) {
  var signer, NFTROLPROVIDER, Range;
  return regeneratorRuntime.async(function getRange$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          signer = provider.getSigner();
          NFTROLPROVIDER = NFTROL.connect(signer);
          _context3.next = 4;
          return regeneratorRuntime.awrap(NFTROLPROVIDER.getRange(address));

        case 4:
          Range = _context3.sent;
          return _context3.abrupt("return", Range);

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.getRange = getRange;