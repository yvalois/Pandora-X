'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
exports.__esModule = true;
/* eslint-disable @next/next/no-img-element */
var react_1 = require('react');
var react_dropzone_1 = require('react-dropzone');
var button_1 = require('@/components/ui/button');
function Uploader() {
  var _a = react_1.useState([]),
    files = _a[0],
    setFiles = _a[1];
  var _b = react_dropzone_1.useDropzone({
      accept: 'image/*',
      multiple: false,
      onDrop: function (acceptedFiles) {
        setFiles(
          acceptedFiles.map(function (file) {
            return Object.assign(file, {
              preview: URL.createObjectURL(file),
            });
          })
        );
      },
    }),
    getRootProps = _b.getRootProps,
    getInputProps = _b.getInputProps;
  var thumbs = files.map(function (file) {
    return react_1['default'].createElement(
      'div',
      { key: file.name, className: 'h-full w-full' },
      react_1['default'].createElement('img', {
        src: file.preview,
        className: 'mx-auto max-h-full max-w-full object-contain',
        alt: 'uploaded image',
      })
    );
  });
  react_1.useEffect(
    function () {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(function (file) {
        return URL.revokeObjectURL(file.preview);
      });
    },
    [files]
  );
  //console.log(files);
  return react_1['default'].createElement(
    'div',
    {
      className:
        'rounded-lg border border-solid border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-light-dark sm:p-6',
    },
    react_1['default'].createElement(
      'div',
      __assign(
        {},
        getRootProps({
          className:
            'border border-dashed relative border-gray-200 dark:border-gray-700 h-48 flex items-center justify-center rounded-lg',
        })
      ),
      react_1['default'].createElement('input', __assign({}, getInputProps())),
      files.length > 0
        ? thumbs
        : react_1['default'].createElement(
            'div',
            { className: 'text-center' },
            react_1['default'].createElement(
              'p',
              {
                className:
                  'mb-6 text-sm tracking-tighter text-gray-600 dark:text-gray-400',
              },
              'PNG, GIF, WEBP, MP4 or MP3. Max 100mb.'
            ),
            react_1['default'].createElement(
              button_1['default'],
              null,
              'CHOOSE FILE'
            )
          )
    )
  );
}
exports['default'] = Uploader;
