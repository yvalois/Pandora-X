'use strict';

var __makeTemplateObject =
  (void 0 && (void 0).__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, 'raw', {
        value: raw,
      });
    } else {
      cooked.raw = raw;
    }

    return cooked;
  };

var __awaiter =
  (void 0 && (void 0).__awaiter) ||
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
  (void 0 && (void 0).__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function sent() {
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
      (g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2),
      }),
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

      while (_) {
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
              return {
                value: op[1],
                done: false,
              };

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
      }

      if (op[0] & 5) throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true,
      };
    }
  };

exports.__esModule = true;
exports.getStaticProps = void 0;

var react_1 = require('react');

var jotai_1 = require('jotai');

var next_seo_1 = require('next-seo');

var _dashboard_1 = require('@/layouts/_dashboard');

var context_1 = require('@/components/drawer-views/context');

var button_1 = require('@/components/ui/button');

var react_redux_1 = require('react-redux');

var MintedAction_1 = require('../redux/Minted/MintedAction');

var param_tab_1 = require('@/components/ui/param-tab');

var image_1 = require('@/components/ui/image');

var styled_components_1 = require('styled-components');

var active_link_1 = require('@/components/ui/links/active-link');

var gridCompactViewAtom = jotai_1.atom(false);

function useGridSwitcher() {
  var _a = jotai_1.useAtom(gridCompactViewAtom),
    isGridCompact = _a[0],
    setIsGridCompact = _a[1];

  return {
    isGridCompact: isGridCompact,
    setIsGridCompact: setIsGridCompact,
  };
}

var productos = [
  {
    Nombre: 'Pandora X NFT - Podcast-Streaming',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Podcast-Streaming%20%282%29.gif',
    precio: 13,
    tipo: 'PS',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    Nombre: 'Pandora X NFT - Podcast-Academia',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Podcast-Academia%20%281%29.gif',
    precio: 13,
    tipo: 'PA',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    Nombre: 'Pandora X NFT - NFT Studio',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20NFT%20Studio%20%282%29.gif',
    precio: 13,
    tipo: 'NS',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    Nombre: 'Pandora X NFT - Investing Value',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Investing%20Value%20%282%29.gif',
    precio: 13,
    tipo: 'IV',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    Nombre: 'Pandora X NFT - Comunidad Privada',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Comunidad%20Privada.gif',
    precio: 13,
    tipo: 'CP',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    Nombre: 'Pandora X NFT - Comunidad Gratuita',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Comunidad%20Gratuita.gif',
    precio: 13,
    tipo: 'CG',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    Nombre: 'Pandora X NFT - Coaching',
    precio: 13,
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Coaching.gif',
    tipo: 'NC',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    Nombre: 'Pandora X NFT - Alpha Report',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Alpha%20Report.gif',
    precio: 13,
    tipo: 'AP',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
];
var inversion = [
  {
    Nombre: 'UBX Card 100',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%20100.gif',
    precio: 13,
    tipo: '100',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    Nombre: 'UBX Card 1K',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%201k%20%281%29.gif',
    precio: 13,
    tipo: '1K',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    Nombre: 'UBX Card 5K',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%205k.gif',
    precio: 13,
    tipo: '5K',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    Nombre: 'UBX Card 10K',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%2010k.gif',
    precio: 13,
    tipo: '10K',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    Nombre: 'UBX Card 20K',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%2020k.gif',
    precio: 13,
    tipo: '20K',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    Nombre: 'UBX Card 50K',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%2050k.gif',
    precio: 13,
    tipo: '50K',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    Nombre: 'UBX Card 100K',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%20100k.gif',
    precio: 13,
    tipo: '100K',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
];

exports.getStaticProps = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [
        2,
        /*return*/
        {
          props: {},
        },
      ];
    });
  });
};

