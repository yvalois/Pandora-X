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
var classnames_1 = require('classnames');
var image_1 = require('@/components/ui/image');
var react_redux_1 = require('react-redux');
var sizes = {
  xl: [
    'border-white border-[5px] h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 3xl:h-40 3xl:w-40 3xl:border-8 shadow-large',
  ],
  lg: ['border-whitebor der-4 h-20 w-20 lg:h-24 lg:w-24'],
  md: ['border-white h-10 w-10 drop-shadow-main border-3'],
  sm: ['border-white h-8 w-8 border-2 shadow-card'],
  xs: ['h-6 w-6'],
};
var shapes = {
  rounded: ['h-16 w-16 rounded-lg bg-white/20 p-2 backdrop-blur-[40px]'],
  circle: ['rounded-full'],
};
function AvatarP(_a) {
  var _this = this;
  var image = _a.image,
    alt = _a.alt,
    className = _a.className,
    _b = _a.size,
    size = _b === void 0 ? 'md' : _b,
    _c = _a.shape,
    shape = _c === void 0 ? 'circle' : _c,
    width = _a.width,
    height = _a.height,
    activate = _a.activate,
    is = _a.is,
    setPrevProfile = _a.setPrevProfile,
    prevProfile = _a.prevProfile;
  var sizeClassNames = sizes[size];
  //const [prevProfile, setPrevProfile] = useState("")
  var accountAddress = react_redux_1.useSelector(function (state) {
    return state.blockchain;
  }).accountAddress;
  function encodeFileAsBase64URL(file) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [
          2 /*return*/,
          new Promise(function (resolve) {
            var reader = new FileReader();
            reader.addEventListener('loadend', function () {
              resolve(reader.result);
            });
            reader.readAsDataURL(file);
          }),
        ];
      });
    });
  }
  var editphotoP = function (e) {
    return __awaiter(_this, void 0, void 0, function () {
      var file, base64;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            console.log(e.target.files[0]);
            file = e.target.files[0];
            return [4 /*yield*/, encodeFileAsBase64URL(file)];
          case 1:
            base64 = _a.sent();
            setPrevProfile(base64);
            activate();
            return [2 /*return*/];
        }
      });
    });
  };
  var UploadProfile = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var value;
      return __generator(this, function (_a) {
        alert('ya');
        value = {
          profile: prevProfile,
        };
        fetch(
          'https://shark-app-w9pvy.ondigitalocean.app/api/updatebanner/' +
            accountAddress,
          {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
          .then(function (res) {
            res.json();
            alert(res.status);
          })
          .then(function () {})
          ['catch'](function (error) {
            return console.error('Error:', error);
          });
        return [2 /*return*/];
      });
    });
  };
  return React.createElement(
    'figure',
    {
      className: classnames_1['default'](
        'relative shrink-0 overflow-hidden',
        className,
        shapes[shape],
        shape === 'circle' && sizeClassNames
      ),
    },
    shape === 'circle'
      ? size === 'xs' || 'sm'
        ? React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              null,
              !is || prevProfile.length == 0
                ? React.createElement(image_1['default'], {
                    src: image,
                    alt: alt,
                    layout: 'fill',
                    objectFit: 'cover',
                    className: 'rounded-full',
                  })
                : React.createElement(image_1['default'], {
                    src: prevProfile,
                    alt: alt,
                    layout: 'fill',
                    objectFit: 'cover',
                    className: 'rounded-full',
                  }),
              React.createElement(
                'div',
                {
                  className:
                    'w-full h-full  group z-10  hover:bg-gray-200 opacity-60 rounded-full absolute top-0 flex justify-center items-center cursor-pointer transition duration-500',
                },
                React.createElement('input', {
                  type: 'file',
                  onChange: function (e) {
                    editphotoP(e);
                  },
                  className: 'hidden group-hover:block w-[10%] z-10',
                })
              )
            )
          )
        : React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              null,
              !is || prevProfile.length == 0
                ? React.createElement(image_1['default'], {
                    src: image,
                    alt: alt,
                    layout: 'fill',
                    objectFit: 'cover',
                    placeholder: 'blur',
                    className: 'w-64 h-64 rounded-full absolute ',
                  })
                : React.createElement(image_1['default'], {
                    src: prevProfile,
                    alt: alt,
                    layout: 'fill',
                    objectFit: 'cover',
                    placeholder: 'blur',
                    className: 'w-64 h-64 rounded-full absolute ',
                  }),
              React.createElement(
                'div',
                {
                  className:
                    'w-full h-full  group z-10  hover:bg-gray-200 opacity-60 rounded-full absolute top-0 flex justify-center items-center cursor-pointer transition duration-500',
                },
                React.createElement('input', {
                  type: 'file',
                  onChange: function () {
                    editphotoP(e);
                  },
                  className: 'hidden group-hover:block w-[30%]z-10',
                })
              )
            )
          )
      : React.createElement(image_1['default'], {
          src: image,
          alt: alt,
          className: 'rounded-[6px]',
        })
  );
}
exports['default'] = AvatarP;
