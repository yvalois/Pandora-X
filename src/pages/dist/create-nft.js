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
var react_1 = require('react');
var transition_1 = require('@/components/ui/transition');
var _dashboard_1 = require('@/layouts/_dashboard');
var radio_group_1 = require('@/components/ui/radio-group');
var listbox_1 = require('@/components/ui/listbox');
var image_1 = require('@/components/ui/image');
var button_1 = require('@/components/ui/button');
var input_1 = require('@/components/ui/forms/input');
var textarea_1 = require('@/components/ui/forms/textarea');
var input_label_1 = require('@/components/ui/input-label');
var tag_icon_1 = require('@/components/icons/tag-icon');
var loop_icon_1 = require('@/components/icons/loop-icon');
var sand_clock_1 = require('@/components/icons/sand-clock');
var chevron_down_1 = require('@/components/icons/chevron-down');
var react_redux_1 = require('react-redux');
var PriceOptions = [
  {
    name: 'Fixed price',
    value: 'fixed',
    icon: React.createElement(tag_icon_1.TagIcon, {
      className: 'h-5 w-5 sm:h-auto sm:w-auto',
    }),
  },
  {
    name: 'Open for bids',
    value: 'bids',
    icon: React.createElement(loop_icon_1.LoopIcon, {
      className: 'h-5 w-5 sm:h-auto sm:w-auto',
    }),
  },
  {
    name: 'Timed auction',
    value: 'auction',
    icon: React.createElement(sand_clock_1.SandClock, {
      className: 'h-5 w-5 sm:h-auto sm:w-auto',
    }),
  },
];
var NftsOptions = [
  {
    id: 1,
    name: 'Productos',
    value: 'productos',
  },
  {
    id: 2,
    name: 'Inversion',
    value: 'inversion',
  },
];
function PriceType(_a) {
  var value = _a.value,
    onChange = _a.onChange;
  return React.createElement(
    radio_group_1.RadioGroup,
    { value: value, onChange: onChange, className: 'grid grid-cols-3 gap-3' },
    PriceOptions.map(function (item, index) {
      return React.createElement(
        radio_group_1.RadioGroup.Option,
        { value: item.value, key: index },
        function (_a) {
          var checked = _a.checked;
          return React.createElement(
            'span',
            {
              className:
                'relative flex cursor-pointer items-center justify-center rounded-lg border-2 border-solid bg-white text-center text-sm font-medium tracking-wider shadow-card transition-all hover:shadow-large dark:bg-light-dark ' +
                (checked
                  ? 'border-brand'
                  : 'border-white dark:border-light-dark'),
            },
            React.createElement(
              'span',
              {
                className:
                  'relative flex h-28 flex-col items-center justify-center gap-3 px-2 text-center text-xs uppercase sm:h-36 sm:gap-4 sm:text-sm',
              },
              item.icon,
              item.name
            )
          );
        }
      );
    })
  );
}
var CreateNFTPage = function () {
  var numero = 1000000; //cambiar
  //let [publish, setPublish] = useState(true);
  //let [explicit, setExplicit] = useState(false);
  //let [unlocked, setUnlocked] = useState(false);
  //let [priceType, setPriceType] = useState('fixed');
  var dispatch = react_redux_1.useDispatch();
  var _a = react_1.useState('PandoraX'),
    nombre = _a[0],
    setNombre = _a[1];
  var _b = react_1.useState(
      'https://gateway.pinata.cloud/ipfs/QmZWEA9aiEE4E1iWwS5KGU8mVhGhNESrueGArXsHBjZgoE'
    ),
    url = _b[0],
    setUrl = _b[1];
  var _c = react_1.useState('NFts Products'),
    descripcion = _c[0],
    setDescripcion = _c[1];
  var _d = react_1.useState(0),
    supply = _d[0],
    setSupply = _d[1];
  var _e = react_1.useState(NftsOptions[0]),
    tipo = _e[0],
    setTipo = _e[1];
  var _f = react_redux_1.useSelector(function (state) {
      return state.blockchain;
    }),
    productoMinter = _f.productoMinter,
    inversionMinter = _f.inversionMinter,
    isConnect = _f.isConnect,
    accountAddress = _f.accountAddress,
    usdtContract = _f.usdtContract,
    tokenContract = _f.tokenContract;
  var Usuario = react_redux_1.useSelector(function (state) {
    return state.Usuario;
  });
  var Inversiones = 0;
  var Productos = 0;
  var getProductos = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        fetch('https://pandoraxapi1.herokuapp.com/api}/getProducto', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (response) {
            Productos = response.length;
          })
          ['catch'](function (error) {
            return console.error('Error:', error);
          });
        return [2 /*return*/];
      });
    });
  };
  var getInversiones = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        fetch('https://pandoraxapi1.herokuapp.com/api}/getInversion', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (response) {
            Inversiones = response.length;
          })
          ['catch'](function (error) {
            return console.error('Error:', error);
          });
        return [2 /*return*/];
      });
    });
  };
  var CrearProducto = function (objeto) {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        fetch('https://pandoraxapi1.herokuapp.com/api}/CrearNftProducto', {
          method: 'POST',
          body: JSON.stringify(objeto),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(function (res) {
            return res.json();
          })
          .then(function () {})
          ['catch'](function (error) {
            return console.error('Error:', error);
          });
        return [2 /*return*/];
      });
    });
  };
  var CrearInversion = function (objeto) {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        fetch('https://pandoraxapi1.herokuapp.com/api}/CrearNftInversion', {
          method: 'POST',
          body: JSON.stringify(objeto),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(function (res) {
            return res.json();
          })
          .then(function () {})
          ['catch'](function (error) {
            return console.error('Error:', error);
          });
        return [2 /*return*/];
      });
    });
  };
  var createNFTs = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var i, NFT, i, NFT;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            alert(Productos);
            if (!(tipo.value == 'productos')) return [3 /*break*/, 5];
            i = void 0;
            productoMinter.Mint(supply);
            i = 0;
            _a.label = 1;
          case 1:
            if (!(i < supply)) return [3 /*break*/, 4];
            NFT = {
              name: nombre + ' #' + (Productos + i + 1),
              description: descripcion,
              image: url,
              dna: Productos + i,
              edition: Productos + i,
              number: Productos + i,
            };
            return [4 /*yield*/, CrearProducto(NFT)];
          case 2:
            _a.sent();
            _a.label = 3;
          case 3:
            i++;
            return [3 /*break*/, 1];
          case 4:
            return [3 /*break*/, 9];
          case 5:
            if (!(tipo.value === 'inversion')) return [3 /*break*/, 9];
            i = void 0;
            inversionMinter.Mint(supply);
            i = 1;
            _a.label = 6;
          case 6:
            if (!(i < supply)) return [3 /*break*/, 9];
            NFT = {
              name: nombre + ' #' + (Inversiones + i + 1),
              description: descripcion,
              image: url,
              dna: Inversiones + i,
              edition: Inversiones + i,
              number: Inversiones + i,
            };
            return [4 /*yield*/, CrearInversion(NFT)];
          case 7:
            _a.sent();
            _a.label = 8;
          case 8:
            i++;
            return [3 /*break*/, 6];
          case 9:
            return [2 /*return*/];
        }
      });
    });
  };
  react_1.useEffect(function () {
    if (Usuario.rol !== 'Admin') {
      window.location.href = '/';
    }
    getInversiones();
    getProductos();
  });
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'div',
      {
        className:
          'mx-auto w-full px-4 pt-8 pb-14 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8 xl:px-10 2xl:px-0',
      },
      React.createElement(
        'h2',
        {
          className:
            'mb-6 text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:mb-10 sm:text-2xl',
        },
        'Create New Item'
      ),
      React.createElement(
        'div',
        { className: 'mb-8 grid grid-cols-1 gap-12 lg:grid-cols-3' },
        React.createElement(
          'div',
          { className: 'lg:col-span-2' },
          React.createElement(
            'div',
            { className: 'mb-8' },
            React.createElement(input_label_1['default'], {
              title: 'Name',
              important: true,
            }),
            React.createElement(input_1['default'], {
              type: 'text',
              placeholder: 'Item name',
              onChange: function (e) {
                return setNombre(e.target.value);
              },
              value: nombre,
            })
          ),
          React.createElement(
            'div',
            { className: 'mb-8' },
            React.createElement(input_label_1['default'], {
              title: 'URL imagen',
            }),
            React.createElement(input_1['default'], {
              type: 'text',
              placeholder: 'https://yourimage.io/item/123',
              onChange: function (e) {
                return setUrl(e.target.value);
              },
              value: url,
            })
          ),
          React.createElement(
            'div',
            { className: 'mb-8' },
            React.createElement(input_label_1['default'], {
              title: 'Description',
              subTitle:
                "The description will be included on the item's detail page underneath its image.",
            }),
            React.createElement(textarea_1['default'], {
              placeholder: 'Provide a detailed description of your item',
              onChange: function (e) {
                return setDescripcion(e.target.value);
              },
              value: descripcion,
            })
          ),
          React.createElement(
            'div',
            { className: 'mb-8' },
            React.createElement(input_label_1['default'], {
              title: 'Supply',
              subTitle: 'The number of items that can be minted.',
            }),
            React.createElement(input_1['default'], {
              type: 'number',
              placeholder: '1',
              onChange: function (e) {
                return setSupply(e.target.value);
              },
              value: supply,
            }),
            React.createElement(
              'div',
              { className: 'mb-8' },
              React.createElement(input_label_1['default'], { title: 'Tipo' }),
              React.createElement(
                'div',
                { className: 'relative' },
                React.createElement(
                  listbox_1.Listbox,
                  { value: tipo, onChange: setTipo },
                  React.createElement(
                    listbox_1.Listbox.Button,
                    {
                      className:
                        'text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5',
                    },
                    React.createElement(
                      'div',
                      { className: 'flex items-center' },
                      tipo.name
                    ),
                    React.createElement(chevron_down_1.ChevronDown, null)
                  ),
                  React.createElement(
                    transition_1.Transition,
                    {
                      leave: 'transition ease-in duration-100',
                      leaveFrom: 'opacity-100',
                      leaveTo: 'opacity-0',
                    },
                    React.createElement(
                      listbox_1.Listbox.Options,
                      {
                        className:
                          'absolute left-0 z-10 mt-1 grid w-full origin-top-right gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-gray-700 dark:bg-gray-800 xs:p-2',
                      },
                      NftsOptions.map(function (option) {
                        return React.createElement(
                          listbox_1.Listbox.Option,
                          { key: option.id, value: option },
                          function (_a) {
                            var selected = _a.selected;
                            return React.createElement(
                              'div',
                              {
                                className:
                                  'flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100  ' +
                                  (selected
                                    ? 'bg-gray-200/70 font-medium dark:bg-gray-600/60'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-700/70'),
                              },
                              React.createElement(
                                'span',
                                { className: 'ltr:mr-2 rtl:ml-2' },
                                option.icon
                              ),
                              option.name
                            );
                          }
                        );
                      })
                    )
                  )
                )
              )
            ),
            React.createElement(
              button_1['default'],
              {
                shape: 'rounded',
                onClick: function () {
                  return createNFTs();
                },
              },
              'CREATE'
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'hidden flex-col lg:flex' },
          React.createElement(input_label_1['default'], { title: 'Preview' }),
          React.createElement(
            'div',
            {
              className:
                'relative flex flex-grow flex-col overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark',
            },
            React.createElement(
              'div',
              { className: 'relative block w-full pb-full' },
              React.createElement(
                image_1['default'],
                //src={NFT1}
                {
                  //src={NFT1}
                  src: url,
                  //placeholder="blur"
                  layout: 'fill',
                  objectFit: 'cover',
                  alt: 'Pulses of Imagination #214',
                }
              )
            ),
            React.createElement(
              'div',
              { className: 'p-5' },
              React.createElement(
                'div',
                { className: 'text-sm font-medium text-black dark:text-white' },
                nombre
              ),
              React.createElement(
                'div',
                {
                  className:
                    'mt-4 text-lg font-medium text-gray-900 dark:text-white',
                },
                '1.30 USDT'
              )
            )
          )
        )
      )
    )
  );
};
CreateNFTPage.getLayout = function getLayout(page) {
  return React.createElement(_dashboard_1['default'], null, page);
};
exports['default'] = CreateNFTPage;
