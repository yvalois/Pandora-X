'use strict';
exports.__esModule = true;
var classnames_1 = require('classnames');
var react_redux_1 = require('react-redux');
function TopupButton(_a) {
  var className = _a.className;
  var nombre = react_redux_1.useSelector(function (state) {
    return state.Usuario;
  }).nombre;
  return React.createElement(
    'button',
    {
      className: classnames_1['default'](
        'flex h-10 w-full items-center whitespace-nowrap rounded-lg border-2 border-dashed border-gray-500 bg-gray-100 px-6 text-sm uppercase tracking-wider text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white lg:h-12 3xl:h-13',
        className
      ),
    },
    React.createElement(
      'span',
      { className: 'mr-3.5 flex-grow text-justify text-xs lg:text-sm' },
      nombre
    )
  );
}
exports['default'] = TopupButton;