var Button = styled_components_1['default'].button(
  templateObject_1 ||
    (templateObject_1 = __makeTemplateObject(
      [
        '\nbackground: #000;\nborder: none;\nborder-radius: 10px;\ncolor: #fff;\nfont-size: 14px;\nfont-weight: 600;\npadding: 5px 20px;\ntext-transform: uppercase;\ntransition: all 0.1s ease-in-out;\ncursor: pointer;\n&:hover {\n  background: #fff;\n  color: #000;\n}\n',
      ],
      [
        '\nbackground: #000;\nborder: none;\nborder-radius: 10px;\ncolor: #fff;\nfont-size: 14px;\nfont-weight: 600;\npadding: 5px 20px;\ntext-transform: uppercase;\ntransition: all 0.1s ease-in-out;\ncursor: pointer;\n&:hover {\n  background: #fff;\n  color: #000;\n}\n',
      ]
    ))
);

var SearchPage = function SearchPage() {
  var pricesP = [];
  var pricesI = [];
  var isGridCompact = useGridSwitcher().isGridCompact;
  var openDrawer = context_1.useDrawer().openDrawer;
  var dispatch = react_redux_1.useDispatch();

  var _a = react_1.useState([]),
    currentItems = _a[0],
    setCurrentItems = _a[1];

  var _b = react_1.useState([]),
    currentInv = _b[0],
    setCurrentInv = _b[1];

  var _c = react_redux_1.useSelector(function (state) {
      return state.minted;
    }),
    dataloaded = _c.dataloaded,
    disponibleNftp = _c.disponibleNftp,
    disponibleNfti = _c.disponibleNfti,
    priceFormat = _c.priceFormat,
    MintedNft = _c.MintedNft;

  var _d = react_redux_1.useSelector(function (state) {
      return state.blockchain;
    }),
    productoMinter = _d.productoMinter,
    inversionMinter = _d.inversionMinter,
    isConnect = _d.isConnect,
    accountAddress = _d.accountAddress,
    usdtContract = _d.usdtContract,
    tokenContract = _d.tokenContract;

  var getNft = function getNft() {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4,
              /*yield*/
              dispatch(MintedAction_1.getMintedNftProducts()),
            ];

          case 1:
            _a.sent();

            return [
              2,
              /*return*/
            ];
        }
      });
    });
  };

  var more = function more(tipo) {
    window.location.href = '/details/' + tipo;
  };

  react_1.useEffect(
    function () {
      var fetchItems = function fetchItems() {
        return __awaiter(void 0, void 0, void 0, function () {
          return __generator(this, function (_a) {
            getNft(); //const itemsPerPage = 6
            //const start = (currentPage - 1) * itemsPerPage

            setCurrentItems(disponibleNftp);
            setCurrentInv(disponibleNfti);
            return [
              2,
              /*return*/
            ];
          });
        });
      };

      fetchItems();
    },
    [currentItems, dataloaded]
  );
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(next_seo_1.NextSeo, {
      title: 'Explore NTF',
      description: 'Criptic - React Next Web3 NFT Crypto Dashboard Template',
    }),
    React.createElement(
      'div',
      {
        className: 'sm:pt-5  w-[100%]',
      },
      React.createElement(
        'div',
        {
          className: ' w-[100%]',
        },
        React.createElement(
          param_tab_1['default'],
          {
            tabMenu: [
              {
                title: 'Productos',
                path: 'productos',
              },
              {
                title: 'Inversiones',
                path: 'inversiones',
              },
            ],
          },
          React.createElement(
            param_tab_1.TabPanel,
            {
              className: 'focus:outline-none flex justify-center',
            },
            React.createElement(
              'div',
              {
                className: isGridCompact
                  ? 'grid gap-5 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5'
                  : 'grid gap-6 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-3 4xl:grid-cols-4',
              },
              productos.map(function (producto) {
                return React.createElement(
                  'div',
                  {
                    className: 'flex row space-x-10 p-8',
                    key: producto.Nombre,
                  },
                  React.createElement(
                    'div',
                    {
                      className:
                        'relative overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark w-[400px]',
                    },
                    React.createElement(
                      'div',
                      {
                        className: 'relative block w-full pb-full',
                      },
                      React.createElement(image_1['default'], {
                        src: producto.img,
                        //placeholder="blur"
                        layout: 'fill',
                        objectFit: 'cover',
                        alt: producto.Nombre,
                      })
                    ),
                    React.createElement(
                      'div',
                      {
                        className: 'pt-5',
                      },
                      React.createElement(
                        'div',
                        {
                          className:
                            'text-lg font-medium text-black dark:text-white',
                        },
                        React.createElement('h1', null, producto.Nombre)
                      ),
                      React.createElement(
                        'div',
                        {
                          className: 'mt-1.5 flex text-lg',
                        },
                        React.createElement('span', null, producto.precio, '$')
                      )
                    ),
                    React.createElement(
                      'div',
                      {
                        className: 'mt-2 space-x-2',
                      },
                      React.createElement(
                        Button,
                        {
                          type: 'button',
                          disabled: true,
                        },
                        React.createElement('span', {
                          className: 'spinner-border spinner-border-sm',
                          role: 'status',
                          'aria-hidden': 'true',
                        }),
                        'Approve'
                      ),
                      React.createElement(
                        active_link_1['default'],
                        {
                          href: '/details/' + producto.tipo,
                        },
                        React.createElement(
                          Button,
                          {
                            type: 'button',
                          },
                          React.createElement('span', {
                            className: 'spinner-border spinner-border-sm',
                            role: 'status',
                            'aria-hidden': 'true',
                          }),
                          'Ver mas...'
                        )
                      ),
                      React.createElement(
                        'div',
                        {
                          className: 'mt-2',
                        },
                        producto.descripcion
                      )
                    )
                  )
                );
              })
            )
          ),
          React.createElement(
            param_tab_1.TabPanel,
            {
              className: 'focus:outline-none flex justify-center',
            },
            React.createElement(
              'div',
              {
                className: isGridCompact
                  ? 'grid gap-5 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5'
                  : 'grid gap-6 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-3 4xl:grid-cols-4',
              },
              inversion.map(function (inversion) {
                return React.createElement(
                  'div',
                  {
                    className: 'flex row space-x-10 p-8',
                    key: inversion.Nombre,
                  },
                  React.createElement(
                    'div',
                    {
                      className:
                        'relative overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark w-[400px]',
                    },
                    React.createElement(
                      'div',
                      {
                        className: 'relative block w-full pb-full',
                      },
                      React.createElement(image_1['default'], {
                        src: inversion.img,
                        //placeholder="blur"
                        layout: 'fill',
                        objectFit: 'cover',
                        alt: inversion.Nombre,
                      })
                    ),
                    React.createElement(
                      'div',
                      {
                        className: 'pt-5',
                      },
                      React.createElement(
                        'div',
                        {
                          className:
                            'text-lg font-medium text-black dark:text-white',
                        },
                        React.createElement('h1', null, inversion.Nombre)
                      ),
                      React.createElement(
                        'div',
                        {
                          className: 'mt-1.5 flex text-lg',
                        },
                        React.createElement('span', null, inversion.precio, '$')
                      )
                    ),
                    React.createElement(
                      'div',
                      {
                        className: 'mt-2 space-x-2',
                      },
                      React.createElement(
                        Button,
                        {
                          type: 'button',
                          disabled: true,
                        },
                        React.createElement('span', {
                          className: 'spinner-border spinner-border-sm',
                          role: 'status',
                          'aria-hidden': 'true',
                        }),
                        'Approve'
                      ),
                      React.createElement(
                        active_link_1['default'],
                        {
                          href: '/details/' + inversion.tipo,
                        },
                        React.createElement(
                          Button,
                          {
                            type: 'button',
                          },
                          React.createElement('span', {
                            className: 'spinner-border spinner-border-sm',
                            role: 'status',
                            'aria-hidden': 'true',
                          }),
                          'Ver mas...'
                        )
                      ),
                      React.createElement(
                        'div',
                        {
                          className: 'mt-2',
                        },
                        inversion.descripcion
                      )
                    )
                  )
                );
              })
            )
          )
        )
      ),
      React.createElement(
        'div',
        {
          className:
            'fixed bottom-6 left-1/2 z-10 w-full -translate-x-1/2 px-9 sm:hidden',
        },
        React.createElement(
          button_1['default'],
          {
            onClick: function onClick() {
              return openDrawer('DRAWER_SEARCH');
            },
            fullWidth: true,
          },
          'Filters'
        )
      )
    )
  );
};

SearchPage.getLayout = function getLayout(page) {
  return React.createElement(_dashboard_1['default'], null, page);
};

exports['default'] = SearchPage;
var templateObject_1;
