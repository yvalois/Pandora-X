'use strict';
exports.__esModule = true;
var AvatarP_1 = require('@/components/ui/AvatarP');
function AuthorCard(_a) {
  var image = _a.image,
    name = _a.name,
    role = _a.role;
  return React.createElement(
    'div',
    {
      className:
        'flex items-center rounded-lg  ' +
        (name
          ? 'bg-gray-100  p-5  dark:bg-light-dark'
          : 'ml-3 justify-center bg-none p-5 dark:mr-3 dark:bg-none'),
    },
    React.createElement(AvatarP_1['default'], {
      image: image,
      alt: name ? name : '',
      className: 'dark:border-gray-400',
    }),
    React.createElement(
      'div',
      { className: 'ltr:pl-3 rtl:pr-3' },
      React.createElement(
        'h3',
        {
          className:
            'text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white',
        },
        name
      ),
      React.createElement(
        'span',
        { className: 'mt-1 block text-xs text-gray-600 dark:text-gray-400' },
        role
      )
    )
  );
}
exports['default'] = AuthorCard;
