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
var react_1 = require('react');
var react_table_1 = require('react-table');
var button_1 = require('@/components/ui/button');
var scrollbar_1 = require('@/components/ui/scrollbar');
var chevron_down_1 = require('@/components/icons/chevron-down');
var long_arrow_right_1 = require('@/components/icons/long-arrow-right');
var long_arrow_left_1 = require('@/components/icons/long-arrow-left');
var transaction_data_1 = require('@/data/static/transaction-data');
var modalWithdraw_1 = require('../modalWithdraw/modalWithdraw');
var context_1 = require('@/components/modal-views/context');
var react_redux_1 = require('react-redux');
function StakingTable() {
  var _this = this;
  var inversionMinter = react_redux_1.useSelector(function (state) {
    return state.blockchain;
  }).inversionMinter;
  var stakings = [];
  var infoStakings = {
    id: 0,
    valor: 'Buy',
    fecha_de_pago: '12 january 2022',
    Apr: 'BTC',
    Balance: 'Pending',
  };
  var _a = react_1.useState(false),
    modal = _a[0],
    setModal = _a[1];
  var _b = context_1.useModal(),
    openModal = _b.openModal,
    closeModal = _b.closeModal;
  var _c = react_1.useState(infoStakings),
    stakes = _c[0],
    setStakes = _c[1];
  var COLUMNS = [
    {
      Header: 'ID',
      accessor: 'id',
      minWidth: 60,
      maxWidth: 80,
    },
    {
      Header: function () {
        return react_1['default'].createElement(
          'div',
          { className: 'ltr:ml-auto rtl:mr-auto' },
          'Valor'
        );
      },
      accessor: 'dateOfPaid',
      // @ts-ignore
      Cell: function (_a) {
        var value = _a.cell.value;
        return react_1['default'].createElement(
          'div',
          { className: 'ltr:text-right rtl:text-left' },
          '$10000'
        );
      },
      minWidth: 35,
      maxWidth: 45,
    },
    {
      Header: function () {
        return react_1['default'].createElement(
          'div',
          { className: 'ltr:ml-auto rtl:mr-auto' },
          'Fecha de pago'
        );
      },
      accessor: 'createdAt',
      // @ts-ignore
      Cell: function (_a) {
        var value = _a.cell.value;
        return react_1['default'].createElement(
          'div',
          { className: 'ltr:text-right rtl:text-left' },
          value
        );
      },
      minWidth: 160,
      maxWidth: 220,
    },
    {
      Header: function () {
        return react_1['default'].createElement(
          'div',
          { className: 'ltr:ml-auto rtl:mr-auto' },
          'Apr'
        );
      },
      accessor: 'symbol',
      // @ts-ignore
      Cell: function (_a) {
        var value = _a.cell.value;
        return react_1['default'].createElement(
          'div',
          { className: 'ltr:text-right rtl:text-left' },
          '10%'
        );
      },
      minWidth: 80,
      maxWidth: 120,
    },
    {
      Header: function () {
        return react_1['default'].createElement(
          'div',
          { className: 'ltr:ml-auto rtl:mr-auto' },
          'Balance'
        );
      },
      accessor: 'status',
      // @ts-ignore
      Cell: function (_a) {
        var value = _a.cell.value;
        return react_1['default'].createElement(
          'div',
          { className: 'ltr:text-right rtl:text-left' },
          '$250'
        );
      },
      minWidth: 100,
      maxWidth: 180,
    },
    {
      Header: function () {
        return react_1['default'].createElement('div', {
          className: 'ltr:ml-auto rtl:mr-auto',
        });
      },
      accessor: 'claim Reward',
      // @ts-ignore
      Cell: function (_a) {
        var value = _a.cell.value;
        return react_1['default'].createElement(
          'div',
          { className: 'flex items-center justify-end' },
          react_1['default'].createElement(
            button_1['default'],
            { className: 'focus:shadow-outline  rounded' },
            'Claim Reward'
          )
        );
      },
      minWidth: 220,
      maxWidth: 280,
    },
    {
      Header: function () {
        return react_1['default'].createElement('div', {
          className: 'ltr:ml-auto rtl:mr-auto',
        });
      },
      accessor: 'withdraw',
      // @ts-ignore
      Cell: function (_a) {
        var value = _a.cell.value;
        return react_1['default'].createElement(
          'div',
          { className: '-tracking-[1px] ltr:text-right rtl:text-left' },
          react_1['default'].createElement(
            button_1['default'],
            {
              onClick: function () {
                return openModal('WITHDRAW_VIEW');
              },
              className: 'focus:shadow-outline  rounded',
            },
            'withdraw'
          )
        );
      },
      minWidth: 200,
      maxWidth: 300,
    },
  ];
  var data = react_1['default'].useMemo(function () {
    return transaction_data_1.TransactionData;
  }, []);
  var columns = react_1['default'].useMemo(function () {
    return COLUMNS;
  }, []);
  var _d = react_table_1.useTable(
      {
        // @ts-ignore
        columns: columns,
        data: data,
        initialState: { pageSize: 5 },
      },
      react_table_1.useSortBy,
      react_table_1.useResizeColumns,
      react_table_1.useFlexLayout,
      react_table_1.usePagination
    ),
    getTableProps = _d.getTableProps,
    getTableBodyProps = _d.getTableBodyProps,
    canPreviousPage = _d.canPreviousPage,
    canNextPage = _d.canNextPage,
    pageOptions = _d.pageOptions,
    state = _d.state,
    headerGroups = _d.headerGroups,
    page = _d.page,
    nextPage = _d.nextPage,
    previousPage = _d.previousPage,
    prepareRow = _d.prepareRow;
  var pageIndex = state.pageIndex;
  var setStakings = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var count, i, _loop_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, inversionMinter.getCountOfStaking()];
          case 1:
            count = _a.sent();
            _loop_1 = function () {
              var id, valor, indice, fecha, apr;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [4 /*yield*/, inversionMinter.getId(i + 1)];
                  case 1:
                    id = _a.sent();
                    return [4 /*yield*/, inversionMinter.getPrice(id)];
                  case 2:
                    valor = _a.sent();
                    return [4 /*yield*/, inversionMinter.getIndice(i + 1)];
                  case 3:
                    indice = _a.sent();
                    return [4 /*yield*/, inversionMinter.getDate(indice)];
                  case 4:
                    fecha = _a.sent();
                    return [4 /*yield*/, inversionMinter.getApr()];
                  case 5:
                    apr = _a.sent();
                    //const valor1 =  await inversionMinter.
                    //const balance =;
                    setStakes(function (prevState) {
                      return __assign(__assign({}, prevState), { id: id });
                    });
                    setStakes(function (prevState) {
                      return __assign(__assign({}, prevState), {
                        valor: valor,
                      });
                    });
                    setStakes(function (prevState) {
                      return __assign(__assign({}, prevState), {
                        fecha: fecha,
                      });
                    });
                    setStakes(function (prevState) {
                      return __assign(__assign({}, prevState), { apr: apr });
                    });
                    //setStakes((prevState) => ({ ...prevState, id: id }));
                    stakings.push(stakes);
                    setStakes(infoStakings);
                    return [2 /*return*/];
                }
              });
            };
            i = 0;
            _a.label = 2;
          case 2:
            if (!(i < count)) return [3 /*break*/, 5];
            return [5 /*yield**/, _loop_1()];
          case 3:
            _a.sent();
            _a.label = 4;
          case 4:
            i++;
            return [3 /*break*/, 2];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  return react_1['default'].createElement(
    'div',
    { className: '' },
    react_1['default'].createElement(
      'div',
      {
        className:
          'rounded-tl-lg rounded-tr-lg bg-white px-4 pt-6 dark:bg-light-dark md:px-8 md:pt-8',
      },
      react_1['default'].createElement(
        'div',
        {
          className:
            'flex flex-col items-center justify-between border-b border-dashed border-gray-200 pb-5 dark:border-gray-700 md:flex-row',
        },
        react_1['default'].createElement(
          'h2',
          {
            className:
              'mb-3 shrink-0 text-lg font-medium uppercase text-black dark:text-white sm:text-xl md:mb-0 md:text-2xl',
          },
          'Staking'
        )
      )
    ),
    react_1['default'].createElement(
      'div',
      { className: '-mx-0.5' },
      react_1['default'].createElement(
        scrollbar_1['default'],
        { style: { width: '100%' }, autoHide: 'never' },
        react_1['default'].createElement(
          'div',
          { className: 'px-0.5' },
          react_1['default'].createElement(
            'table',
            __assign({}, getTableProps(), {
              className: 'transaction-table w-full border-separate border-0',
            }),
            react_1['default'].createElement(
              'thead',
              { className: 'text-sm text-gray-500 dark:text-gray-300' },
              headerGroups.map(function (headerGroup, idx) {
                return react_1['default'].createElement(
                  'tr',
                  __assign({}, headerGroup.getHeaderGroupProps(), { key: idx }),
                  headerGroup.headers.map(function (column, idx) {
                    return react_1['default'].createElement(
                      'th',
                      __assign(
                        {},
                        column.getHeaderProps(column.getSortByToggleProps()),
                        {
                          key: idx,
                          className:
                            'group  bg-white px-2 py-5 font-normal first:rounded-bl-lg last:rounded-br-lg ltr:first:pl-8 ltr:last:pr-8 rtl:first:pr-8 rtl:last:pl-8 dark:bg-light-dark md:px-4',
                        }
                      ),
                      react_1['default'].createElement(
                        'div',
                        { className: 'flex items-center' },
                        column.render('Header'),
                        column.canResize &&
                          react_1['default'].createElement(
                            'div',
                            __assign({}, column.getResizerProps(), {
                              className:
                                'resizer ' +
                                (column.isResizing ? 'isResizing' : ''),
                            })
                          ),
                        react_1['default'].createElement(
                          'span',
                          { className: 'ltr:ml-1 rtl:mr-1' },
                          column.isSorted
                            ? column.isSortedDesc
                              ? react_1['default'].createElement(
                                  chevron_down_1.ChevronDown,
                                  null
                                )
                              : react_1['default'].createElement(
                                  chevron_down_1.ChevronDown,
                                  { className: 'rotate-180' }
                                )
                            : react_1['default'].createElement(
                                chevron_down_1.ChevronDown,
                                {
                                  className:
                                    'rotate-180 opacity-0 transition group-hover:opacity-50',
                                }
                              )
                        )
                      )
                    );
                  })
                );
              })
            ),
            react_1['default'].createElement(
              'tbody',
              __assign({}, getTableBodyProps(), {
                className:
                  'text-xs font-medium text-gray-900 dark:text-white 3xl:text-sm',
              }),
              page.map(function (row, idx) {
                prepareRow(row);
                return react_1['default'].createElement(
                  'tr',
                  __assign({}, row.getRowProps(), {
                    key: idx,
                    className:
                      'mb-3 items-center rounded-lg bg-white uppercase shadow-card last:mb-0 dark:bg-light-dark',
                  }),
                  row.cells.map(function (cell, idx) {
                    return react_1['default'].createElement(
                      'td',
                      __assign({}, cell.getCellProps(), {
                        key: idx,
                        className:
                          'px-2 py-4 tracking-[1px] ltr:first:pl-4 ltr:last:pr-4 rtl:first:pr-8 rtl:last:pl-8 md:px-4 md:py-6 md:ltr:first:pl-8 md:ltr:last:pr-8 3xl:py-5',
                      }),
                      cell.render('Cell')
                    );
                  })
                );
              })
            )
          )
        )
      )
    ),
    react_1['default'].createElement(
      'div',
      {
        className:
          'mt-3 flex items-center justify-center rounded-lg bg-white px-5 py-4 text-sm shadow-card dark:bg-light-dark lg:py-6',
      },
      react_1['default'].createElement(
        'div',
        { className: 'flex items-center gap-5' },
        react_1['default'].createElement(
          button_1['default'],
          {
            onClick: function () {
              return previousPage();
            },
            disabled: !canPreviousPage,
            title: 'Previous',
            shape: 'circle',
            variant: 'transparent',
            size: 'small',
            className:
              'text-gray-700 disabled:text-gray-400 dark:text-white disabled:dark:text-gray-400',
          },
          react_1['default'].createElement(long_arrow_left_1.LongArrowLeft, {
            className: 'h-auto w-4 rtl:rotate-180',
          })
        ),
        react_1['default'].createElement(
          'div',
          null,
          'Page',
          ' ',
          react_1['default'].createElement(
            'strong',
            { className: 'font-semibold' },
            pageIndex + 1,
            ' of ',
            pageOptions.length
          ),
          ' '
        ),
        react_1['default'].createElement(
          button_1['default'],
          {
            onClick: function () {
              return nextPage();
            },
            disabled: !canNextPage,
            title: 'Next',
            shape: 'circle',
            variant: 'transparent',
            size: 'small',
            className:
              'text-gray-700 disabled:text-gray-400 dark:text-white disabled:dark:text-gray-400',
          },
          react_1['default'].createElement(long_arrow_right_1.LongArrowRight, {
            className: 'h-auto w-4 rtl:rotate-180 ',
          })
        )
      )
    ),
    modal && react_1['default'].createElement(modalWithdraw_1['default'], null)
  );
}
exports['default'] = StakingTable;
