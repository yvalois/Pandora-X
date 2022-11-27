'use strict';
exports.__esModule = true;
var param_tab_1 = require('@/components/ui/param-tab');
var react_redux_1 = require('react-redux');
var nft_card_1 = require('@/components/ui/nft-card');
var stakingTable_1 = require('@/components/transaction/stakingTable');
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
    inventoryi = _c.inventoryi,
    producto = _c.producto;
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
                key: nft.nombre,
                name: nft.nombre,
                image: nft.img,
                price: nft.precio,
                number: nft.id,
                alldata: false,
                type: 'productos',
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
            'grid gap-4 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-5 xl:gap-6 3xl:grid-cols-3 4xl:grid-cols-4 w-[100%] h-[100%]',
        },
        currentInv === null || currentInv === void 0
          ? void 0
          : currentInv.map(function (nft) {
              return React.createElement(nft_card_1['default'], {
                key: nft.nombre,
                name: nft.nombre,
                image: nft.img,
                price: nft.precio,
                number: nft.id,
                alldata: false,
                type: 'staking',
              });
            }),
        React.createElement(
          'div',
          {
            className:
              'flex justify-center align-self mt-[50%] ml-[100%] w-[100%] height-[100%]',
          },
          React.createElement(
            'span',
            null,
            React.createElement(
              'h1',
              { className: 'text-lg text-gray-600 w-[700px]' },
              "Aun no realizas tu primer compra de Nft's de inversion"
            )
          )
        )
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
    )
  );
}
exports['default'] = ProfileTab;
