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
exports.__esModule = true;
var react_1 = require('react');
var react_table_1 = require('react-table');
var button_1 = require('@/components/ui/button');
var scrollbar_1 = require('@/components/ui/scrollbar');
var chevron_down_1 = require('@/components/icons/chevron-down');
var long_arrow_right_1 = require('@/components/icons/long-arrow-right');
var long_arrow_left_1 = require('@/components/icons/long-arrow-left');
var transaction_data_1 = require('@/data/static/transaction-data');
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
          { className: 'focus:shadow-outline  rounded' },
          'withdraw'
        )
      );
    },
    minWidth: 200,
    maxWidth: 300,
  },
];
function StakingTable() {
  var data = react_1['default'].useMemo(function () {
    return transaction_data_1.TransactionData;
  }, []);
  var columns = react_1['default'].useMemo(function () {
    return COLUMNS;
  }, []);
  var _a = react_table_1.useTable(
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
    getTableProps = _a.getTableProps,
    getTableBodyProps = _a.getTableBodyProps,
    canPreviousPage = _a.canPreviousPage,
    canNextPage = _a.canNextPage,
    pageOptions = _a.pageOptions,
    state = _a.state,
    headerGroups = _a.headerGroups,
    page = _a.page,
    nextPage = _a.nextPage,
    previousPage = _a.previousPage,
    prepareRow = _a.prepareRow;
  var pageIndex = state.pageIndex;
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
    )
  );
}
exports['default'] = StakingTable;
