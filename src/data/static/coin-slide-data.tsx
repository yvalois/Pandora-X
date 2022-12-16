//images
import BitcoinImage from '@/assets/images/coin/bitcoin.svg';
import TetherImage from '@/assets/images/coin/tether.svg';
import CardanoImage from '@/assets/images/coin/cardano.svg';
import BinanceImage from '@/assets/images/coin/binance.svg';
import usdcoin from '@/assets/images/coin/usd-coin.svg';

export const coinSlideData = [
  {
    id: '0',
    name: 'Bitcoin',
    symbol: 'BTC',
    balance: '17166.16',
    //usdBalance: '11,032.24',
    logo: BitcoinImage,
    //change: '+12.5%',
    //isChangePositive: true,
    color: '#F59221',
  },
  {
    id: '1',
    name: 'Ethereum',
    symbol: 'ETH',
    balance: '1272.18',
    //usdBalance: '340.24',
    logo: BinanceImage,
    //change: '+1.5%',
    //isChangePositive: true,
    color: '#6579BB',
  },
  {
    id: '2',
    name: 'Tether',
    symbol: 'USDT',
    balance: '1',
    //usdBalance: '1,032.24',
    logo: TetherImage,
    //change: '-1.5%',
    //isChangePositive: false,
    color: '#4DB096',
  },
  {
    id: '3',
    name: 'USDCoin',
    symbol: 'USDC',
    balance: '1',
    //usdBalance: '1,032.24',
    logo: usdcoin,
    //change: '-1.5%',
    //isChangePositive: false,
    color: '#2F76BA',
  },
];
