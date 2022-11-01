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
var head_1 = require('next/head');
var react_query_1 = require('react-query');
var devtools_1 = require('react-query/devtools');
var next_themes_1 = require('next-themes');
var container_1 = require('@/components/modal-views/container');
var container_2 = require('@/components/drawer-views/container');
var settings_button_1 = require('@/components/settings/settings-button');
var settings_drawer_1 = require('@/components/settings/settings-drawer');
var use_connect_1 = require('@/lib/hooks/use-connect');
require('overlayscrollbars/css/OverlayScrollbars.css');
// base css file
require('swiper/css');
require('@/assets/css/scrollbar.css');
require('@/assets/css/globals.css');
require('@/assets/css/range-slider.css');
var react_redux_1 = require('react-redux');
var store_1 = require('@/redux/store');
function CustomApp(_a) {
  var _b;
  var Component = _a.Component,
    pageProps = _a.pageProps;
  var queryClient = react_1.useState(function () {
    return new react_query_1.QueryClient();
  })[0];
  var getLayout =
    (_b = Component.getLayout) !== null && _b !== void 0
      ? _b
      : function (page) {
          return page;
        };
  //could remove this if you don't need to page level layout
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      head_1['default'],
      null,
      React.createElement('meta', {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1 maximum-scale=1',
      })
    ),
    React.createElement(
      react_redux_1.Provider,
      { store: store_1['default'] },
      React.createElement(
        react_query_1.QueryClientProvider,
        { client: queryClient },
        React.createElement(
          react_query_1.Hydrate,
          { state: pageProps.dehydratedState },
          React.createElement(
            next_themes_1.ThemeProvider,
            { attribute: 'class', enableSystem: false, defaultTheme: 'light' },
            React.createElement(
              use_connect_1.WalletProvider,
              null,
              getLayout(
                React.createElement(Component, __assign({}, pageProps))
              ),
              React.createElement(settings_button_1['default'], null),
              React.createElement(settings_drawer_1['default'], null),
              React.createElement(container_1['default'], null),
              React.createElement(container_2['default'], null)
            )
          )
        ),
        React.createElement(devtools_1.ReactQueryDevtools, {
          initialIsOpen: false,
          position: 'bottom-right',
        })
      )
    )
  );
}
exports['default'] = CustomApp;
