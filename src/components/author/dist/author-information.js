'use strict';
exports.__esModule = true;
function AuthorInformation(_a) {
  var _b = _a.className,
    className = _b === void 0 ? 'md:hidden' : _b,
    data = _a.data;
  return React.createElement(
    'div',
    { className: '' + className },
    React.createElement(
      'div',
      {
        className:
          'border-y border-dashed border-gray-200 py-5 dark:border-gray-700 xl:py-6',
      },
      React.createElement(
        'div',
        {
          className:
            'mb-2 text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white',
        },
        'Biografia'
      ),
      React.createElement(
        'div',
        {
          className:
            'text-sm leading-6 tracking-tighter text-gray-600 dark:text-gray-400',
        },
        data === null || data === void 0 ? void 0 : data.bio
      )
    )
  );
}
exports['default'] = AuthorInformation;
