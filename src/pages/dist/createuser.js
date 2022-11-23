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
exports.getStaticProps = void 0;
var next_seo_1 = require('next-seo');
var _dashboard_1 = require('@/layouts/_dashboard');
var react_1 = require('react');
var NFTROL_1 = require('@/NFTROL');
var react_redux_1 = require('react-redux');
var button_1 = require('@/components/ui/button');
var validator_1 = require('validator');
// static data
exports.getStaticProps = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [
        2 /*return*/,
        {
          props: {},
        },
      ];
    });
  });
};
var CreateUser = function () {
  var tiempoTranscurrido = Date.now();
  var hoy = new Date(tiempoTranscurrido);
  var NewUser = {
    Nombre: '',
    Correo: '',
    Address: '',
    Categoria: 'Agente X',
    Rango: 'peerx',
    Fecha: hoy.toLocaleDateString(),
    Rol: 'usuario',
  };
  var Err = {
    ErrNombre: '',
    ErrCorreo: '',
    ErrAddress: '',
  };
  var _a = react_1.useState(NewUser),
    value = _a[0],
    setValue = _a[1];
  var Usuario = react_redux_1.useSelector(function (state) {
    return state.Usuario;
  });
  var _b = react_1.useState(0),
    status = _b[0],
    setStatus = _b[1];
  var _c = react_1.useState(false),
    error = _c[0],
    setError = _c[1];
  var _d = react_1.useState(Err),
    errorMsg = _d[0],
    setErrorMsg = _d[1];
  react_1.useEffect(function () {
    if (Usuario.rol !== 'Admin') {
      window.location.href = '/';
    }
  });
  var ChangeInfo = function (Dato, valor) {
    if (Dato == 'Nombre') {
      setValue(function (prevState) {
        return __assign(__assign({}, prevState), { Nombre: valor });
      });
    } else if (Dato == 'Correo') {
      setValue(function (prevState) {
        return __assign(__assign({}, prevState), { Correo: valor });
      });
    } else if (Dato == 'Address') {
      setValue(function (prevState) {
        return __assign(__assign({}, prevState), { Address: valor });
      });
    } else if (Dato == 'Categoria') {
      setValue(function (prevState) {
        return __assign(__assign({}, prevState), { Categoria: valor });
      });
    } else {
      setValue(function (prevState) {
        return __assign(__assign({}, prevState), { Rango: valor });
      });
    }
  };
  var registerUser = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (value.Nombre.length < 3) {
              setError(true);
              setErrorMsg(function (prevState) {
                return __assign(__assign({}, prevState), {
                  ErrNombre: 'El nombre debe tener minimo 3 caracteres',
                });
              });
            } else if (!validator_1['default'].isAlpha(value.Nombre)) {
              setError(true);
              setErrorMsg(function (prevState) {
                return __assign(__assign({}, prevState), {
                  ErrNombre: 'solo se permiten letras',
                });
              });
            } else if (
              value.Nombre.length >= 3 &&
              validator_1['default'].isAlpha(value.Nombre)
            ) {
              setErrorMsg(function (prevState) {
                return __assign(__assign({}, prevState), { ErrNombre: '' });
              });
            }
            if (!validator_1['default'].isEmail(value.Correo)) {
              setError(true);
              setErrorMsg(function (prevState) {
                return __assign(__assign({}, prevState), {
                  ErrCorreo: 'Correo invalido',
                });
              });
            } else if (validator_1['default'].isEmail(value.Correo)) {
              setErrorMsg(function (prevState) {
                return __assign(__assign({}, prevState), { ErrCorreo: '' });
              });
            }
            if (!validator_1['default'].isEthereumAddress(value.Address)) {
              setError(true);
              setErrorMsg(function (prevState) {
                return __assign(__assign({}, prevState), {
                  ErrAddress: 'address invalidad',
                });
              });
            } else if (
              validator_1['default'].isEthereumAddress(value.Address)
            ) {
              setErrorMsg(function (prevState) {
                return __assign(__assign({}, prevState), { ErrAddress: '' });
              });
            }
            if (
              !(
                validator_1['default'].isEmail(value.Correo) &&
                value.Nombre.length >= 3 &&
                validator_1['default'].isAlpha(value.Nombre) &&
                validator_1['default'].isEthereumAddress(value.Address)
              )
            )
              return [3 /*break*/, 2];
            setError(false);
            return [4 /*yield*/, CrearUsuario()];
          case 1:
            _a.sent();
            _a.label = 2;
          case 2:
            return [2 /*return*/];
        }
      });
    });
  };
  var registrar = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        fetch('https://pandoraxapi1.herokuapp.com/api/CrearUsuario', {
          method: 'POST',
          body: JSON.stringify(value),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(function (res) {
            res.json();
            setStatus(res.status);
          })
          .then(function () {})
          ['catch'](function (error) {
            return console.error('Error:', error);
          });
        return [2 /*return*/];
      });
    });
  };
  var CrearUsuario = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var address, categoria, rango, txResult, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 5, , 6]);
            address = value.Address;
            categoria = value.Categoria;
            rango = value.Rango;
            return [4 /*yield*/, NFTROL_1.mint(address, categoria, rango)];
          case 1:
            txResult = _a.sent();
            if (!(txResult.status === 1)) return [3 /*break*/, 3];
            return [4 /*yield*/, registrar()];
          case 2:
            _a.sent();
            return [3 /*break*/, 4];
          case 3:
            setStatus(100);
            _a.label = 4;
          case 4:
            return [3 /*break*/, 6];
          case 5:
            error_1 = _a.sent();
            console.log(error_1);
            return [3 /*break*/, 6];
          case 6:
            return [2 /*return*/];
        }
      });
    });
  };
  react_1.useEffect(
    function () {
      setTimeout(function () {
        setStatus(0);
      }, 5000);
    },
    [status]
  );
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(next_seo_1.NextSeo, {
      title: 'Create new user',
      description: 'Criptic - React Next Web3 NFT Crypto Dashboard Template',
    }),
    React.createElement(
      'div',
      {
        className:
          'mx-auto w-[1060px] ml-[320px] justify-center self-center text-sm md:pt-14 4xl:pt-24 ',
      },
      React.createElement(
        'div',
        {
          className:
            'grid w-full grid-cols-1 gap-6 justify-center  xs:grid-cols-2 lg:grid-cols-3 ',
        },
        React.createElement(
          'div',
          { className: 'ml-60 w-full max-w-xs  justify-center' },
          React.createElement(
            'form',
            {
              className:
                'mb-4 rounded  bg-white px-8 pt-6 pb-8 shadow-md dark:bg-dark  ',
            },
            React.createElement(
              'div',
              { className: 'mb-3' },
              React.createElement(
                'label',
                {
                  className:
                    'mb-1 block text-sm font-bold text-gray-700 dark:text-white',
                },
                'Name'
              ),
              errorMsg.ErrNombre.length == 0
                ? React.createElement('input', {
                    onChange: function (e) {
                      return ChangeInfo('Nombre', e.target.value);
                    },
                    className:
                      'focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none',
                    id: 'username',
                    type: 'text',
                    placeholder: 'Name',
                  })
                : React.createElement('input', {
                    onChange: function (e) {
                      return ChangeInfo('Nombre', e.target.value);
                    },
                    className:
                      'focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none border-red-500',
                    id: 'username',
                    type: 'text',
                    placeholder: 'Name',
                  })
            ),
            error == true &&
              errorMsg.ErrNombre.length > 0 &&
              React.createElement(
                'span',
                {
                  className:
                    'flex items-center font-medium tracking-wide text-red-500 text-xs',
                },
                errorMsg.ErrNombre
              ),
            React.createElement(
              'div',
              { className: 'mb-3' },
              React.createElement(
                'label',
                {
                  className:
                    'mb-1 block text-sm font-bold text-gray-700 dark:text-white',
                },
                'Correo'
              ),
              errorMsg.ErrCorreo.length == 0
                ? React.createElement('input', {
                    onChange: function (e) {
                      return ChangeInfo('Correo', e.target.value);
                    },
                    className:
                      'focus:shadow-outline  w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none',
                    type: 'text',
                    id: 'Correo',
                    placeholder: 'Correo',
                  })
                : React.createElement('input', {
                    onChange: function (e) {
                      return ChangeInfo('Correo', e.target.value);
                    },
                    className:
                      'focus:shadow-outline  w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none border-red-500',
                    type: 'text',
                    id: 'Correo',
                    placeholder: 'Correo',
                  })
            ),
            error == true &&
              errorMsg.ErrCorreo.length > 0 &&
              React.createElement(
                'span',
                {
                  className:
                    'flex items-center font-medium tracking-wide text-red-500 text-xs',
                },
                errorMsg.ErrCorreo
              ),
            React.createElement(
              'div',
              { className: 'mb-3' },
              React.createElement(
                'label',
                {
                  className:
                    'mb-1 block text-sm font-bold text-gray-700 dark:text-white',
                },
                'Address Wallet'
              ),
              errorMsg.ErrAddress.length == 0
                ? React.createElement('input', {
                    onChange: function (e) {
                      return ChangeInfo('Address', e.target.value);
                    },
                    className:
                      'focus:shadow-outline  w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none',
                    type: 'text',
                    id: 'wallet',
                    placeholder: 'Address Wallet',
                  })
                : React.createElement('input', {
                    onChange: function (e) {
                      return ChangeInfo('Address', e.target.value);
                    },
                    className:
                      'focus:shadow-outline  w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none border-red-500',
                    type: 'text',
                    id: 'wallet',
                    placeholder: 'Address Wallet',
                  })
            ),
            error == true &&
              errorMsg.ErrAddress.length > 0 &&
              React.createElement(
                'span',
                {
                  className:
                    'flex mt-0 items-center font-medium tracking-wide text-red-500 text-xs',
                },
                errorMsg.ErrAddress
              ),
            React.createElement(
              'div',
              { className: 'mb-6' },
              React.createElement(
                'label',
                {
                  className:
                    'mb-1 block text-sm font-bold text-gray-700 dark:text-white',
                },
                'Categoria NFT'
              ),
              React.createElement(
                'select',
                {
                  onChange: function (e) {
                    return ChangeInfo('Categoria', e.target.value);
                  },
                  name: 'select',
                  className:
                    'focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none',
                  id: 'wallet',
                },
                React.createElement(
                  'option',
                  { value: 'Agente X' },
                  'Agente X '
                ),
                React.createElement(
                  'option',
                  { value: 'BlockMaker' },
                  'BlockMaker'
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'mb-6' },
              React.createElement(
                'label',
                {
                  className:
                    'mb-1 block text-sm font-bold text-gray-700 dark:text-white',
                },
                'Rango NFT'
              ),
              React.createElement(
                'select',
                {
                  onChange: function (e) {
                    return ChangeInfo('Rango', e.target.value);
                  },
                  name: 'select',
                  className:
                    'focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none',
                  id: 'wallet',
                },
                React.createElement('option', { value: 'Peerx' }, 'Peerx'),
                React.createElement(
                  'option',
                  { value: 'BlockElite' },
                  'BlockElite'
                ),
                React.createElement(
                  'option',
                  { value: 'BlockMaster' },
                  'BlockMaster'
                ),
                React.createElement(
                  'option',
                  { value: 'BlockCreator' },
                  'BlockCreator'
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'flex items-center justify-center' },
              React.createElement(
                button_1['default'],
                {
                  onClick: function () {
                    return registerUser();
                  },
                  className: 'focus:shadow-outline  rounded',
                  type: 'button',
                },
                'Crear Usuario'
              )
            )
          )
        )
      )
    ),
    status == 200 &&
      React.createElement(
        'div',
        {
          className:
            'p-4 mb-4 text-sm w-[300px] flex self-center justify-center ml-[580px] mt-[30px] text-green-700 bg-green-200 rounded-lg dark:bg-green-200 dark:text-green-800',
          role: 'alert',
        },
        React.createElement(
          'span',
          { className: 'font-medium' },
          'Usuario creado correctamente'
        )
      ),
    status == 100 &&
      React.createElement(
        'div',
        {
          className:
            'p-4 mb-4 text-sm w-[300px] ml-[580px] mt-[30px] self-center justify-center  text-red-700 bg-red-200 rounded-lg dark:bg-red-200 dark:text-red-800',
          role: 'alert',
        },
        React.createElement(
          'span',
          { className: 'font-medium' },
          'operacion fallo en el minteo'
        )
      )
  );
};
CreateUser.getLayout = function getLayout(page) {
  return React.createElement(_dashboard_1['default'], null, page);
};
exports['default'] = CreateUser;
