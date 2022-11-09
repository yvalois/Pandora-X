'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.MintInversion =
  exports.MintProducts =
  exports.getMintedNftProducts =
    void 0;

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

var Productos = [];
var Inversiones = [];
/*export const CrearProducto = async(objeto)=>{
    fetch(`https://pandoraxapi1.herokuapp.com/api}/api/CrearNftProducto`, {
      method: 'POST',
      body: JSON.stringify(objeto),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(() => {
        alert('listo Producto');
        console.log(value);
      })
      .catch((error) => console.error('Error:', error));
  } 

export const CrearInversion = async(objeto)=>{
    fetch(`https://pandoraxapi1.herokuapp.com/api}/api/CrearNftInversion`, {
      method: 'POST',
      body: JSON.stringify(objeto),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(() => {
        alert('listo Producto');
        console.log(value);
      })
      .catch((error) => console.error('Error:', error));
  } 

  const getProductos = async()=>{
    fetch(`https://pandoraxapi1.herokuapp.com/api}/api/getProducto`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((response) => {
        Productos = response
      })
      .catch((error) => console.error('Error:', error));
  }*/

var getProductos = function getProductos() {
  return regeneratorRuntime.async(function getProductos$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          fetch('https://pandoraxapi1.herokuapp.com/api}/getProducto', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              Productos = data;
            });

        case 1:
        case 'end':
          return _context.stop();
      }
    }
  });
};

var getInversiones = function getInversiones() {
  return regeneratorRuntime.async(function getInversiones$(_context2) {
    while (1) {
      switch ((_context2.prev = _context2.next)) {
        case 0:
          fetch('https://pandoraxapi1.herokuapp.com/api}/getInversion', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(function (res) {
              return res.json();
            })
            .then(function (response) {
              Inversiones = response;
            })
            ['catch'](function (error) {
              return console.error('Error:', error);
            });

        case 1:
        case 'end':
          return _context2.stop();
      }
    }
  });
};

var getMintedNftProducts = function getMintedNftProducts() {
  return function _callee(dispatch) {
    var _provider,
      productosMinter,
      inversionesMinter,
      mintedNftProductos,
      mintedNftInversiones,
      disponibleNftp,
      mintedNftpArray,
      disponibleNfti,
      mintedNftiArray,
      nftPrice,
      priceFormat;

    return regeneratorRuntime.async(
      function _callee$(_context3) {
        while (1) {
          switch ((_context3.prev = _context3.next)) {
            case 0:
              dispatch(mintedLoading());
              _context3.prev = 1;
              _provider = new _ethers.ethers.providers.JsonRpcProvider(RPC_URL); //cambiar provider que se obtiene en NFTRO

              productosMinter = new _ethers.ethers.Contract(
                PRODUCTOS_MINTER_ADDRESS,
                _ProductoMinter['default'],
                _provider
              ); //Contracto del marketPlace

              inversionesMinter = new _ethers.ethers.Contract(
                INVERSION_MINTER_ADDRESS,
                _InversionMinter['default'],
                _provider
              ); //Contracto del marketPlace

              _context3.next = 7;
              return regeneratorRuntime.awrap(
                productosMinter.getNftInContract()
              );

            case 7:
              mintedNftProductos = _context3.sent;
              _context3.next = 10;
              return regeneratorRuntime.awrap(
                inversionesMinter.getNftInContract()
              );

            case 10:
              mintedNftInversiones = _context3.sent;
              disponibleNftp = [];
              mintedNftpArray = [];
              disponibleNfti = [];
              mintedNftiArray = [];
              _context3.next = 17;
              return regeneratorRuntime.awrap(getProductos());

            case 17:
              _context3.next = 19;
              return regeneratorRuntime.awrap(getInversiones());

            case 19:
              mintedNftProductos.map(function (item) {
                mintedNftpArray.push(parseInt(item));
              });
              mintedNftInversiones.map(function (item) {
                mintedNftiArray.push(parseInt(item));
              });
              Productos.map(function (item) {
                if (mintedNftpArray.includes(item.number)) {
                  //si no lo tiene los manda
                  disponibleNftp.push(item);
                }
              });
              Inversiones.map(function (item) {
                if (mintedNftiArray.includes(item.number)) {
                  //si no lo tiene los manda
                  disponibleNfti.push(item);
                }
              });
              _context3.next = 25;
              return regeneratorRuntime.awrap(
                productosMinter.getPricePlusFee()
              );

            case 25:
              nftPrice = _context3.sent;
              priceFormat = parseFloat(
                _ethers.ethers.utils.formatUnits(nftPrice, 18)
              ).toFixed(2);
              dispatch(
                mintedLoaded({
                  disponibleNftp: disponibleNftp,
                  mintedNftProductos: mintedNftProductos,
                  disponibleNfti: disponibleNfti,
                  mintedNftInversiones: mintedNftInversiones,
                  priceFormat: priceFormat,
                })
              );
              _context3.next = 33;
              break;

            case 30:
              _context3.prev = 30;
              _context3.t0 = _context3['catch'](1);
              dispatch(mintedError(_context3.t0.message));

            case 33:
            case 'end':
              return _context3.stop();
          }
        }
      },
      null,
      null,
      [[1, 30]]
    );
  };
};

exports.getMintedNftProducts = getMintedNftProducts;

var MintProducts = function MintProducts(supply) {
  return function _callee2(dispatch) {
    var signer, productoMinter, tx;
    return regeneratorRuntime.async(
      function _callee2$(_context4) {
        while (1) {
          switch ((_context4.prev = _context4.next)) {
            case 0:
              dispatch(mintedLoading());
              dispatch(mintedLoading());
              _context4.prev = 2;

              /*const provider = new ethers.providers.JsonRpcProvider(
              RPC_URL
            );*/
              //cambiar provider que se obtiene en NFTRO
              signer = _NFTROL.provider.getSigner();
              productoMinter = new _ethers.ethers.Contract(
                PRODUCTOS_MINTER_ADDRESS,
                _ProductoMinter['default'],
                signer
              );
              _context4.next = 7;
              return regeneratorRuntime.awrap(productoMinter.Mint(supply));

            case 7:
              tx = _context4.sent;
              _context4.next = 13;
              break;

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4['catch'](2);
              dispatch(mintedError(_context4.t0.message));

            case 13:
            case 'end':
              return _context4.stop();
          }
        }
      },
      null,
      null,
      [[2, 10]]
    );
  };
};

exports.MintProducts = MintProducts;

var MintInversion = function MintInversion(supply) {
  return function _callee3(dispatch) {
    var signer, inversionMinter, tx;
    return regeneratorRuntime.async(
      function _callee3$(_context5) {
        while (1) {
          switch ((_context5.prev = _context5.next)) {
            case 0:
              dispatch(mintedLoading());
              dispatch(mintedLoading());
              _context5.prev = 2;

              /*const provider = new ethers.providers.JsonRpcProvider(
              RPC_URL
            );*/
              //cambiar provider que se obtiene en NFTRO
              signer = _NFTROL.provider.getSigner();
              inversionMinter = new _ethers.ethers.Contract(
                INVERSION_MINTER_ADDRESS,
                _InversionMinter['default'],
                signer
              );
              _context5.next = 7;
              return regeneratorRuntime.awrap(inversionMinter.Mint(supply));

            case 7:
              tx = _context5.sent;
              _context5.next = 13;
              break;

            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5['catch'](2);
              dispatch(mintedError(_context5.t0.message));

            case 13:
            case 'end':
              return _context5.stop();
          }
        }
      },
      null,
      null,
      [[2, 10]]
    );
  };
};

exports.MintInversion = MintInversion;
