'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
exports.__esModule = true;
exports.getStaticProps = void 0;
var react_1 = require('react');
var next_seo_1 = require('next-seo');
var _layout_1 = require('@/layouts/_layout');
var comparison_chart_1 = require('@/components/ui/chats/comparison-chart');
var avatar_1 = require('@/components/ui/avatar');
var overview_chart_1 = require('@/components/ui/chats/overview-chart');
var top_pools_1 = require('@/components/ui/top-pools');
var transaction_table_1 = require('@/components/transaction/transaction-table');
var wallet_card_1 = require('@/components/ui/wallet-card');
var transact_coin_1 = require('@/components/ui/transact-coin');
var live_price_feed_1 = require('@/components/ui/live-price-feed');
var price_feed_1 = require('@/data/static/price-feed');
var use_breakpoint_1 = require('@/lib/hooks/use-breakpoint');
//images
var author_jpg_1 = require('@/assets/images/author.jpg');
exports.getStaticProps = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [
        2 /*return*/,
        {
          props: {},
        },
      ];
    });
  });
};
var topPoolsLimit = function (breakpoint) {
  switch (breakpoint) {
    case 'md':
      return 5;
    case '2xl':
      return 5;
    default:
      return 4;
  }
};
var Index2 = function () {
  var _a = react_1.useState(4),
    limit = _a[0],
    setLimit = _a[1];
  var breakpoint = use_breakpoint_1.useBreakpoint();
  react_1.useEffect(
    function () {
      setLimit(topPoolsLimit(breakpoint));
    },
    [breakpoint]
  );
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(next_seo_1.NextSeo, {
      title: 'Pandora Minimal',
      description: 'Criptic - React Next Web3 NFT Crypto Dashboard Template',
    }),
    React.createElement(
      'div',
      { className: 'mt-8 gap-6 px-4 sm:px-6 lg:px-8 xl:px-10 3xl:px-12' },
      React.createElement(live_price_feed_1['default'], {
        limit: 4,
        priceFeeds: price_feed_1.priceFeedData,
        gridClassName: 'grid-cols-1 gap-6 2xl:grid-cols-4',
      }),
      React.createElement(
        'div',
        {
          className:
            'mt-6 grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-12',
        },
        React.createElement(
          'div',
          {
            className:
              'flex items-center rounded-lg bg-white p-6 shadow-card dark:bg-light-dark md:col-span-1 md:h-[678px] lg:col-span-5 lg:h-[644px] xl:col-span-3 xl:row-start-1 xl:row-end-2 xl:h-auto 2xl:col-span-3 2xl:h-full 2xl:p-6 3xl:col-span-3 3xl:p-8',
          },
          React.createElement(
            'div',
            { className: 'w-full' },
            React.createElement(
              'div',
              { className: 'mb-8 h-full' },
              React.createElement(avatar_1['default'], {
                image: author_jpg_1['default'],
                alt: 'Author',
                className: 'mx-auto mb-6',
                size: 'lg',
              }),
              React.createElement(
                'h3',
                {
                  className:
                    'mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3',
                },
                'My Balance'
              ),
              React.createElement(
                'div',
                {
                  className:
                    'mb-7 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]',
                },
                '$10,86,000'
              )
            ),
            React.createElement('span', {
              className:
                '-mx-6 block border-t border-dashed border-t-gray-200 dark:border-t-gray-700 3xl:-mx-8',
            }),
            React.createElement(transact_coin_1['default'], {
              className: 'mt-6',
            })
          )
        ),
        React.createElement(
          'div',
          {
            className:
              ' md:col-span-2 lg:col-span-12 lg:col-start-6 lg:col-end-13 lg:row-start-1 lg:row-end-2 xl:col-start-4 xl:col-end-10 xl:row-start-1 xl:row-end-2 2xl:col-span-8 2xl:col-start-4 2xl:col-end-10 2xl:row-start-1 2xl:row-end-2 3xl:col-span-6 3xl:col-start-4 3xl:col-end-10 3xl:row-start-1 3xl:row-end-2',
          },
          React.createElement(comparison_chart_1['default'], null)
        ),
        React.createElement(
          'div',
          {
            className:
              'md:col-span-2 lg:col-span-6 lg:row-start-2 lg:row-end-3 xl:col-start-10 xl:col-end-13 xl:row-start-1 xl:row-end-2 2xl:col-start-10 2xl:col-end-13 2xl:row-start-1 2xl:row-end-2 3xl:col-span-3 3xl:row-start-1',
          },
          React.createElement(
            'div',
            { className: 'grid gap-6 md:grid-cols-2 lg:grid-cols-1' },
            React.createElement(overview_chart_1['default'], {
              chartWrapperClass:
                'h-[224px] lg:h-[214px] xl:h-[190px] 2xl:h-[214px] 3xl:h-[268px] 4xl:h-[352px]',
            }),
            React.createElement(top_pools_1['default'], { limit: limit })
          )
        ),
        React.createElement(
          'div',
          {
            className:
              'md:col-span-2 lg:col-span-full xl:col-start-1 xl:col-end-9 xl:row-start-2 xl:row-end-3 2xl:col-start-1 2xl:col-end-10 2xl:row-start-2 2xl:row-end-3 3xl:col-span-9 3xl:row-start-2 3xl:row-end-3',
          },
          React.createElement(transaction_table_1['default'], null)
        ),
        React.createElement(
          'div',
          {
            className:
              'md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2 lg:col-span-6 lg:row-start-2 lg:row-end-3 xl:col-start-9 xl:col-end-13 xl:row-start-2 xl:row-end-3 2xl:col-start-10 2xl:col-end-13 2xl:row-start-2 2xl:row-end-3 3xl:col-span-3 3xl:row-start-2 3xl:row-end-3',
          },
          React.createElement(wallet_card_1['default'], null)
        )
      )
    )
  );
};
Index2.getLayout = function getLayout(page) {
  return React.createElement(_layout_1['default'], null, page);
};
exports['default'] = Index2;
