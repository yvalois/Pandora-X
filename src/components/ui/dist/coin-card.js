'use strict';
exports.__esModule = true;
exports.CoinCard = void 0;
var image_1 = require('@/components/ui/image');
var arrow_up_1 = require('@/components/icons/arrow-up');
var swiper_1 = require('swiper');
var react_1 = require('swiper/react');
function CoinCard(_a) {
  var name = _a.name,
    symbol = _a.symbol,
    logo = _a.logo,
    balance = _a.balance,
    usdBalance = _a.usdBalance,
    change = _a.change,
    isChangePositive = _a.isChangePositive,
    _b = _a.color,
    color = _b === void 0 ? '#FDEDD4' : _b;
  return React.createElement(
    'div',
    {
      className: 'relative rounded-lg p-6 xl:p-8',
      style: { backgroundColor: color },
    },
    React.createElement(
      'h4',
      {
        className:
          'mb-8 text-sm font-medium uppercase tracking-wider text-gray-900',
      },
      name
    ),
    React.createElement(
      'div',
      { className: 'relative h-20 lg:h-24 xl:h-28 3xl:h-36' },
      React.createElement(image_1['default'], {
        src: logo,
        alt: name,
        layout: 'fill',
        objectFit: 'contain',
        objectPosition: 0,
      })
    ),
    React.createElement(
      'div',
      {
        className:
          'mt-8 mb-2 text-sm font-medium tracking-wider text-gray-900 lg:text-lg 2xl:text-xl 3xl:text-2xl',
      },
      balance,
      React.createElement('span', { className: 'uppercase' }, ' ', symbol)
    ),
    React.createElement(
      'div',
      {
        className:
          'flex items-center justify-between text-xs font-medium 2xl:text-sm',
      },
      React.createElement(
        'span',
        { className: 'tracking-wider text-gray-600' },
        usdBalance,
        ' USD'
      ),
      React.createElement(
        'span',
        {
          className:
            'flex items-center  ' +
            (isChangePositive ? 'text-green-500' : 'text-red-500'),
        },
        React.createElement(
          'span',
          {
            className:
              'ltr:mr-2 rtl:ml-2 ' + (!isChangePositive ? 'rotate-180' : ''),
          },
          React.createElement(arrow_up_1.ArrowUp, null)
        ),
        change
      )
    )
  );
}
exports.CoinCard = CoinCard;
function CoinSlider(_a) {
  var coins = _a.coins;
  var sliderBreakPoints = {
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1080: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    1280: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1700: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    2200: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  };
  return React.createElement(
    'div',
    null,
    React.createElement(
      react_1.Swiper,
      {
        modules: [swiper_1.Scrollbar, swiper_1.A11y],
        spaceBetween: 24,
        slidesPerView: 1,
        scrollbar: { draggable: true },
        breakpoints: sliderBreakPoints,
        observer: true,
        dir: 'ltr',
      },
      coins.map(function (coin) {
        return React.createElement(
          react_1.SwiperSlide,
          { key: coin.id },
          React.createElement(CoinCard, {
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            logo: coin.logo,
            balance: coin.balance,
            usdBalance: coin.usdBalance,
            change: coin.change,
            isChangePositive: coin.isChangePositive,
            color: coin.color,
          })
        );
      })
    )
  );
}
exports['default'] = CoinSlider;
