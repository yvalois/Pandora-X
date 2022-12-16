'use strict';
exports.__esModule = true;
exports.menuItems = void 0;
var classnames_1 = require('classnames');
var author_card_1 = require('@/components/ui/author-card');
var logo_1 = require('@/components/ui/logo');
var collapsible_menu_1 = require('@/components/ui/collapsible-menu');
var scrollbar_1 = require('@/components/ui/scrollbar');
var button_1 = require('@/components/ui/button');
var routes_1 = require('@/config/routes');
var context_1 = require('@/components/drawer-views/context');
var home_1 = require('@/components/icons/home');
var profile_1 = require('@/components/icons/profile');
var vote_icon_1 = require('@/components/icons/vote-icon');
var close_1 = require('@/components/icons/close');
var plus_circle_1 = require('@/components/icons/plus-circle');
var compass_1 = require('@/components/icons/compass');
var react_redux_1 = require('react-redux');
var PEER_X_jpg_1 = require('@/assets/images/profile/PEER-X.jpg');
var BLOCKCREATOR_jpg_1 = require('@/assets/images/profile/BLOCKCREATOR.jpg');
var BLOCKELITE_jpg_1 = require('@/assets/images/profile/BLOCKELITE.jpg');
var BLOCKMASTER_jpg_1 = require('@/assets/images/profile/BLOCKMASTER.jpg');
var GENERIC_jpg_1 = require('@/assets/images/profile/GENERIC.jpg');
var wagmi_1 = require('wagmi');
exports.menuItems = [
  {
    name: 'Home',
    icon: React.createElement(home_1.HomeIcon, null),
    href: routes_1['default'].home,
  },
  /*{
      name: 'Farm',
      icon: <FarmIcon />,
      href: routes.farms,
    },*/
  /*{
      name: 'Swap',
      icon: <ExchangeIcon />,
      href: routes.swap,
    },*/
  /*{
      name: 'Liquidity',
      icon: <PoolIcon />,
      href: routes.liquidity,
    },*/
  {
    name: 'Profile',
    icon: React.createElement(profile_1.ProfileIcon, null),
    href: routes_1['default'].profile,
  },
  {
    name: 'NFT Marketplace',
    icon: React.createElement(compass_1.CompassIcon, null),
    href: routes_1['default'].search,
  },
  /*{
      name: 'Staking',
      icon: <PlusCircle />,
      href: routes.staking,
    },*/
  {
    name: 'Comunidad',
    icon: React.createElement(vote_icon_1.VoteIcon, null),
    href: '',
    dropdownItems: [
      {
        name: 'Discord',
        href: 'https://discord.gg/bybu984z',
      },
      {
        name: 'Academia X',
        href: routes_1['default'].academiaX,
      },
      {
        name: 'Alpha Report',
        href: routes_1['default'].alphaR,
      },
      {
        name: 'Investing Value',
        href: routes_1['default'].investingV,
      },
      {
        name: 'Coaching',
        href: routes_1['default'].coaching,
      },
      {
        name: 'Podcast',
        href: routes_1['default'].podcast,
      },
    ],
  },
  /*{
      name: 'NFT Details',
      icon: <DiskIcon />,
      href: routes.nftDetails,
    },*/
  /*{
      name: 'Vote',
      icon: <VoteIcon />,
      href: routes.vote,
      dropdownItems: [
        {
          name: 'Explore',
          href: routes.vote,
        },
        {
          name: 'Vote with pools',
          href: routes.proposals,
        },
        {
          name: 'Create proposal',
          href: routes.createProposal,
        },
      ],
    
    },*/
  /*{
      name: 'Crear Usuario',
      icon: <PlusCircle />,
      href: routes.createuser,
    },*/
  /*{
      name: 'Crear NFT',
      icon: <PlusCircle />,
      href: routes.createNft,
    },*/
  {
    name: 'Referidos',
    icon: React.createElement(plus_circle_1.PlusCircle, null),
    href: routes_1['default'].createuser,
  },
];
function Sidebar(_a) {
  var _b, _c, _d, _e, _f;
  var className = _a.className;
  var UsuarioR = react_redux_1.useSelector(function (state) {
    return state.blockchain.rol;
  });
  var closeDrawer = context_1.useDrawer().closeDrawer;
  var Usuario = react_redux_1.useSelector(function (state) {
    return state.Usuario;
  });
  var _g = wagmi_1.useAccount(),
    isConnected = _g.isConnected,
    address = _g.address;
  var _h = react_redux_1.useSelector(function (state) {
      return state.blockchain;
    }),
    inventoryp = _h.inventoryp,
    inventoryi = _h.inventoryi,
    productoMinter = _h.productoMinter,
    accountAddress = _h.accountAddress,
    balanceI = _h.balanceI,
    isConnect = _h.isConnect,
    inversionMinter = _h.inversionMinter;
  return React.createElement(
    'aside',
    {
      className: classnames_1['default'](
        'top-0 z-40 h-full w-full max-w-full border-dashed border-gray-200 bg-body ltr:left-0 ltr:border-r rtl:right-0 rtl:border-l dark:border-gray-700 dark:bg-dark xs:w-80 xl:fixed  xl:w-72 2xl:w-80',
        className
      ),
    },
    React.createElement(
      'div',
      {
        className:
          'relative flex h-24 w-full items-center justify-between overflow-hidden px-6 py-4 2xl:px-8',
      },
      React.createElement(logo_1['default'], null),
      React.createElement(
        'div',
        { className: 'md:hidden' },
        React.createElement(
          button_1['default'],
          {
            title: 'Close',
            color: 'white',
            shape: 'circle',
            variant: 'transparent',
            size: 'small',
            onClick: closeDrawer,
          },
          React.createElement(close_1.Close, { className: 'h-auto w-2.5' })
        )
      )
    ),
    React.createElement(
      scrollbar_1['default'],
      { style: { height: 'calc(100% - 96px)' } },
      React.createElement(
        'div',
        { className: 'px-6 pb-5 2xl:px-8' },
        isConnected &&
          ((_b = Usuario.perfil) === null || _b === void 0
            ? void 0
            : _b.length) == 0 &&
          Usuario.rango == 'peerx'
          ? React.createElement(author_card_1['default'], {
              image: PEER_X_jpg_1['default'],
              name: Usuario.nombre,
              role: UsuarioR,
            })
          : isConnected &&
            ((_c = Usuario.perfil) === null || _c === void 0
              ? void 0
              : _c.length) == 0 &&
            Usuario.rango == 'blockelite'
          ? React.createElement(author_card_1['default'], {
              image: BLOCKELITE_jpg_1['default'],
              name: Usuario.nombre,
              role: UsuarioR,
            })
          : isConnected &&
            ((_d = Usuario.perfil) === null || _d === void 0
              ? void 0
              : _d.length) == 0 &&
            Usuario.rango == 'blockmaster'
          ? React.createElement(author_card_1['default'], {
              image: BLOCKMASTER_jpg_1['default'],
              name: Usuario.nombre,
              role: UsuarioR,
            })
          : isConnected &&
            ((_e = Usuario.perfil) === null || _e === void 0
              ? void 0
              : _e.length) == 0 &&
            Usuario.rango == 'blockcreator'
          ? React.createElement(author_card_1['default'], {
              image: BLOCKCREATOR_jpg_1['default'],
              name: Usuario.nombre,
              role: UsuarioR,
            })
          : isConnected &&
            ((_f = Usuario.perfil) === null || _f === void 0
              ? void 0
              : _f.length) > 0
          ? React.createElement(author_card_1['default'], {
              image: Usuario.perfil,
              name: Usuario.nombre,
              role: UsuarioR,
            })
          : isConnected
          ? React.createElement(author_card_1['default'], {
              image: GENERIC_jpg_1['default'],
              name: Usuario.nombre,
              role: UsuarioR,
            })
          : !isConnected &&
            React.createElement(author_card_1['default'], {
              image: GENERIC_jpg_1['default'],
              name: 'Inicia Sesion',
              role: 'No haz iniciado sesion',
            }),
        React.createElement(
          'div',
          { className: 'mt-12' },
          exports.menuItems.map(function (item, index) {
            return (UsuarioR !== 'Admin' && item.name == 'Referidos') ||
              (UsuarioR !== 'Admin' && item.name == 'Crear NFT') ||
              (UsuarioR !== 'Admin' &&
                UsuarioR !== 'usuario' &&
                UsuarioR !== 'cliente' &&
                item.name == 'Profile') ||
              (UsuarioR !== 'Admin' &&
                UsuarioR !== 'usuario' &&
                UsuarioR !== 'cliente' &&
                item.name == 'Staking')
              ? React.createElement('div', { key: index })
              : React.createElement(collapsible_menu_1.MenuItem, {
                  key: index,
                  name: item.name,
                  href: item.href,
                  icon: item.icon,
                  dropdownItems: item.dropdownItems,
                });
          })
        )
      )
    )
  );
}
exports['default'] = Sidebar;
