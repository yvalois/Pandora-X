'use strict';
exports.__esModule = true;
var swiper_1 = require('swiper');
var react_1 = require('swiper/react');
var nft_card_1 = require('@/components/ui/nft-card');
function NftSlider(_a) {
  var nfts = _a.nfts,
    priceFormat = _a.priceFormat,
    nftInfo = _a.nftInfo,
    setNftInfo = _a.setNftInfo,
    type = _a.type;
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
      nfts.map(function (nfts) {
        return React.createElement(
          react_1.SwiperSlide,
          { key: nfts.id },
          React.createElement(nft_card_1['default'], {
            key: nfts.name,
            name: nfts.name,
            image: nfts.image,
            price: priceFormat,
            number: nfts.number,
            alldata: false,
            type: type,
            nftInfo: nftInfo,
            setNftInfo: setNftInfo,
          })
        );
      })
    )
  );
}
exports['default'] = NftSlider;
