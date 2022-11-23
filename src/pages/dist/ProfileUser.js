'use strict';
exports.__esModule = true;
var param_tab_1 = require('@/components/ui/param-tab');
var react_redux_1 = require('react-redux');
var nft_card_1 = require('@/components/ui/nft-card');
var stakingTable_1 = require('@/components/stakingTable');
var react_1 = require('react');
function ProfileTab() {
  var _a = react_1.useState([]),
    currentItems = _a[0],
    setCurrentItems = _a[1];
  var _b = react_1.useState([]),
    currentInv = _b[0],
    setCurrentInv = _b[1];
  var _c = react_redux_1.useSelector(function (state) {
      return state.blockchain;
    }),
    inventoryp = _c.inventoryp,
    inventoryi = _c.inventoryi;
  var Usuario = react_redux_1.useSelector(function (state) {
    return state.blockchain.rol;
  });
  react_1.useEffect(
    function () {
      setCurrentItems(inventoryp);
      setCurrentInv(inventoryi);
    },
    [inventoryp, inventoryi]
  );
  return React.createElement(
    param_tab_1['default'],
    {
      tabMenu: [
        {
          title: 'Mis productos',
          path: 'productos',
        },
        {
          title: 'Inversiones',
          path: 'inversiones',
        },
        {
          title: 'Staking',
          path: 'staking',
        },
        {
          title: 'Pagos',
          path: 'pagos',
        },
      ],
    },
    React.createElement(
      param_tab_1.TabPanel,
      { className: 'focus:outline-none' },
      React.createElement(
        'div',
        {
          className:
            'grid gap-4 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-5 xl:gap-6 3xl:grid-cols-3 4xl:grid-cols-4',
        },
        currentItems === null || currentItems === void 0
          ? void 0
          : currentItems.map(function (nft) {
              return React.createElement(nft_card_1['default'], {
                key: nft.name,
                name: nft.name,
                image: nft.image,
                price: 82,
                number: nft.number,
                alldata: false,
              });
            })
      )
    ),
    React.createElement(
      param_tab_1.TabPanel,
      { className: 'focus:outline-none' },
      React.createElement(
        'div',
        {
          className:
            'grid gap-4 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-5 xl:gap-6 3xl:grid-cols-3 4xl:grid-cols-4',
        },
        currentInv === null || currentInv === void 0
          ? void 0
          : currentInv.map(function (nft) {
              return React.createElement(nft_card_1['default'], {
                key: nft.name,
                name: nft.name,
                image: nft.image,
                price: 82,
                number: nft.number,
                alldata: false,
              });
            })
      )
    ),
    React.createElement(
      param_tab_1.TabPanel,
      { className: 'focus:outline-none' },
      React.createElement(
        'div',
        {
          className:
            'w-[100%] lg:w-[100%] ltr:lg:pr-6 rtl:lg:pl-6 2xl:w-[100%] 3xl:w-[100%]',
        },
        React.createElement(stakingTable_1['default'], null)
      )
    ),
    1 === 1 &&
      React.createElement(
        param_tab_1.TabPanel,
        { className: 'focus:outline-none' },
        React.createElement(
          'div',
          {
            className:
              'w-[100%] lg:w-[100%] ltr:lg:pr-6 rtl:lg:pl-6 2xl:w-[100%] 3xl:w-[100%]',
          },
          React.createElement(stakingTable_1['default'], null)
        )
      )
  );
}
exports['default'] = ProfileTab;
