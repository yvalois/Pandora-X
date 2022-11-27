'use strict';
exports.__esModule = true;
exports.Header = void 0;
var react_1 = require('react');
var classnames_1 = require('classnames');
var use_window_scroll_1 = require('@/lib/hooks/use-window-scroll');
var flash_1 = require('@/components/icons/flash');
var hamburger_1 = require('@/components/ui/hamburger');
var active_link_1 = require('@/components/ui/links/active-link');
var button_1 = require('@/components/search/button');
var use_is_mounted_1 = require('@/lib/hooks/use-is-mounted');
var context_1 = require('@/components/drawer-views/context');
// import Sidebar from '@/layouts/dashboard/_sidebar';
var _retro_left_1 = require('@/layouts/sidebar/_retro-left');
var _retro_right_1 = require('@/layouts/sidebar/_retro-right');
var wallet_connect_1 = require('@/components/nft/wallet-connect');
function NotificationButton() {
  return React.createElement(
    active_link_1['default'],
    { href: '/notifications' },
    React.createElement(
      'div',
      {
        className:
          'relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-100 bg-white text-brand shadow-main transition-all hover:-translate-y-0.5 hover:shadow-large focus:-translate-y-0.5 focus:shadow-large focus:outline-none dark:border-gray-700 dark:bg-light-dark dark:text-white sm:h-12 sm:w-12',
      },
      React.createElement(flash_1.FlashIcon, {
        className: 'h-auto w-3 sm:w-auto',
      }),
      React.createElement('span', {
        className:
          'absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-brand shadow-light sm:h-3 sm:w-3',
      })
    )
  );
}
function HeaderRightArea() {
  return React.createElement(
    'div',
    {
      className:
        'relative order-last flex shrink-0 items-center gap-3 sm:gap-6 lg:gap-8',
    },
    React.createElement(NotificationButton, null),
    React.createElement(wallet_connect_1['default'], null)
  );
}
function Header() {
  var openDrawer = context_1.useDrawer().openDrawer;
  var isMounted = use_is_mounted_1.useIsMounted();
  var windowScroll = use_window_scroll_1.useWindowScroll();
  var _a = react_1.useState(false),
    isOpen = _a[0],
    setIsOpen = _a[1];
  return React.createElement(
    'nav',
    {
      className:
        'fixed top-0 z-30 w-full transition-all duration-300 ltr:right-0 rtl:left-0 dark:bg-dark ltr:xl:pl-72 rtl:xl:pr-72 ltr:2xl:pl-80 rtl:2xl:pr-80 ' +
        (isMounted && windowScroll.y > 10
          ? 'h-16 bg-gradient-to-b from-white to-white/80 shadow-card backdrop-blur dark:from-dark dark:to-dark/80 sm:h-20'
          : 'h-16 sm:h-24 '),
    },
    React.createElement(
      'div',
      {
        className:
          'flex h-full items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-4 2xl:px-12',
      },
      React.createElement(
        'div',
        { className: 'flex items-center' },
        React.createElement(
          'div',
          {
            className:
              'block ltr:mr-1 rtl:ml-1 ltr:sm:mr-3 rtl:sm:ml-3 xl:hidden',
          },
          React.createElement(hamburger_1['default'], {
            isOpen: isOpen,
            onClick: function () {
              return openDrawer('DASHBOARD_SIDEBAR');
            },
            variant: 'transparent',
            className: 'dark:text-white',
          })
        ),
        React.createElement(button_1['default'], {
          variant: 'transparent',
          className: 'dark:text-white',
        })
      ),
      React.createElement(
        'div',
        { className: 'block' },
        React.createElement(HeaderRightArea, null)
      )
    )
  );
}
exports.Header = Header;
function Layout(_a) {
  var children = _a.children,
    contentClassName = _a.contentClassName;
  return React.createElement(
    'div',
    { className: 'ltr:xl:px-72 ltr:2xl:px-8' },
    React.createElement(Header, null),
    React.createElement(_retro_left_1['default'], {
      className: 'z-50 hidden xl:block 2xl:w-[350px]',
    }),
    React.createElement(
      'main',
      {
        className: classnames_1['default'](
          'min-h-[100vh] px-4 pt-20 pb-16 sm:px-6 sm:pt-24 sm:pb-20 lg:px-4 xl:pb-24 ltr:xl:px-7 rtl:xl:px-[320px]  ltr:2xl:px-[350px] rtl:2xl:px-[380px]',
          contentClassName
        ),
      },
      children
    ),
    React.createElement(_retro_right_1['default'], {
      className:
        'ltr:right-0 ltr:left-auto rtl:left-0 rtl:right-auto  xl:block',
    })
  );
}
exports['default'] = Layout;
