'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
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
exports.getStaticProps = exports.DrawerFilters = void 0;
var react_1 = require('react');
var jotai_1 = require('jotai');
var next_seo_1 = require('next-seo');
var rc_slider_1 = require('rc-slider');
var framer_motion_1 = require('framer-motion');
var _dashboard_1 = require('@/layouts/_dashboard');
var chevron_down_1 = require('@/components/icons/chevron-down');
var nft_card_1 = require('@/components/ui/nft-card');
var radio_group_1 = require('@/components/ui/radio-group');
var listbox_1 = require('@/components/ui/listbox');
var collapse_1 = require('@/components/ui/collapse');
var transition_1 = require('@/components/ui/transition');
var normal_grid_1 = require('@/components/icons/normal-grid');
var compact_grid_1 = require('@/components/icons/compact-grid');
var collection_select_list_1 = require('@/components/ui/collection-select-list');
var context_1 = require('@/components/drawer-views/context');
var scrollbar_1 = require('@/components/ui/scrollbar');
var button_1 = require('@/components/ui/button');
var close_1 = require('@/components/icons/close');
var react_redux_1 = require('react-redux');
var MintedAction_1 = require('../redux/Minted/MintedAction');
var gridCompactViewAtom = jotai_1.atom(false);
function useGridSwitcher() {
  var _a = jotai_1.useAtom(gridCompactViewAtom),
    isGridCompact = _a[0],
    setIsGridCompact = _a[1];
  return {
    isGridCompact: isGridCompact,
    setIsGridCompact: setIsGridCompact,
  };
}
function GridSwitcher() {
  var _a = useGridSwitcher(),
    isGridCompact = _a.isGridCompact,
    setIsGridCompact = _a.setIsGridCompact;
  return React.createElement(
    'div',
    { className: 'flex overflow-hidden rounded-lg' },
    React.createElement(
      'button',
      {
        className:
          'relative flex h-11 w-11 items-center justify-center bg-gray-100 transition dark:bg-gray-800 ' +
          (!isGridCompact ? 'z-10 text-white' : 'text-brand dark:text-white'),
        onClick: function () {
          return setIsGridCompact(!isGridCompact);
        },
        'aria-label': 'Normal Grid',
      },
      !isGridCompact &&
        React.createElement(framer_motion_1.motion.span, {
          className:
            'absolute left-0 right-0 bottom-0 h-full w-full bg-brand shadow-large',
          layoutId: 'gridSwitchIndicator',
        }),
      React.createElement(normal_grid_1.NormalGridIcon, {
        className: 'relative',
      })
    ),
    React.createElement(
      'button',
      {
        className:
          'relative flex h-11 w-11 items-center justify-center bg-gray-100 transition dark:bg-gray-800 ' +
          (isGridCompact ? 'z-10 text-white' : 'text-brand dark:text-white'),
        onClick: function () {
          return setIsGridCompact(!isGridCompact);
        },
        'aria-label': 'Normal Grid',
      },
      isGridCompact &&
        React.createElement(framer_motion_1.motion.span, {
          className:
            'absolute left-0 right-0 bottom-0 h-full w-full  bg-brand shadow-large',
          layoutId: 'gridSwitchIndicator',
        }),
      React.createElement(compact_grid_1.CompactGridIcon, {
        className: 'relative',
      })
    )
  );
}
var sort = [
  { id: 1, name: 'Date Listed: Newest' },
  { id: 2, name: 'Date Listed: Oldest' },
  { id: 3, name: 'Ending: Soonest' },
  { id: 4, name: 'Ending: Latest' },
];
function SortList() {
  var _a = react_1.useState(sort[0]),
    selectedItem = _a[0],
    setSelectedItem = _a[1];
  return React.createElement(
    'div',
    { className: 'relative' },
    React.createElement(
      listbox_1.Listbox,
      { value: selectedItem, onChange: setSelectedItem },
      React.createElement(
        listbox_1.Listbox.Button,
        {
          className:
            'flex h-10 w-auto items-center justify-between rounded-lg bg-gray-100 px-4 text-xs text-gray-900 dark:bg-gray-800 dark:text-white sm:w-56 sm:text-sm lg:h-11',
        },
        selectedItem.name,
        React.createElement(chevron_down_1.ChevronDown, {
          className: 'ltr:ml-2 rtl:mr-2',
        })
      ),
      React.createElement(
        transition_1.Transition,
        {
          enter: 'ease-out duration-200',
          enterFrom: 'opacity-0 translate-y-2',
          enterTo: 'opacity-100',
          leave: 'ease-in duration-200',
          leaveFrom: 'opacity-100 -translate-y-0',
          leaveTo: 'opacity-0 translate-y-2',
        },
        React.createElement(
          listbox_1.Listbox.Options,
          {
            className:
              'absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white p-3 shadow-large dark:bg-light-dark sm:w-full',
          },
          sort.map(function (item) {
            return React.createElement(
              listbox_1.Listbox.Option,
              { key: item.id, value: item },
              function (_a) {
                var selected = _a.selected;
                return React.createElement(
                  'div',
                  {
                    className:
                      'block cursor-pointer rounded-lg px-3 py-2 text-xs font-medium text-gray-900 transition dark:text-white sm:text-sm  ' +
                      (selected
                        ? 'my-1 bg-gray-100 dark:bg-gray-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'),
                  },
                  item.name
                );
              }
            );
          })
        )
      )
    )
  );
}
function PriceRange() {
  var _a = react_1.useState({ min: 0, max: 1000 }),
    range = _a[0],
    setRange = _a[1];
  function handleRangeChange(value) {
    setRange({
      min: value[0],
      max: value[1],
    });
  }
  function handleMaxChange(max) {
    setRange(__assign(__assign({}, range), { max: max || range.min }));
  }
  function handleMinChange(min) {
    setRange(__assign(__assign({}, range), { min: min || 0 }));
  }
  console.log(range);
  return React.createElement(
    'div',
    { className: 'p-5' },
    React.createElement(
      'div',
      { className: 'mb-4 grid grid-cols-2 gap-2' },
      React.createElement('input', {
        className:
          'h-9 rounded-lg border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500',
        type: 'number',
        value: range.min,
        onChange: function (e) {
          return handleMinChange(parseInt(e.target.value));
        },
        min: '0',
        max: range.max,
      }),
      React.createElement('input', {
        className:
          'h-9 rounded-lg border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500',
        type: 'number',
        value: range.max,
        onChange: function (e) {
          return handleMaxChange(parseInt(e.target.value));
        },
        min: range.min,
      })
    ),
    React.createElement(rc_slider_1['default'], {
      range: true,
      min: 0,
      max: 1000,
      value: [range.min, range.max],
      allowCross: false,
      onChange: function (value) {
        return handleRangeChange(value);
      },
    })
  );
}
function Status() {
  var _a = react_1.useState('buy-now'),
    plan = _a[0],
    setPlan = _a[1];
  console.log(plan);
  return React.createElement(
    radio_group_1.RadioGroup,
    { value: plan, onChange: setPlan, className: 'grid grid-cols-2 gap-2 p-5' },
    React.createElement(
      radio_group_1.RadioGroup.Option,
      { value: 'buy-now' },
      function (_a) {
        var checked = _a.checked;
        return React.createElement(
          'span',
          {
            className:
              'flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ' +
              (checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'),
          },
          'Buy Now'
        );
      }
    ),
    React.createElement(
      radio_group_1.RadioGroup.Option,
      { value: 'on-auction' },
      function (_a) {
        var checked = _a.checked;
        return React.createElement(
          'span',
          {
            className:
              'flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ' +
              (checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'),
          },
          'On Auction'
        );
      }
    ),
    React.createElement(
      radio_group_1.RadioGroup.Option,
      { value: 'new' },
      function (_a) {
        var checked = _a.checked;
        return React.createElement(
          'span',
          {
            className:
              'flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ' +
              (checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'),
          },
          'New'
        );
      }
    ),
    React.createElement(
      radio_group_1.RadioGroup.Option,
      { value: 'has-offers' },
      function (_a) {
        var checked = _a.checked;
        return React.createElement(
          'span',
          {
            className:
              'flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ' +
              (checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'),
          },
          'Has offers'
        );
      }
    )
  );
}
function Filters() {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      collapse_1['default'],
      { label: 'Status', initialOpen: true },
      React.createElement(Status, null)
    ),
    React.createElement(
      collapse_1['default'],
      { label: 'Price Range', initialOpen: true },
      React.createElement(PriceRange, null)
    ),
    React.createElement(
      collapse_1['default'],
      { label: 'Collection', initialOpen: true },
      React.createElement(collection_select_list_1['default'], {
        onSelect: function (value) {
          return console.log(value);
        },
      })
    )
  );
}
function DrawerFilters() {
  var closeDrawer = context_1.useDrawer().closeDrawer;
  return React.createElement(
    'div',
    { className: 'relative w-full max-w-full bg-white dark:bg-dark xs:w-80' },
    React.createElement(
      'div',
      {
        className:
          'flex h-20 items-center justify-between overflow-hidden px-6 py-4',
      },
      React.createElement(
        'h2',
        {
          className:
            'text-xl font-medium uppercase tracking-wider text-gray-900 dark:text-white',
        },
        'Filters'
      ),
      React.createElement(
        button_1['default'],
        {
          shape: 'circle',
          color: 'white',
          onClick: closeDrawer,
          className: 'dark:bg-light-dark',
        },
        React.createElement(close_1.Close, { className: 'h-auto w-3' })
      )
    ),
    React.createElement(
      scrollbar_1['default'],
      { style: { height: 'calc(100% - 96px)' } },
      React.createElement(
        'div',
        { className: 'px-6 pb-20 pt-1' },
        React.createElement(Filters, null)
      )
    ),
    React.createElement(
      'div',
      { className: 'absolute left-0 bottom-4 z-10 w-full px-6' },
      React.createElement(
        button_1['default'],
        { fullWidth: true, onClick: closeDrawer },
        'DONE'
      )
    )
  );
}
exports.DrawerFilters = DrawerFilters;
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
var SearchPage = function () {
  var isGridCompact = useGridSwitcher().isGridCompact;
  var openDrawer = context_1.useDrawer().openDrawer;
  var dispatch = react_redux_1.useDispatch();
  var _a = react_1.useState([]),
    currentItems = _a[0],
    setCurrentItems = _a[1];
  var _b = react_redux_1.useSelector(function (state) {
      return state.minted;
    }),
    dataloaded = _b.dataloaded,
    disponibleNft = _b.disponibleNft,
    priceFormat = _b.priceFormat,
    MintedNft = _b.MintedNft;
  var getNft = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, dispatch(MintedAction_1.getMintedNft())];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  react_1.useEffect(
    function () {
      var fetchItems = function () {
        getNft();
        //const itemsPerPage = 6
        //const start = (currentPage - 1) * itemsPerPage
        setCurrentItems(disponibleNft);
      };
      fetchItems();
    },
    [currentItems, dataloaded]
  );
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(next_seo_1.NextSeo, {
      title: 'Explore NTF',
      description: 'Criptic - React Next Web3 NFT Crypto Dashboard Template',
    }),
    React.createElement(
      'div',
      {
        className:
          'grid sm:pt-5 2xl:grid-cols-[280px_minmax(auto,_1fr)] 4xl:grid-cols-[320px_minmax(auto,_1fr)]',
      },
      React.createElement(
        'div',
        {
          className:
            'hidden border-dashed border-gray-200 ltr:border-r ltr:pr-8 rtl:border-l rtl:pl-8 dark:border-gray-700 2xl:block',
        },
        React.createElement(Filters, null)
      ),
      React.createElement(
        'div',
        {
          className: '2xl:ltr:pl-10 2xl:rtl:pr-10 4xl:ltr:pl-12 4xl:rtl:pr-12',
        },
        React.createElement(
          'div',
          { className: 'relative z-10 mb-6 flex items-center justify-between' },
          React.createElement(
            'span',
            {
              className:
                'text-xs font-medium text-gray-900 dark:text-white sm:text-sm',
            },
            '5,686,066 items'
          ),
          React.createElement(
            'div',
            { className: 'flex gap-6 2xl:gap-8' },
            React.createElement(SortList, null),
            React.createElement(
              'div',
              { className: 'hidden 3xl:block' },
              React.createElement(GridSwitcher, null)
            ),
            React.createElement(
              'div',
              { className: 'hidden sm:block 2xl:hidden' },
              React.createElement(
                button_1['default'],
                {
                  shape: 'rounded',
                  size: 'small',
                  color: 'gray',
                  onClick: function () {
                    return openDrawer('DRAWER_SEARCH');
                  },
                  className: 'dark:bg-gray-800',
                },
                'Filters'
              )
            )
          )
        ),
        React.createElement(
          'div',
          {
            className: isGridCompact
              ? 'grid gap-5 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5'
              : 'grid gap-6 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-3 4xl:grid-cols-4',
          },
          currentItems.map(function (nft) {
            return React.createElement(nft_card_1['default'], {
              key: nft.name,
              name: nft.name,
              image: nft.image,
              price: priceFormat,
              number: nft.number,
            });
          })
        )
      ),
      React.createElement(
        'div',
        {
          className:
            'fixed bottom-6 left-1/2 z-10 w-full -translate-x-1/2 px-9 sm:hidden',
        },
        React.createElement(
          button_1['default'],
          {
            onClick: function () {
              return openDrawer('DRAWER_SEARCH');
            },
            fullWidth: true,
          },
          'Filters'
        )
      )
    )
  );
};
SearchPage.getLayout = function getLayout(page) {
  return React.createElement(_dashboard_1['default'], null, page);
};
exports['default'] = SearchPage;
