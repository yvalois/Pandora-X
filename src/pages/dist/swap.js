'use strict';
exports.__esModule = true;
var react_1 = require('react');
var classnames_1 = require('classnames');
var next_seo_1 = require('next-seo');
var button_1 = require('@/components/ui/button');
var coin_input_1 = require('@/components/ui/coin-input');
var transaction_info_1 = require('@/components/ui/transaction-info');
var swap_icon_1 = require('@/components/icons/swap-icon');
var _dashboard_1 = require('@/layouts/_dashboard');
var trade_1 = require('@/components/ui/trade');
var SwapPage = function () {
  var _a = react_1.useState(false),
    toggleCoin = _a[0],
    setToggleCoin = _a[1];
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(next_seo_1.NextSeo, {
      title: 'Farms',
      description: 'Criptic - React Next Web3 NFT Crypto Dashboard Template',
    }),
    React.createElement(
      trade_1['default'],
      null,
      React.createElement(
        'div',
        {
          className:
            'mb-5 border-b border-dashed border-gray-200 pb-5 dark:border-gray-800 xs:mb-7 xs:pb-6',
        },
        React.createElement(
          'div',
          {
            className: classnames_1['default'](
              'relative flex gap-3',
              toggleCoin ? 'flex-col-reverse' : 'flex-col'
            ),
          },
          React.createElement(coin_input_1['default'], {
            label: '',
            exchangeRate: 0.0,
            defaultCoinIndex: 0,
            getCoinValue: function (data) {
              return console.log('From coin value:', data);
            },
          }),
          React.createElement(
            'div',
            {
              className:
                'absolute top-1/2 left-1/2 z-[1] -mt-4 -ml-4 rounded-full bg-white shadow-large dark:bg-gray-600',
            },
            React.createElement(
              button_1['default'],
              {
                size: 'mini',
                color: 'gray',
                shape: 'circle',
                variant: 'transparent',
                onClick: function () {
                  return setToggleCoin(!toggleCoin);
                },
              },
              React.createElement(swap_icon_1.SwapIcon, {
                className: 'h-auto w-3',
              })
            )
          ),
          React.createElement(coin_input_1['default'], {
            label: 'To',
            exchangeRate: 0.0,
            defaultCoinIndex: 1,
            getCoinValue: function (data) {
              return console.log('To coin value:', data);
            },
          })
        )
      ),
      React.createElement(
        'div',
        { className: 'flex flex-col gap-4 xs:gap-[18px]' },
        React.createElement(transaction_info_1['default'], {
          label: 'Min. Received',
        }),
        React.createElement(transaction_info_1['default'], { label: 'Rate' }),
        React.createElement(transaction_info_1['default'], {
          label: 'Offered by',
        }),
        React.createElement(transaction_info_1['default'], {
          label: 'Price Slippage',
          value: '1%',
        }),
        React.createElement(transaction_info_1['default'], {
          label: 'Network Fee',
        }),
        React.createElement(transaction_info_1['default'], {
          label: 'Criptic Fee',
        })
      ),
      React.createElement(
        button_1['default'],
        {
          size: 'large',
          shape: 'rounded',
          fullWidth: true,
          className: 'mt-6 uppercase xs:mt-8 xs:tracking-widest',
        },
        'SWAP'
      )
    )
  );
};
SwapPage.getLayout = function getLayout(page) {
  return React.createElement(_dashboard_1['default'], null, page);
};
exports['default'] = SwapPage;
