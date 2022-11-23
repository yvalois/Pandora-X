'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.Web3Client = void 0;

var _web3modal = _interopRequireDefault(require('web3modal'));

var _web3Provider = _interopRequireDefault(
  require('@walletconnect/web3-provider')
);

var _blockchainRoutes = require('../redux/blockchainRoutes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var router = (0, _blockchainRoutes.contract)();
var RPC_URL = router.RPC_URL;

var Web3Client = (function () {
  var web3Instance;

  var createInstance = function createInstance() {
    var providerOptions = {
      walletconnect: {
        package: _web3Provider['default'],
        // required
        options: {
          rpc: {
            5: RPC_URL,
          },
          chainId: 5,
        },
      },
    };
    return new _web3modal['default']({
      network: 'GoerliETH',
      // optional
      cacheProvider: true,
      // optional
      providerOptions: providerOptions, // required
    });
  };

  return {
    getInstance: function getInstance() {
      if (!web3Instance) {
        web3Instance = createInstance();
      }

      return web3Instance;
    },
  };
})();

exports.Web3Client = Web3Client;
