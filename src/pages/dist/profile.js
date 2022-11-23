'use strict';
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
exports.getStaticProps = void 0;
var next_seo_1 = require('next-seo');
var react_1 = require('react');
var use_copy_to_clipboard_1 = require('@/lib/hooks/use-copy-to-clipboard');
var _dashboard_1 = require('@/layouts/_dashboard');
var author_information_1 = require('@/components/author/author-information');
var profile_tab_1 = require('@/components/profile/profile-tab');
var ProfileTabUser_1 = require('@/components/profile/ProfileTabUser');
var link_icon_1 = require('@/components/icons/link-icon');
// static data
var author_1 = require('@/data/static/author');
var react_redux_1 = require('react-redux');
exports.getStaticProps = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [
        2 /*return*/,
        {
          props: {},
        },
      ];
    });
  });
};
var AuthorProfilePage = function () {
  var _a = react_1.useState(false),
    copyButtonStatus = _a[0],
    setCopyButtonStatus = _a[1];
  var _b = use_copy_to_clipboard_1.useCopyToClipboard(),
    _ = _b[0],
    copyToClipboard = _b[1];
  var handleCopyToClipboard = function () {
    copyToClipboard(author_1.authorData.wallet_key);
    setCopyButtonStatus(true);
    setTimeout(function () {
      setCopyButtonStatus(copyButtonStatus);
    }, 2500);
  };
  var Usuario = react_redux_1.useSelector(function (state) {
    return state.Usuario;
  });
  var accountAddress = react_redux_1.useSelector(function (state) {
    return state.blockchain;
  }).accountAddress;
  var _c = react_1.useState(false),
    copiado = _c[0],
    setCopiado = _c[1];
  react_1.useEffect(function () {
    if (
      Usuario.rol !== 'Admin' &&
      Usuario.rol !== 'usuario' &&
      Usuario.rol !== 'cliente'
    ) {
      window.location.href = '/';
    }
  });
  var copiar = function () {
    navigator.clipboard.writeText(
      'http://localhost:3000/principal/' + accountAddress
    );
    setCopiado(true);
  };
  react_1.useEffect(
    function () {
      setTimeout(function () {
        setCopiado(false);
        window.localStorage.removeItem('Wallet');
      }, 2000);
    },
    [copiado]
  );
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(next_seo_1.NextSeo, {
      title: 'Profile',
      description: 'Criptic - React Next Web3 NFT Crypto Dashboard Template',
    }),
    React.createElement(
      'div',
      {
        className:
          'mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12',
      },
      '     ',
      Usuario.rol == 'usuario' &&
        React.createElement(
          'div',
          { className: '' },
          React.createElement(
            'span',
            { className: 'ml-[60px] justify-around row w-full mr-2' },
            'Copiar link de referido'
          ),
          React.createElement(
            'button',
            {
              onClick: function () {
                return copiar();
              },
              className: 'h-[25px] w-[25px] ',
            },
            React.createElement(link_icon_1.LinkIcon, {
              className: 'h-[18px] w-[18px]',
            })
          )
        ),
      React.createElement(
        'div',
        {
          className:
            'flex w-full flex-col pt-4 md:flex-row md:pt-10 lg:flex-row xl:pt-12',
        },
        React.createElement(
          'div',
          {
            className:
              'grow pt-6 pb-9 md:-mt-2.5 md:pt-1.5 md:pb-0 md:ltr:pl-7 md:rtl:pr-7 lg:ltr:pl-10 lg:rtl:pr-10 xl:ltr:pl-14 xl:rtl:pr-14 3xl:ltr:pl-16 3xl:rtl:pr-16',
          },
          Usuario.rol == 'usuario' || Usuario.rol == 'Admin'
            ? React.createElement(ProfileTabUser_1['default'], null)
            : React.createElement(profile_tab_1['default'], null)
        ),
        React.createElement(author_information_1['default'], {
          data: author_1.authorData,
        })
      )
    ),
    copiado &&
      React.createElement(
        'div',
        {
          className:
            'p-4 mb-4 text-sm w-[200px] absolute top-[60px] left-[685px] flex self-center justify-center ml-[60px] mt-[30px] text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800',
          role: 'alert',
        },
        React.createElement(
          'span',
          { className: 'font-medium' },
          'Link copiado'
        )
      )
  );
};
AuthorProfilePage.getLayout = function getLayout(page) {
  return React.createElement(_dashboard_1['default'], null, page);
};
exports['default'] = AuthorProfilePage;
