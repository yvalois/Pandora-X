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
var link_icon_1 = require('@/components/icons/link-icon');
var react_redux_1 = require('react-redux');
var COLUMNS = [
  {
    Header: 'ID',
    accessor: 'Id',
    minWidth: 60,
    maxWidth: 80,
  },
  {
    Header: 'Type',
    accessor: 'Tipo',
    minWidth: 60,
    maxWidth: 80,
  },
  {
    Header: function () {
      return react_1['default'].createElement(
        'div',
        { className: 'ltr:ml-auto rtl:mr-auto' },
        'Date'
      );
    },
    accessor: 'Fecha',
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
        'Asset'
      );
    },
    accessor: 'Asset',
    // @ts-ignore
    Cell: function (_a) {
      var value = _a.cell.value;
      return react_1['default'].createElement(
        'div',
        { className: 'ltr:text-right rtl:text-left' },
        value
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
        'Status'
      );
    },
    accessor: 'Status',
    // @ts-ignore
    Cell: function (_a) {
      var value = _a.cell.value;
      return react_1['default'].createElement(
        'div',
        { className: 'ltr:text-right rtl:text-left' },
        value
      );
    },
    minWidth: 100,
    maxWidth: 180,
  },
  {
    Header: function () {
      return react_1['default'].createElement(
        'div',
        { className: 'ltr:ml-auto rtl:mr-auto' },
        'Address'
      );
    },
    accessor: 'Address',
    // @ts-ignore
    Cell: function (_a) {
      var value = _a.cell.value;
      return react_1['default'].createElement(
        'div',
        { className: 'flex items-center justify-end' },
        react_1['default'].createElement(link_icon_1.LinkIcon, {
          className: 'h-[18px] w-[18px] ltr:mr-2 rtl:ml-2',
        }),
        ' ',
        value
      );
    },
    minWidth: 220,
    maxWidth: 280,
  },
  {
    Header: function () {
      return react_1['default'].createElement(
        'div',
        { className: 'ltr:ml-auto rtl:mr-auto' },
        'Amount'
      );
    },
    accessor: 'Precio',
    // @ts-ignore
    Cell: function (_a) {
      var value = _a.cell.value;
      return react_1['default'].createElement(
        'div',
        { className: '-tracking-[1px] ltr:text-right rtl:text-left' },
        react_1['default'].createElement(
          'strong',
          {
            className:
              'mb-0.5 flex justify-end text-base md:mb-1.5 md:text-lg lg:text-base 3xl:text-2xl',
          },
          value.balance,
          react_1['default'].createElement(
            'span',
            {
              className:
                'inline-block ltr:ml-1.5 rtl:mr-1.5 md:ltr:ml-2 md:rtl:mr-2',
            },
            'USDT'
          )
        ),
        react_1['default'].createElement(
          'span',
          { className: 'text-gray-600 dark:text-gray-400' },
          '$',
          value
        )
      );
    },
    minWidth: 200,
    maxWidth: 300,
  },
];
function TransactionTable() {
  var Transactions = react_redux_1.useSelector(function (state) {
    return state.transaction;
  }).Transactions;
  var orden = function (Data) {
    var orden = Data;
    //alert(orden[0]?.Id)
    for (var i = 1; i < orden.length; i++) {
      var length = orden.length - 1;
      for (var j = length; j >= i; j--) {
        console.log(orden[j].Time);
        if (parseInt(orden[j - 1].Time) < parseInt(orden[j].Time)) {
          var temp = orden[j - 1];
          orden[j - 1] = orden[j];
          orden[j] = temp;
        }
      }
    }
    return orden;
  };
  var data = orden(Transactions);
  //const data = React.useMemo(() => TransactionData, []);
  var columns = react_1['default'].useMemo(function () {
    return COLUMNS;
  }, []);
  var isConnect = react_redux_1.useSelector(function (state) {
    return state.blockchain;
  }).isConnect;
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
  react_1.useEffect(function () {}, [isConnect]);
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
          'Transaction History'
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
exports['default'] = TransactionTable;
