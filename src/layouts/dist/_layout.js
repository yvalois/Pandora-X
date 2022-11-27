'use strict';
exports.__esModule = true;
exports.Header = void 0;
var use_window_scroll_1 = require('@/lib/hooks/use-window-scroll');
var logo_1 = require('@/components/ui/logo');
var flash_1 = require('@/components/icons/flash');
var button_1 = require('@/components/search/button');
var active_link_1 = require('@/components/ui/links/active-link');
var use_breakpoint_1 = require('@/lib/hooks/use-breakpoint');
var use_is_mounted_1 = require('@/lib/hooks/use-is-mounted');
var context_1 = require('@/components/drawer-views/context');
var hamburger_1 = require('@/components/ui/hamburger');
var _layout_menu_1 = require('@/layouts/_layout-menu');
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
  var isMounted = use_is_mounted_1.useIsMounted();
  var breakpoint = use_breakpoint_1.useBreakpoint();
  var _a = context_1.useDrawer(),
    openDrawer = _a.openDrawer,
    isOpen = _a.isOpen;
  return React.createElement(
    'div',
    { className: 'order-last flex shrink-0 items-center' },
    React.createElement(
      'div',
      { className: 'ltr:mr-3.5 rtl:ml-3.5 ltr:sm:mr-5 rtl:sm:ml-5 xl:hidden' },
      React.createElement(button_1['default'], {
        color: 'white',
        className:
          'shadow-main dark:border dark:border-solid dark:border-gray-700 dark:bg-light-dark dark:text-white',
      })
    ),
    React.createElement(
      'div',
      { className: 'hidden gap-3 sm:gap-6 lg:flex lg:gap-8' },
      isMounted &&
        ['xs', 'sm', 'md', 'lg'].indexOf(breakpoint) == -1 &&
        React.createElement(
          'div',
          null,
          React.createElement(button_1['default'], {
            variant: 'transparent',
            className: 'dark:text-white',
          })
        ),
      React.createElement(NotificationButton, null),
      React.createElement(wallet_connect_1['default'], null)
    ),
    React.createElement(
      'div',
      { className: 'flex items-center lg:hidden' },
      React.createElement(NotificationButton, null),
      React.createElement(hamburger_1['default'], {
        isOpen: isOpen,
        onClick: function () {
          return openDrawer('DRAWER_MENU');
        },
        color: 'white',
        className:
          'shadow-main ltr:ml-3.5 rtl:mr-3.5 dark:border dark:border-solid dark:border-gray-700 dark:bg-light-dark dark:text-white ltr:sm:ml-5 rtl:sm:mr-5',
      })
    )
  );
}
function Header() {
  var windowScroll = use_window_scroll_1.useWindowScroll();
  var breakpoint = use_breakpoint_1.useBreakpoint();
  var isMounted = use_is_mounted_1.useIsMounted();
  var _a = context_1.useDrawer(),
    openDrawer = _a.openDrawer,
    isOpen = _a.isOpen;
  return React.createElement(
    'nav',
    {
      className:
        'fixed top-0 z-30 flex w-full items-center justify-between px-4 transition-all duration-300 ltr:right-0 rtl:left-0 sm:px-6 lg:px-8 xl:px-10 3xl:px-12 ' +
        (isMounted && windowScroll.y > 10
          ? 'h-16 bg-gradient-to-b from-white to-white/80 shadow-card backdrop-blur dark:from-dark dark:to-dark/80 sm:h-20'
          : 'h-16 bg-body dark:bg-dark sm:h-24'),
    },
    React.createElement(
      'div',
      { className: 'flex items-center' },
      React.createElement(
        'div',
        { className: 'hidden lg:mr-6 lg:block xl:hidden' },
        React.createElement(hamburger_1['default'], {
          isOpen: isOpen,
          onClick: function () {
            return openDrawer('DRAWER_MENU');
          },
          color: 'white',
          className:
            'shadow-main dark:border dark:border-solid dark:border-gray-700 dark:bg-light-dark dark:text-white',
        })
      ),
      React.createElement(logo_1['default'], null),
      isMounted &&
        ['xs', 'sm', 'md', 'lg'].indexOf(breakpoint) == -1 &&
        React.createElement(_layout_menu_1.MenuItems, null)
    ),
    React.createElement(HeaderRightArea, null)
  );
}
exports.Header = Header;
function Layout(_a) {
  var children = _a.children;
  return React.createElement(
    'div',
    { className: 'bg-light-100 dark:bg-dark-100 flex min-h-screen flex-col' },
    React.createElement(Header, null),
    React.createElement(
      'main',
      { className: 'mb-12 flex flex-grow flex-col pt-16 sm:pt-24' },
      children
    )
  );
}
exports['default'] = Layout;
