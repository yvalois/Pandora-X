'use strict';
exports.__esModule = true;
exports.collectionList = void 0;
var react_1 = require('react');
var search_1 = require('@/components/icons/search');
var avatar_1 = require('@/components/ui/avatar');
var collection_1_jpg_1 = require('@/assets/images/collection/collection-1.jpg');
var collection_2_jpg_1 = require('@/assets/images/collection/collection-2.jpg');
var collection_3_jpg_1 = require('@/assets/images/collection/collection-3.jpg');
var anchor_link_1 = require('./links/anchor-link');
exports.collectionList = [
  {
    icon: collection_1_jpg_1['default'],
    name: 'Productos',
    value: 'productos',
  },
  {
    icon: collection_2_jpg_1['default'],
    name: 'Inversion',
    value: 'inversiones ',
  },
  {
    icon: collection_3_jpg_1['default'],
    name: 'profile pictures',
    value: 'profile pictures',
  },
];
function CollectionSelect(_a) {
  var onSelect = _a.onSelect;
  var _b = react_1.useState(''),
    link = _b[0],
    setLink = _b[1];
  var _c = react_1.useState(''),
    searchKeyword = _c[0],
    setSearchKeyword = _c[1];
  var coinListData = exports.collectionList;
  if (searchKeyword.length > 0) {
    coinListData = exports.collectionList.filter(function (item) {
      var name = item.name;
      return (
        name.match(searchKeyword) ||
        (name.toLowerCase().match(searchKeyword) && name)
      );
    });
  }
  function handleSelectedCoin(value) {
    onSelect(value);
  }
  react_1.useEffect(function () {
    var aux = window.location.href;
    var a = aux.split('profile');
    var e = a[0];
    setLink(e);
  }, []);
  return React.createElement(
    'div',
    {
      className:
        'w-full rounded-lg bg-white text-sm shadow-large dark:bg-light-dark',
    },
    React.createElement(
      'div',
      { className: 'relative' },
      React.createElement(search_1.SearchIcon, {
        className: 'absolute left-6 h-full text-gray-700 dark:text-white',
      }),
      React.createElement('input', {
        type: 'search',
        autoFocus: true,
        onChange: function (e) {
          return setSearchKeyword(e.target.value);
        },
        placeholder: 'Search...',
        className:
          'w-full border-x-0 border-b border-dashed border-gray-200 py-3.5 pl-14 pr-6 text-sm focus:border-gray-300 focus:ring-0 dark:border-gray-600 dark:bg-light-dark dark:text-white dark:focus:border-gray-500',
      })
    ),
    React.createElement(
      'ul',
      { role: 'listbox', className: 'py-3' },
      coinListData.length > 0
        ? coinListData.map(function (item, index) {
            return React.createElement(
              anchor_link_1['default'],
              {
                href: link + '?view=' + item.value,
                key: index,
                className: 'w-full',
              },
              React.createElement(
                'li',
                {
                  role: 'listitem',
                  tabIndex: index,
                  onClick: function () {
                    return handleSelectedCoin(item.value);
                  },
                  className:
                    'mb-1 flex cursor-pointer items-center gap-3 py-1.5 px-6 outline-none hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-600',
                },
                React.createElement(avatar_1['default'], {
                  image: item.icon,
                  size: 'xs',
                  alt: item.name,
                }),
                React.createElement(
                  'span',
                  {
                    className:
                      'text-sm tracking-tight text-gray-600 dark:text-white',
                  },
                  item.name
                )
              )
            );
          })
        : // FIXME: need coin not found svg from designer
          React.createElement(
            'li',
            { className: 'px-6 py-5 text-center' },
            React.createElement(
              'h3',
              { className: 'mb-2 text-sm text-gray-600 dark:text-white' },
              'Ops! not found'
            )
          )
    )
  );
}
exports['default'] = CollectionSelect;
