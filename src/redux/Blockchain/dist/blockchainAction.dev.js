'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.connectWalletToBLock = void 0;

var _ethers = require('ethers');

var _web3modal = _interopRequireDefault(require('web3modal'));

var _web3Provider = _interopRequireDefault(
  require('@walletconnect/web3-provider')
);

var _blockchainRoutes = require('../blockchainRoutes');

var _abiERC = _interopRequireDefault(require('../../abi/abiERC20.json'));

var _nudaraMinter = _interopRequireDefault(
  require('../../abi/nudaraMinter.json')
);

var _constant = require('../../utils/constant');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

//Buscar
//Buscar
//Buscar
var router = (0, _blockchainRoutes.contract)();
var BUSD_ADDRESS = router.busdContract;
var USDT_ADDRESS = router.usdtContract;
var USDC_ADDRESS = router.usdcContract;
var DAI_ADDRESS = router.daiContract;
var NUDARA_MINTER_ADDRESS = router.nudaraMinter;
var RPC_URL = router.RPC_URL;
var providerOptions = {
  walletconnect: {
    package: _web3Provider['default'],
    options: {
      rpc: {
        137: RPC_URL,
      },
    },
  },
};
/*const web3Modal = new Web3Modal({
    disableInjectedProvider: false,
    cacheProvider: true,
    providerOptions
});*/

var loading = function loading() {
  return {
    type: 'LOADING',
  };
};

var dataLoaded = function dataLoaded(payload) {
  return {
    type: 'DATA_LOADED',
    payload: payload,
  };
};

var error = function error(payload) {
  return {
    type: 'ERROR',
    payload: payload,
  };
};

var updateBalance = function updateBalance(payload) {
  return {
    type: 'UPDATE_BALANCE',
    payload: payload,
  };
};

var userChange = function userChange() {
  return {
    type: 'USER_CHANGE',
  };
};

var adminChange = function adminChange() {
  return {
    type: 'ADMIN_CHANGE',
  };
};

