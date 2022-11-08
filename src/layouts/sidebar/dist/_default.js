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
var close_1 = require('@/components/icons/close');
var plus_circle_1 = require('@/components/icons/plus-circle');
var compass_1 = require('@/components/icons/compass');
var react_redux_1 = require('react-redux');
//images
var author_jpg_1 = require('@/assets/images/author.jpg');
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
    name: 'MarketPlace',
    icon: React.createElement(compass_1.CompassIcon, null),
    href: routes_1['default'].search,
  },
  /*{
      name: 'Staking',
      icon: <PlusCircle />,
      href: routes.createNft,
    },*/
  /*{
      name: 'NFT Details',
      icon: <DiskIcon />,
      href: routes.nftDetails,
    },*/
  {
    name: 'Profile',
    icon: React.createElement(profile_1.ProfileIcon, null),
    href: routes_1['default'].profile,
  },
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
  {
    name: 'Crear Usuario',
    icon: React.createElement(plus_circle_1.PlusCircle, null),
    href: routes_1['default'].createuser,
  },
  {
    name: 'Crear NFT',
    icon: React.createElement(plus_circle_1.PlusCircle, null),
    href: routes_1['default'].createNft,
  },
];
function Sidebar(_a) {
  var className = _a.className;
  var Usuario = react_redux_1.useSelector(function (state) {
    return state.blockchain.rol;
  });
  var closeDrawer = context_1.useDrawer().closeDrawer;
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
        React.createElement(author_card_1['default'], {
          image: author_jpg_1['default'],
          name: 'Root',
          role: 'admin',
        }),
        React.createElement(
          'div',
          { className: 'mt-12' },
          exports.menuItems.map(function (item, index) {
            return (Usuario !== 'Admin' && item.name == 'Crear Usuario') ||
              (Usuario !== 'Admin' && item.name == 'Crear NFT') ||
              (Usuario !== 'Admin' &&
                Usuario !== 'usuario' &&
                Usuario !== 'cliente' &&
                item.name == 'Profile')
              ? React.createElement('div', { key: index })
              : React.createElement(collapsible_menu_1.MenuItem, {
                  key: index,
                  name: item.name,
                  href: item.href,
                  icon: item.icon,
                });
          })
        )
      )
    )
  );
}
exports['default'] = Sidebar;
