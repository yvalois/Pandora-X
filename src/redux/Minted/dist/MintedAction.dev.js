'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.getMintedNft = void 0;

var _ethers = require('ethers');

var _nudaraMinter = _interopRequireDefault(
  require('../../abi/nudaraMinter.json')
);

var _blockchainRoutes = require('../blockchainRoutes');

var _constant = require('../../utils/constant');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

//Buscar
//Buscar
//import {provider} from "../../NFTROL"
var ROUTER = (0, _blockchainRoutes.contract)();
var RPC_URL = ROUTER.RPC_URL;
var NUDARA_MINTER_ADDRESS = ROUTER.nudaraMinter;

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

var getMintedNft = function getMintedNft() {
  return function _callee(dispatch) {
    var provider,
      nudaraMinter,
      mintedNft,
      disponibleNft,
      mintedNftArray,
      nftPrice,
      priceFormat;
    return regeneratorRuntime.async(
      function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              dispatch(mintedLoading());
              _context.prev = 1;
              provider = new _ethers.ethers.providers.JsonRpcProvider(
                'https://eth-goerli.g.alchemy.com/v2/6Cz9qwj5jNWtAYbDl84MK1Z9XR05MjXV'
              ); //cambiar provider que se obtiene en NFTRO

              nudaraMinter = new _ethers.ethers.Contract(
                '0x6BB9547894806539C1465AeBafb3018adB0a313E',
                _nudaraMinter['default'],
                provider
              ); //Contracto del marketPlace

              _context.next = 6;
              return regeneratorRuntime.awrap(nudaraMinter.getNftInContract());

            case 6:
              mintedNft = _context.sent;
              disponibleNft = [];
              mintedNftArray = [];
              mintedNft.map(function (item) {
                mintedNftArray.push(parseInt(item));
              });
              console.log(mintedNftArray);

              _constant.items.map(function (item) {
                if (mintedNftArray.includes(item.number)) {
                  //si no lo tiene los manda
                  disponibleNft.push(item);
                }
              });

              _context.next = 14;
              return regeneratorRuntime.awrap(nudaraMinter.getPricePlusFee());

            case 14:
              nftPrice = _context.sent;
              priceFormat = parseFloat(
                _ethers.ethers.utils.formatUnits(nftPrice, 18)
              ).toFixed(2);
              console.log(priceFormat);
              console.log('a');
              dispatch(
                mintedLoaded({
                  disponibleNft: disponibleNft,
                  mintedNft: mintedNft,
                  priceFormat: priceFormat,
                })
              );
              _context.next = 24;
              break;

            case 21:
              _context.prev = 21;
              _context.t0 = _context['catch'](1);
              dispatch(mintedError(_context.t0.message));

            case 24:
            case 'end':
              return _context.stop();
          }
        }
      },
      null,
      null,
      [[1, 21]]
    );
  };
};

exports.getMintedNft = getMintedNft;