var connectWalletToBLock = function connectWalletToBLock() {
  return function _callee2(dispatch, _provider) {
    var signer,
      accounts,
      networkId,
      busdContract,
      usdtContract,
      usdcContract,
      daiContract,
      nudaraMinterContract,
      nftBalance,
      inventory,
      busdBalance,
      usdtBalance,
      usdcBalance,
      daiBalance,
      balanceFormat,
      balanceFormat2,
      balanceFormat3,
      balanceFormat4;
    return regeneratorRuntime.async(
      function _callee2$(_context2) {
        while (1) {
          switch ((_context2.prev = _context2.next)) {
            case 0:
              dispatch(loading());
              _context2.prev = 1;
              //const instance = await web3Modal.connect(providerOptions);
              //const provider = new ethers.providers.Web3Provider(instance);
              console.log(_provider);
              signer = _provider.getSigner();
              _context2.next = 6;
              return regeneratorRuntime.awrap(_provider.listAccounts());

            case 6:
              accounts = _context2.sent;
              _context2.next = 9;
              return regeneratorRuntime.awrap(_provider.getNetwork());

            case 9:
              networkId = _context2.sent;
              console.log(accounts[0], networkId);
              busdContract = new _ethers.ethers.Contract(
                BUSD_ADDRESS,
                _abiERC['default'],
                signer
              );
              usdtContract = new _ethers.ethers.Contract(
                USDT_ADDRESS,
                _abiERC['default'],
                signer
              );
              usdcContract = new _ethers.ethers.Contract(
                USDC_ADDRESS,
                _abiERC['default'],
                signer
              );
              daiContract = new _ethers.ethers.Contract(
                DAI_ADDRESS,
                _abiERC['default'],
                signer
              );
              nudaraMinterContract = new _ethers.ethers.Contract(
                NUDARA_MINTER_ADDRESS,
                _nudaraMinter['default'],
                signer
              );
              _context2.next = 18;
              return regeneratorRuntime.awrap(
                nudaraMinterContract.getMyInventory(accounts[0])
              );

            case 18:
              nftBalance = _context2.sent;
              inventory = [];
              nftBalance.map(function (item) {
                // if inventory id in items push to inventory
                if (_constant.items[item]) {
                  inventory.push(_constant.items[item.id]);
                }
              });
              console.log(inventory);
              _context2.next = 24;
              return regeneratorRuntime.awrap(
                busdContract.balanceOf(accounts[0])
              );

            case 24:
              busdBalance = _context2.sent;
              _context2.next = 27;
              return regeneratorRuntime.awrap(
                usdtContract.balanceOf(accounts[0])
              );

            case 27:
              usdtBalance = _context2.sent;
              _context2.next = 30;
              return regeneratorRuntime.awrap(
                usdcContract.balanceOf(accounts[0])
              );

            case 30:
              usdcBalance = _context2.sent;
              _context2.next = 33;
              return regeneratorRuntime.awrap(
                daiContract.balanceOf(accounts[0])
              );

            case 33:
              daiBalance = _context2.sent;
              balanceFormat = _ethers.ethers.utils.formatUnits(busdBalance, 18);
              balanceFormat2 = _ethers.ethers.utils.formatUnits(usdtBalance, 6);
              balanceFormat3 = _ethers.ethers.utils.formatUnits(usdcBalance, 6);
              balanceFormat4 = _ethers.ethers.utils.formatUnits(daiBalance, 18);
              dispatch(
                dataLoaded({
                  usdtContract: usdtContract,
                  busdContract: busdContract,
                  usdcContract: usdcContract,
                  daiContract: daiContract,
                  nudaraMinter: nudaraMinterContract,
                  accountAddress: accounts[0],
                  busdBalance: balanceFormat,
                  usdtBalance: balanceFormat2,
                  usdcBalance: balanceFormat3,
                  daiBalance: balanceFormat4,
                  inventory: inventory,
                })
              );
              instance.on('accountsChanged', function _callee(accounts) {
                var busdBalance,
                  usdtBalance,
                  usdcBalance,
                  daiBalance,
                  nftBalance,
                  inventory,
                  accountAddress,
                  balanceFormat,
                  balanceFormat2,
                  balanceFormat3,
                  balanceFormat4;
                return regeneratorRuntime.async(function _callee$(_context) {
                  while (1) {
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        _context.next = 2;
                        return regeneratorRuntime.awrap(
                          busdContract.balanceOf(accounts[0])
                        );

                      case 2:
                        busdBalance = _context.sent;
                        _context.next = 5;
                        return regeneratorRuntime.awrap(
                          usdtContract.balanceOf(accounts[0])
                        );

                      case 5:
                        usdtBalance = _context.sent;
                        _context.next = 8;
                        return regeneratorRuntime.awrap(
                          usdcContract.balanceOf(accounts[0])
                        );

                      case 8:
                        usdcBalance = _context.sent;
                        _context.next = 11;
                        return regeneratorRuntime.awrap(
                          daiContract.balanceOf(accounts[0])
                        );

                      case 11:
                        daiBalance = _context.sent;
                        _context.next = 14;
                        return regeneratorRuntime.awrap(
                          nudaraMinterContract.getMyInventory(accounts[0])
                        );

                      case 14:
                        nftBalance = _context.sent;
                        inventory = [];
                        nftBalance.map(function (item) {
                          // if inventory id in items push to inventory
                          if (_constant.items[item]) {
                            inventory.push(_constant.items[item.id]);
                          }
                        });
                        accountAddress = accounts[0];
                        balanceFormat = _ethers.ethers.utils.formatUnits(
                          busdBalance,
                          18
                        );
                        balanceFormat2 = _ethers.ethers.utils.formatUnits(
                          usdtBalance,
                          6
                        );
                        balanceFormat3 = _ethers.ethers.utils.formatUnits(
                          usdcBalance,
                          6
                        );
                        balanceFormat4 = _ethers.ethers.utils.formatUnits(
                          daiBalance,
                          18
                        );
                        dispatch(
                          updateBalance({
                            accountAddress: accountAddress,
                            busdBalance: balanceFormat,
                            usdtBalance: balanceFormat2,
                            usdcBalance: balanceFormat3,
                            daiBalance: balanceFormat4,
                            inventory: inventory,
                          })
                        );
                        dispatch(userChange());
                        dispatch(adminChange());

                      case 25:
                      case 'end':
                        return _context.stop();
                    }
                  }
                });
              });
              /*else {
               if (process.env.NODE_ENV === 'production') {
                   try {
                       await provider.provider.request({
                           method: 'wallet_switchEthereumChain',
                           params: [{ chainId: `0x${Number(137).toString(16)}` }],
                       })
                   } catch (switchError) {
                       if (switchError.code === 4902) {
                           try {
                               await provider.provider.request({
                                   method: 'wallet_addEthereumChain',
                                   params: [{
                                       chainId: `0x${Number(137).toString(16)}`,
                                       chainName: 'Matic Mainnet',
                                       nativeCurrency: {
                                           name: 'Matic',
                                           symbol: 'MATIC',
                                           decimals: 18,
                                       },
                                       rpcUrls: [RPC_URL],
                                       blockExplorerUrls: ['https://polygonscan.com/'],
                                   }],
                               })
                           } catch (addError) {
                               console.log(addError)
                           }
                       }
                   }
               }
               if (process.env.NODE_ENV === 'development') {
                   try {
                       await provider.provider.request({
                           method: 'wallet_switchEthereumChain',
                           params: [{ chainId: `0x${Number(80001).toString(16)}` }],
                       })
                   } catch (switchError) {
                       if (switchError.code === 4902) {
                           try {
                               await provider.provider.request({
                                   method: 'wallet_addEthereumChain',
                                   params: [{
                                       chainId: `0x${Number(80001).toString(16)}`,
                                       chainName: 'Matic Testnet Mumbai',
                                       nativeCurrency: {
                                           name: 'Matic',
                                           symbol: 'MATIC',
                                           decimals: 18,
                                       },
                                       rpcUrls: [RPC_URL],
                                       blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
                                   }],
                               })
                           } catch (addError) {
                               console.log(addError)
                           }
                       }
                   }
               }
            }*/

              _context2.next = 45;
              break;

            case 42:
              _context2.prev = 42;
              _context2.t0 = _context2['catch'](1);
              dispatch(error(_context2.t0));

            case 45:
            case 'end':
              return _context2.stop();
          }
        }
      },
      null,
      null,
      [[1, 42]]
    );
  };
};

exports.connectWalletToBLock = connectWalletToBLock;
