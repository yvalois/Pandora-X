'use strict';
exports.__esModule = true;
var image_1 = require('@/components/ui/image');
var classnames_1 = require('classnames');
var anchor_link_1 = require('@/components/ui/links/anchor-link');
var avatar_1 = require('@/components/ui/avatar');
var Pandora_X_icon_04_svg_1 = require('@/assets/images/Pandora-X-icon-04.svg');
function CollectionCard(_a) {
  var item = _a.item,
    _b = _a.className,
    className = _b === void 0 ? '' : _b;
  var _c = item !== null && item !== void 0 ? item : {},
    nombre = _c.nombre,
    slug = _c.slug,
    title = _c.title,
    cover_image = _c.cover_image,
    image = _c.image,
    number_of_artwork = _c.number_of_artwork,
    user = _c.user;
  return React.createElement(
    'div',
    {
      className: classnames_1['default'](
        'group relative overflow-hidden rounded-lg transition-transform hover:-translate-y-1 ',
        className
      ),
    },
    React.createElement(
      'div',
      {
        className:
          'relative flex aspect-[11/11]  justify-center overflow-hidden rounded-lg',
      },
      React.createElement(image_1['default'], {
        src: image,
        placeholder: 'blur',
        layout: 'fill',
        quality: 100,
        objectFit: 'cover',
        alt: nombre,
      })
    ),
    React.createElement(
      'div',
      {
        className:
          'absolute top-0 left-0 z-[5] flex h-full w-full flex-col justify-between bg-gradient-to-t from-black p-5 md:p-6',
      },
      React.createElement(anchor_link_1['default'], {
        href: '/search',
        className: 'absolute top-0 left-0 z-10 h-full w-full',
      }),
      React.createElement(
        'div',
        { className: 'flex justify-between gap-3' },
        React.createElement(
          'div',
          {
            className:
              'inline-flex h-8 shrink-0 items-center rounded-2xl bg-white/20 -px-4 text-xs font-medium uppercase -tracking-wide text-white\r\n          backdrop-blur-[40px]',
          },
          nombre
        )
      ),
      React.createElement(
        'div',
        { className: 'block' },
        React.createElement(
          'h2',
          {
            className:
              'mb-1.5 truncate text-lg font-medium -tracking-wider text-white',
          },
          title
        ),
        React.createElement(
          'div',
          {
            className:
              'relative z-10 mt-3.5 inline-flex items-center rounded-3xl bg-white/20 p-2 backdrop-blur-[40px]',
          },
          React.createElement(
            avatar_1['default'],
            //@ts-ignore
            {
              //@ts-ignore
              image: Pandora_X_icon_04_svg_1['default'],
              alt: user === null || user === void 0 ? void 0 : user.name,
              size: 'xs',
              width: 24,
              height: 24,
              className: 'rounded-full',
            }
          ),
          React.createElement(
            'div',
            {
              className:
                'truncate text-sm -tracking-wide text-white ltr:ml-2 ltr:pr-2 rtl:mr-2 rtl:pl-2',
            },
            '@PandoraX'
          )
        )
      )
    )
  );
}
exports['default'] = CollectionCard;
