'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.getMintedNftProducts = void 0;

var _ethers = require('ethers');

var _ProductoMinter = _interopRequireDefault(
  require('../../abi/ProductoMinter.json')
);

var _InversionMinter = _interopRequireDefault(
  require('../../abi/InversionMinter.json')
);

var _blockchainRoutes = require('../blockchainRoutes');

var _constant = require('../../utils/constant');

var _NFTROL = require('@/NFTROL');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

//Buscar
//Buscar
//Buscar
//import {provider} from "../../NFTROL"
var ROUTER = (0, _blockchainRoutes.contract)();
var RPC_URL = ROUTER.RPC_URL;
var PRODUCTOS_MINTER_ADDRESS = ROUTER.productoMinter;
var INVERSION_MINTER_ADDRESS = ROUTER.inversionMinter;
var Productos = [];
var Inversiones = [];

var mintedLoading = function mintedLoading() {
  return {
    type: 'MINTED_LOADING',
  };
};

var mintedLoaded = function mintedLoaded(payload) {
  return {
    type: 'MINTED_LOADED',
    payload: payload,
  };
};

var mintedError = function mintedError(payload) {
  return {
    type: 'MINTED_ERROR',
    payload: payload,
  };
};

var getProductos = function getProductos() {
  var provider, productosMinter;
  return regeneratorRuntime.async(function getProductos$(_context3) {
    while (1) {
      switch ((_context3.prev = _context3.next)) {
        case 0:
          provider = new _ethers.ethers.providers.JsonRpcProvider(RPC_URL); //cambiar provider que se obtiene en NFTRO

          productosMinter = new _ethers.ethers.Contract(
            PRODUCTOS_MINTER_ADDRESS,
            _ProductoMinter['default'],
            provider
          );
          fetch('https://pandoraxapi1.herokuapp.com/api/getProducto', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(function (res) {
              return res.json();
            })
            .then(function (response) {
              response.map(function _callee(item) {
                return regeneratorRuntime.async(function _callee$(_context) {
                  while (1) {
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        Productos[item.tipoN - 1] = item;

                      case 1:
                      case 'end':
                        return _context.stop();
                    }
                  }
                });
              });
              Productos.map(function _callee2(item) {
                var precio, price;
                return regeneratorRuntime.async(function _callee2$(_context2) {
                  while (1) {
                    switch ((_context2.prev = _context2.next)) {
                      case 0:
                        _context2.next = 2;
                        return regeneratorRuntime.awrap(
                          productosMinter.buyPrice(item.tipoN)
                        );

                      case 2:
                        precio = _context2.sent;
                        price = _ethers.ethers.utils.formatUnits(precio, 18);
                        Productos[item.tipoN - 1].precio = parseInt(price);

                      case 5:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                });
              });
            })
            ['catch'](function (error) {
              return console.error('Error:', error);
            });

        case 3:
        case 'end':
          return _context3.stop();
      }
    }
  });
};

var getInversiones = function getInversiones() {
  var provider, inversionesMinter;
  return regeneratorRuntime.async(function getInversiones$(_context6) {
    while (1) {
      switch ((_context6.prev = _context6.next)) {
        case 0:
          provider = new _ethers.ethers.providers.JsonRpcProvider(RPC_URL);
          inversionesMinter = new _ethers.ethers.Contract(
            INVERSION_MINTER_ADDRESS,
            _InversionMinter['default'],
            provider
          );
          fetch('https://pandoraxapi1.herokuapp.com/api/getInversion', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(function (res) {
              return res.json();
            })
            .then(function (response) {
              response.map(function _callee3(item) {
                return regeneratorRuntime.async(function _callee3$(_context4) {
                  while (1) {
                    switch ((_context4.prev = _context4.next)) {
                      case 0:
                        Inversiones[item.tipoN - 1] = item;

                      case 1:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                });
              });
              Inversiones.map(function _callee4(item) {
                var precio, price;
                return regeneratorRuntime.async(function _callee4$(_context5) {
                  while (1) {
                    switch ((_context5.prev = _context5.next)) {
                      case 0:
                        _context5.next = 2;
                        return regeneratorRuntime.awrap(
                          inversionesMinter.buyPrice(item.tipoN)
                        );

                      case 2:
                        precio = _context5.sent;
                        price = _ethers.ethers.utils.formatUnits(precio, 18);
                        Inversiones[item.tipoN - 1].precio = parseInt(price);

                      case 5:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                });
              });
            })
            ['catch'](function (error) {
              return console.error('Error:', error);
            });

        case 3:
        case 'end':
          return _context6.stop();
      }
    }
  });
};

var getMintedNftProducts = function getMintedNftProducts() {
  return function _callee5(dispatch) {
    return regeneratorRuntime.async(
      function _callee5$(_context7) {
        while (1) {
          switch ((_context7.prev = _context7.next)) {
            case 0:
              dispatch(mintedLoading());
              _context7.prev = 1;
              _context7.next = 4;
              return regeneratorRuntime.awrap(getProductos());

            case 4:
              _context7.next = 6;
              return regeneratorRuntime.awrap(getInversiones());

            case 6:
              _context7.next = 8;
              return regeneratorRuntime.awrap(
                dispatch(
                  mintedLoaded({
                    productos: Productos,
                    inversiones: Inversiones,
                  })
                )
              );

            case 8:
              _context7.next = 13;
              break;

            case 10:
              _context7.prev = 10;
              _context7.t0 = _context7['catch'](1);
              dispatch(mintedError(_context7.t0.message));

            case 13:
            case 'end':
              return _context7.stop();
          }
        }
      },
      null,
      null,
      [[1, 10]]
    );
  };
};

exports.getMintedNftProducts = getMintedNftProducts;
