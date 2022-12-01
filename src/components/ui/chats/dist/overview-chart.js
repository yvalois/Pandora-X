'use strict';
exports.__esModule = true;
var classnames_1 = require('classnames');
var recharts_1 = require('recharts');
var react_redux_1 = require('react-redux');
var data = [
  {
    name: 'Page A',
    uv: 1200,
    pv: 800,
  },
  {
    name: 'Page B',
    uv: 2600,
    pv: 100,
  },
  {
    name: 'Page C',
    uv: 1900,
    pv: 1600,
  },
  {
    name: 'Page D',
    uv: 2280,
    pv: 1508,
  },
  {
    name: 'Page E',
    uv: 1290,
    pv: 3500,
  },
  {
    name: 'Page F',
    uv: 1690,
    pv: 3000,
  },
  {
    name: 'Page G',
    uv: 2590,
    pv: 4500,
  },
];
function OverviewChart(_a) {
  var chartWrapperClass = _a.chartWrapperClass,
    balance = _a.balance;
  var isConnect = react_redux_1.useSelector(function (state) {
    return state.blockchain;
  }).isConnect;
  return React.createElement(
    'div',
    {
      className:
        'rounded-lg bg-gray-900 p-6 text-white dark:bg-light-dark sm:p-8',
    },
    isConnect &&
      React.createElement(
        'h3',
        {
          className:
            'text-xl font-medium tracking-tighter text-white sm:text-3xl',
        },
        balance,
        ' Usdt'
      ),
    !isConnect &&
      React.createElement(
        'h3',
        {
          className:
            'text-xl font-medium tracking-tighter text-white sm:text-3xl',
        },
        'Connect'
      ),
    isConnect &&
      React.createElement(
        'p',
        { className: 'mt-2 mb-1 text-xs font-medium text-gray-400 sm:text-sm' },
        'Balance'
      ),
    !isConnect &&
      React.createElement(
        'p',
        { className: 'mt-2 mb-1 text-xs font-medium text-gray-400 sm:text-sm' },
        'your are not connected'
      ),
    React.createElement(
      'div',
      { className: classnames_1['default']('h-60 w-full', chartWrapperClass) },
      React.createElement(
        recharts_1.ResponsiveContainer,
        { width: '100%', height: '100%' },
        React.createElement(recharts_1.LineChart, { data: data })
      )
    )
  );
}
exports['default'] = OverviewChart;
