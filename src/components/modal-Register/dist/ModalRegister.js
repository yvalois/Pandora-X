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
var react_1 = require('react');
var context_1 = require('@/components/modal-views/context');
var blockchainAction_1 = require('../../redux/Blockchain/blockchainAction');
var react_redux_1 = require('react-redux');
var web3modal_1 = require('web3modal');
var web3_provider_1 = require('@walletconnect/web3-provider');
var blockchainAction_2 = require('../../redux/Blockchain/blockchainAction');
var validator_1 = require('validator');
var button_1 = require('@/components/ui/button');
var NFTROL_1 = require('@/NFTROL');
require('react-phone-number-input/style.css');
var react_phone_number_input_1 = require('react-phone-number-input');
function ModalRegister() {
  var _this = this;
  var tiempoTranscurrido = Date.now();
  var hoy = new Date(tiempoTranscurrido);
  var accountAddress = react_redux_1.useSelector(function (state) {
    return state.blockchain;
  }).accountAddress;
  var rol = react_redux_1.useSelector(function (state) {
    return state.Usuario;
  }).rol;
  var NewUser = {
    Nombre: '',
    Id: '',
    Correo: '',
    Address: accountAddress,
    Fecha: hoy.toLocaleDateString(),
    Rol: 'cliente',
    Telefono: '',
    IsReferido: false,
    Referidor: '',
    Range: '',
    Type: '',
  };
  var Err = {
    ErrNombre: '',
    ErrId: '',
    ErrCorreo: '',
    ErrTelefono: '',
  };
  var _a = react_1.useState(NewUser),
    value = _a[0],
    setValue = _a[1];
  var _b = react_1.useState(false),
    error = _b[0],
    setError = _b[1];
  var _c = react_1.useState(Err),
    errorMsg = _c[0],
    setErrorMsg = _c[1];
  var _d = react_1.useState(false),
    success = _d[0],
    setSuccess = _d[1];
  var _e = react_1.useState(0),
    status = _e[0],
    setStatus = _e[1];
  var _f = react_1.useState(''),
    referidor = _f[0],
    setReferidor = _f[1];
  var _g = react_1.useState(''),
    tipo = _g[0],
    setTipo = _g[1];
  var _h = react_1.useState(''),
    rango = _h[0],
    setRango = _h[1];
  var _j = react_1.useState(''),
    value1 = _j[0],
    setValue1 = _j[1];
  var closeModal = context_1.useModal().closeModal;
  var dispatch = react_redux_1.useDispatch();
  //const Usuario = useSelector((state: any) => state.Usuario);
  var ChangeInfo = function (Dato, valor) {
    if (Dato == 'Nombre') {
      setValue(function (prevState) {
        return __assign(__assign({}, prevState), { Nombre: valor });
      });
    } else if (Dato == 'Correo') {
      setValue(function (prevState) {
        return __assign(__assign({}, prevState), { Correo: valor });
      });
    } else if (Dato == 'Telefono') {
      setValue(function (prevState) {
        return __assign(__assign({}, prevState), { Telefono: valor });
      });
    } else if (Dato == 'Id') {
      setValue(function (prevState) {
        return __assign(__assign({}, prevState), { Id: valor });
      });
    }
  };
  var RegistrarBD = function () {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        try {
          fetch('https://pandoraxapi1.herokuapp.com/api/CrearUsuario', {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(function (res) {
              res.json();
              if (res.status == 200) {
                setStatus(res.status);
              } else {
                setStatus(100);
              }
            })
            .then(function () {
              //ver posibilidad de que primero se mande un alert que diga usuario creado y 5 segundos despues en un timeout se llame esta funcion
              setTimeout(function () {
                dispatch(blockchainAction_2.connectWallet());
                setStatus(0);
                window.localStorage.removeItem('Wallet');
              }, 3000);
            })
            ['catch'](function (error) {
              return console.error('Error:', error);
            });
        } catch (error) {
          console.log(error);
        }
        return [2 /*return*/];
      });
    });
  };
  var Registrar = function () {
    return __awaiter(_this, void 0, void 0, function () {
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
            if (value1.length < 10) {
              setError(true);
              setErrorMsg(function (prevState) {
                return __assign(__assign({}, prevState), {
                  ErrTelefono: 'Este campo debe tener minimo 10 caracteres',
                });
              });
            } else if (!validator_1['default'].isNumeric(value1)) {
              setError(true);
              setErrorMsg(function (prevState) {
                return __assign(__assign({}, prevState), {
                  ErrTelefono: 'Solo se permiten numeros',
                });
              });
            } else if (
              value1.length >= 10 &&
              validator_1['default'].isNumeric(value1)
            ) {
              setErrorMsg(function (prevState) {
                return __assign(__assign({}, prevState), { ErrTelefono: '' });
              });
            }
            if (referidor.length > 0) {
            }
            if (
              !(
                value1 >= 10 &&
                validator_1['default'].isNumeric(value1) &&
                validator_1['default'].isEmail(value.Correo) &&
                value.Nombre.length >= 3 &&
                validator_1['default'].isAlpha(value.Nombre)
              )
            )
              return [3 /*break*/, 2];
            alert('a');
            setError(false);
            return [4 /*yield*/, RegistrarBD()];
          case 1:
            _a.sent();
            _a.label = 2;
          case 2:
            return [2 /*return*/];
        }
      });
    });
  };
  /*const conectar = (accountAddress) => {
      fetch(`https://pandoraxapi1.herokuapp.com/api/login/${accountAddress}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((response) => {
          if (response !== null) {
            dispatch(
              connectSuccessToMongo({
                rol: response.Rol,
                nombre: response.Nombre,
              })
    
            );
            
          } else {
            dispatch(
              register()
            );
          }
        });
    };*/
  var providerOptions = {
    walletconnect: {
      package: web3_provider_1['default'],
      options: {
        chainId: 31337,
      },
    },
  };
  var web3Modal =
    typeof window !== 'undefined' &&
    new web3modal_1['default']({
      cacheProvider: true,
      providerOptions: providerOptions,
    }); //agregar provider options
  var disconnectWallet = function () {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        //setAddress('');
        web3Modal && web3Modal.clearCachedProvider();
        dispatch(blockchainAction_1.disconectWallet());
        closeModal();
        return [2 /*return*/];
      });
    });
  };
  react_1.useEffect(
    function () {
      function fetchData() {
        return __awaiter(this, void 0, void 0, function () {
          var a, _exist, type_1, range_1;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                a = window.localStorage.getItem('Wallet');
                return [4 /*yield*/, NFTROL_1.exist(a)];
              case 1:
                _exist = _a.sent();
                if (!(_exist == true)) return [3 /*break*/, 4];
                return [4 /*yield*/, NFTROL_1.getType(a)];
              case 2:
                type_1 = _a.sent();
                return [4 /*yield*/, NFTROL_1.getRange(a)];
              case 3:
                range_1 = _a.sent();
                setValue(function (prevState) {
                  return __assign(__assign({}, prevState), { Referidor: a });
                });
                setValue(function (prevState) {
                  return __assign(__assign({}, prevState), { Range: range_1 });
                });
                setValue(function (prevState) {
                  return __assign(__assign({}, prevState), { Type: type_1 });
                });
                setValue(function (prevState) {
                  return __assign(__assign({}, prevState), {
                    IsReferido: _exist,
                  });
                });
                return [3 /*break*/, 5];
              case 4:
                window.location.href = '/';
                _a.label = 5;
              case 5:
                return [2 /*return*/];
            }
          });
        });
      }
      fetchData();
    },
    [referidor]
  );
  //botton y state
  return react_1['default'].createElement(
    react_1['default'].Fragment,
    null,
    react_1['default'].createElement(
      'div',
      {
        className:
          'relative z-50 mx-auto h-[480px] w-[400px] max-w-full rounded-lg bg-white px-9 py-16 dark:bg-light-dark',
      },
      react_1['default'].createElement(
        'button',
        {
          className:
            'absolute right-[25px] top-[25px] mb-2 flex h-[20px] w-[20px] items-center justify-center rounded-[50%] bg-black text-center   text-2xl font-medium uppercase dark:text-white',
          onClick: function () {
            return disconnectWallet();
          },
        },
        react_1['default'].createElement(
          'span',
          {
            className:
              'blockbg-transparent text-sm text-white outline-none focus:outline-none',
          },
          'X'
        )
      ),
      react_1['default'].createElement(
        'h2',
        {
          className:
            'mb-4 text-center text-2xl font-medium uppercase text-gray-900 dark:text-white',
        },
        'Registrarse'
      ),
      react_1['default'].createElement(
        'label',
        {
          className:
            ' mt-[20px] block text-sm font-bold text-gray-700 dark:text-white',
        },
        'Nombre'
      ),
      errorMsg.ErrNombre.length == 0
        ? react_1['default'].createElement('input', {
            onChange: function (e) {
              return ChangeInfo('Nombre', e.target.value);
            },
            className:
              'focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none',
            id: 'username',
            type: 'text',
            placeholder: 'Nombre',
          })
        : react_1['default'].createElement('input', {
            onChange: function (e) {
              return ChangeInfo('Nombre', e.target.value);
            },
            className:
              'focus:shadow-outline w-full appearance-none rounded border border-red-500 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none',
            id: 'username',
            type: 'text',
            placeholder: 'Nombre',
          }),
      error == true &&
        errorMsg.ErrNombre.length > 0 &&
        react_1['default'].createElement(
          'span',
          {
            className:
              'mt-1 ml-1 flex items-center text-xs font-medium tracking-wide text-red-500',
          },
          errorMsg.ErrNombre
        ),
      error == true &&
        errorMsg.ErrId.length > 0 &&
        react_1['default'].createElement(
          'span',
          {
            className:
              'mt-1 ml-1 flex items-center text-xs font-medium tracking-wide text-red-500',
          },
          errorMsg.ErrId
        ),
      react_1['default'].createElement(
        'label',
        {
          className:
            ' mt-[20px] block text-sm font-bold text-gray-700 dark:text-white',
        },
        'Correo'
      ),
      errorMsg.ErrCorreo.length == 0
        ? react_1['default'].createElement('input', {
            onChange: function (e) {
              return ChangeInfo('Correo', e.target.value);
            },
            className:
              'focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none',
            id: 'username',
            type: 'text',
            placeholder: 'Correo',
          })
        : react_1['default'].createElement('input', {
            onChange: function (e) {
              return ChangeInfo('Correo', e.target.value);
            },
            className:
              'focus:shadow-outline w-full appearance-none rounded border border-red-500 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none',
            id: 'username',
            type: 'text',
            placeholder: 'Correo',
          }),
      error == true &&
        errorMsg.ErrCorreo.length > 0 &&
        react_1['default'].createElement(
          'span',
          {
            className:
              'mt-1 ml-1 flex items-center text-xs font-medium tracking-wide text-red-500',
          },
          errorMsg.ErrCorreo
        ),
      react_1['default'].createElement(
        'label',
        {
          className:
            ' mt-[20px] block text-sm font-bold text-gray-700 dark:text-white',
        },
        'Telefono'
      ),
      errorMsg.ErrTelefono.length == 0
        ? react_1['default'].createElement(
            react_phone_number_input_1['default'],
            {
              onChange: setValue1,
              value: value1,
              className:
                'focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none',
              id: 'username',
              type: 'text',
              placeholder: 'Numero',
            }
          )
        : react_1['default'].createElement(
            react_phone_number_input_1['default'],
            {
              onChange: setValue1,
              value: value1,
              className:
                'focus:shadow-outline w-full appearance-none rounded border border-red-500 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none',
              id: 'username',
              type: 'text',
              placeholder: 'Numero',
            }
          ),
      errorMsg.ErrTelefono.length > 0 &&
        react_1['default'].createElement(
          'span',
          {
            className:
              'mt-1 ml-1 flex items-center text-xs font-medium tracking-wide text-red-500',
          },
          errorMsg.ErrTelefono
        ),
      react_1['default'].createElement(
        button_1['default'],
        {
          onClick: function () {
            return Registrar();
          },
          className:
            ' color-primary mt-[35px] flex h-14 w-full cursor-pointer items-center justify-center rounded-lg bg-gradient-to-l',
        },
        react_1['default'].createElement('span', null, 'Registrarse'),
        react_1['default'].createElement('span', { className: 'h-auto w-9' })
      )
    ),
    status == 200 &&
      react_1['default'].createElement(
        'div',
        {
          className:
            'mb-4 ml-[60px] mt-[30px] flex w-[300px] justify-center self-center rounded-lg bg-green-200 p-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800',
          role: 'alert',
        },
        react_1['default'].createElement(
          'span',
          { className: 'font-medium' },
          'Usuario creado correctamente'
        )
      ),
    status == 100 &&
      react_1['default'].createElement(
        'div',
        {
          className:
            'mb-4 ml-[60px] mt-[30px] w-[300px]  justify-center self-center rounded-lg bg-red-200  p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800',
          role: 'alert',
        },
        react_1['default'].createElement(
          'span',
          { className: 'font-medium' },
          'operacion fallo en el minteo'
        )
      )
  );
}
exports['default'] = ModalRegister;
