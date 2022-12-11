'use strict';
exports.__esModule = true;
exports.coinSlideData = void 0;
//images
var bitcoin_svg_1 = require('@/assets/images/coin/bitcoin.svg');
var tether_svg_1 = require('@/assets/images/coin/tether.svg');
var binance_svg_1 = require('@/assets/images/coin/binance.svg');
var usd_coin_svg_1 = require('@/assets/images/coin/usd-coin.svg');
exports.coinSlideData = [
  {
    id: '0',
    name: 'Bitcoin',
    symbol: 'BTC',
    balance: '17166.16',
    //usdBalance: '11,032.24',
    logo: bitcoin_svg_1['default'],
    //change: '+12.5%',
    //isChangePositive: true,
    color: '#FDEDD4',
  },
  {
    id: '1',
    name: 'Tether',
    symbol: 'ETH',
    balance: '1',
    //usdBalance: '1,032.24',
    logo: tether_svg_1['default'],
    //change: '-1.5%',
    //isChangePositive: false,
    color: '#E1F9F1',
  },
  {
    id: '2',
    name: 'USDCoin',
    symbol: 'USDC',
    balance: '1',
    //usdBalance: '1,032.24',
    logo: usd_coin_svg_1['default'],
    //change: '-1.5%',
    //isChangePositive: false,
    color: '#CCFFFC',
  },
  {
    id: '3',
    name: 'Ethereum',
    symbol: 'ETH',
    balance: '1272.18',
    //usdBalance: '340.24',
    logo: binance_svg_1['default'],
    //change: '+1.5%',
    //isChangePositive: true,
    color: '#D3E4F4',
  },
];
