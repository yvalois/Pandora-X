'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.contract = void 0;

var contract = function contract() {
  //if (process.env.NODE_ENV === 'development')
  return {
    usdtContract: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    usdcContract: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    busdContract: '0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7',
    daiContract: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    productoMinter: '0x02d87E80F288353D8e4AaCE36202caB4017dc5A0',
    inversionMinter: '0x9595fAaC6D9da7759DD41B5bBD8C1aB236409381',
    RPC_URL: 'https://goerli.infura.io/v3/',
    tokenPrueba: '0xB797D01EA243bCBFAd70c1c57fB12953e5e4043F',
  };
  /*if (process.env.NODE_ENV === 'production') {
    return {
      usdtContract: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      usdcContract: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      busdContract: '0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7',
      daiContract: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      productoMinter: '0x02d87E80F288353D8e4AaCE36202caB4017dc5A0',
      inversionMinter: '0x9595fAaC6D9da7759DD41B5bBD8C1aB236409381',
      RPC_URL:'https://eth-goerli.g.alchemy.com/v2/6Cz9qwj5jNWtAYbDl84MK1Z9XR05MjXV',
      tokenPrueba: '0xB797D01EA243bCBFAd70c1c57fB12953e5e4043F',
    };
  }*/
};

exports.contract = contract;
