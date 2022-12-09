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
var button_1 = require('@/components/ui/button');
var image_1 = require('@/components/ui/image');
var edit_svgrepo_com_svg_1 = require('@/assets/images/edit-svgrepo-com.svg');
var react_1 = require('react');
var react_redux_1 = require('react-redux');
var blockchainAction_1 = require('@/redux/Blockchain/blockchainAction');
function AuthorInformation(_a) {
  var _this = this;
  var _b = _a.className,
    className = _b === void 0 ? 'md:hidden' : _b,
    data = _a.data;
  var _c = react_1.useState(false),
    editIsActivated = _c[0],
    setEditIsActivated = _c[1];
  var _d = react_1.useState(''),
    newDescipcion = _d[0],
    setNewDescripcion = _d[1];
  var accountAddress = react_redux_1.useSelector(function (state) {
    return state.blockchain;
  }).accountAddress;
  var Usuario = react_redux_1.useSelector(function (state) {
    return state.Usuario;
  });
  var dispatch = react_redux_1.useDispatch();
  var activate = function () {
    if (!editIsActivated) {
      setEditIsActivated(true);
    } else {
      setEditIsActivated(false);
    }
  };
  var UploadDescipcion = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var value;
      return __generator(this, function (_a) {
        value = {
          descripcion: newDescipcion,
        };
        fetch(
          'https://shark-app-w9pvy.ondigitalocean.app/api/updatedescripcion/' +
            accountAddress,
          {
            method: 'PUT',
            body: JSON.stringify(value),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
          .then(function (res) {
            res.json();
            setEditIsActivated(false);
            dispatch(blockchainAction_1.update(accountAddress));
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
    'div',
    { className: '' + className },
    React.createElement(
      'div',
      {
        className:
          'border-y border-dashed border-gray-200 py-5 dark:border-gray-700 xl:py-6',
      },
      React.createElement(
        'div',
        {
          className:
            'row mb-2 flex w-[34%] justify-between text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white',
        },
        React.createElement('span', null, ' Biografia'),
        React.createElement(
          'div',
          { className: 'h-4 w-4 cursor-pointer' },
          !editIsActivated &&
            React.createElement(
              'div',
              { className: 'h-10', onClick: activate },
              React.createElement(image_1['default'], {
                className: 'h-2',
                src: edit_svgrepo_com_svg_1['default'],
                alt: 'Criptic',
                priority: true,
              })
            )
        )
      ),
      !editIsActivated && Usuario.descripcion,
      editIsActivated &&
        React.createElement(
          'div',
          {
            className:
              'text-sm leading-6 tracking-tighter text-gray-600 dark:text-gray-400',
          },
          React.createElement('textarea', {
            onChange: function (e) {
              setNewDescripcion(e.target.value);
            },
            className: 'w-[90%] text-sm',
            rows: 6,
          }),
          React.createElement(
            'div',
            { className: 'flex w-[90%] justify-center ' },
            React.createElement(
              button_1['default'],
              {
                onClick: UploadDescipcion,
                className: 'h-14 w-24 rounded-r-sm text-sm',
              },
              'Aceptar'
            ),
            React.createElement(
              button_1['default'],
              {
                onClick: activate,
                className: 'h-14 w-24 rounded-l-sm bg-gray-500 text-sm',
              },
              'Cancelar'
            )
          )
        )
    )
  );
}
exports['default'] = AuthorInformation;
