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
var next_seo_1 = require('next-seo');
var _classic_1 = require('@/layouts/_classic');
var coin_card_two_1 = require('@/components/ui/coin-card-two');
var overview_chart_1 = require('@/components/ui/chats/overview-chart');
var retro_comparision_chart_1 = require('@/components/ui/chats/retro-comparision-chart');
var top_pools_1 = require('@/components/ui/top-pools');
var transaction_table_1 = require('@/components/transaction/transaction-table');
var currency_table_1 = require('@/components/top-currency/currency-table');
var coin_slide_data_1 = require('@/data/static/coin-slide-data');
var transact_coin_1 = require('@/components/ui/transact-coin');
var avatar_1 = require('@/components/ui/avatar');
var topup_button_1 = require('@/components/ui/topup-button');
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
var ClassicPage = function () {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(next_seo_1.NextSeo, {
      title: 'Pandora Classic Demo',
      description: 'Criptic - React Next Web3 NFT Crypto Dashboard Template',
    }),
    React.createElement(
      'div',
      { className: 'flex flex-wrap' },
      React.createElement(
        'div',
        { className: 'mb-8 w-full sm:mb-0  ' },
        React.createElement(coin_card_two_1['default'], {
          coins: coin_slide_data_1.coinSlideData,
        })
      )
    ),
    React.createElement(
      'div',
      { className: 'flex w-full flex-col sm:mt-8 lg:mt-8 lg:flex-row' },
      React.createElement(
        'div',
        {
          className:
            'flex w-full items-center rounded-lg bg-white p-6 shadow-card dark:bg-light-dark md:col-span-1 md:h-[678px] lg:col-span-5 lg:h-[644px] lg:w-1/3 xl:col-span-3 xl:row-start-1 xl:row-end-2 xl:h-auto xl:w-1/4 2xl:col-span-3  2xl:h-[715px] 2xl:p-6 3xl:col-span-3 3xl:h-[730px] 3xl:p-8 4xl:h-[815px]',
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
            ),
            React.createElement(topup_button_1['default'], {
              className: 'md:h-12 ',
            })
          ),
          React.createElement('span', {
            className:
              '-mx-6 block border-t border-dashed border-t-gray-200 dark:border-t-gray-700 3xl:-mx-8',
          }),
          React.createElement(transact_coin_1['default'], { className: 'mt-6' })
        )
      ),
      React.createElement(
        'div',
        {
          className:
            'mt-5 w-full rtl:mr-6 sm:mt-10 lg:ml-6 lg:mt-0 lg:w-2/3 rtl:lg:ml-0 xl:w-3/4',
        },
        React.createElement(retro_comparision_chart_1['default'], null)
      )
    ),
    React.createElement(
      'div',
      { className: 'my-8 sm:my-10' },
      React.createElement(currency_table_1['default'], null)
    ),
    React.createElement(
      'div',
      { className: 'flex flex-wrap' },
      React.createElement(
        'div',
        {
          className:
            'w-full lg:w-[calc(100%-288px)] ltr:lg:pr-6 rtl:lg:pl-6 2xl:w-[calc(100%-320px)] 3xl:w-[calc(100%-358px)]',
        },
        React.createElement(transaction_table_1['default'], null)
      ),
      React.createElement(
        'div',
        {
          className:
            'order-first mb-8 grid w-full grid-cols-1 gap-6 sm:mb-10 sm:grid-cols-2 lg:order-1 lg:mb-0 lg:flex lg:w-72 lg:flex-col 2xl:w-80 3xl:w-[358px]',
        },
        React.createElement(overview_chart_1['default'], null),
        React.createElement(top_pools_1['default'], null)
      )
    )
  );
};
ClassicPage.getLayout = function getLayout(page) {
  return React.createElement(_classic_1['default'], null, page);
};
exports['default'] = ClassicPage;
