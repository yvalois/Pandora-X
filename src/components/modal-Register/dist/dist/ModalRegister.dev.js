'use strict';

var __assign =
  (void 0 && (void 0).__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
        }

        return t;
      };

    return __assign.apply(this, arguments);
  };

var __awaiter =
  (void 0 && (void 0).__awaiter) ||
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
  (void 0 && (void 0).__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function sent() {
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
      (g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2),
      }),
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

      while (_) {
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
              return {
                value: op[1],
                done: false,
              };

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
      }

      if (op[0] & 5) throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true,
      };
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

function ModalRegister() {
  var _this = this;

  var tiempoTranscurrido = Date.now();
  var hoy = new Date(tiempoTranscurrido);
  var accountAddress = react_redux_1.useSelector(function (state) {
    return state.blockchain;
  }).accountAddress;
  var NewUser = {
    Nombre: '',
    Correo: '',
    Address: accountAddress,
    Fecha: hoy.toLocaleDateString(),
    Rol: 'cliente',
    Telefono: 0,
  };

  var _a = react_1.useState(NewUser),
    value = _a[0],
    setValue = _a[1];

  var closeModal = context_1.useModal().closeModal;
  var dispatch = react_redux_1.useDispatch(); //const Usuario = useSelector((state: any) => state.Usuario);

  var ChangeInfo = function ChangeInfo(Dato, valor) {
    if (Dato == 'Nombre') {
      setValue(function (prevState) {
        return __assign(__assign({}, prevState), {
          Nombre: valor,
        });
      });
    } else if (Dato == 'Correo') {
      setValue(function (prevState) {
        return __assign(__assign({}, prevState), {
          Correo: valor,
        });
      });
    } else if (Dato == 'Telefono') {
      setValue(function (prevState) {
        return __assign(__assign({}, prevState), {
          Telefono: valor,
        });
      });
    }
  };

  var Registrar = function Registrar() {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        alert(accountAddress);

        try {
          fetch(process.env.BACKEND_API + '/CrearUsuario', {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(function (res) {
              return res.json();
            })
            .then(function () {
              dispatch(blockchainAction_2.connectWallet());
            })
            ['catch'](function (error) {
              return console.error('Error:', error);
            });
        } catch (error) {
          console.log(error);
        }

        return [
          2,
          /*return*/
        ];
      });
    });
  };
  /*const conectar = (accountAddress) => {
      fetch(`${process.env.BACKEND_API}/login/${accountAddress}`, {
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

  var disconnectWallet = function disconnectWallet() {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        //setAddress('');
        web3Modal && web3Modal.clearCachedProvider();
        dispatch(blockchainAction_1.disconectWallet());
        closeModal();
        return [
          2,
          /*return*/
        ];
      });
    });
  }; //botton y state

  return react_1['default'].createElement(
    react_1['default'].Fragment,
    null,
    react_1['default'].createElement(
      'div',
      {
        className:
          'relative z-50 mx-auto h-[580px] w-[880px] max-w-full rounded-lg bg-white px-9 py-16 dark:bg-light-dark',
      },
      react_1['default'].createElement(
        'button',
        {
          className:
            'absolute right-[25px] top-[25px] mb-4 flex h-[40px] w-[40px] items-center justify-center rounded-[50%] bg-black text-center   text-2xl font-medium uppercase dark:text-white',
          onClick: function onClick() {
            return disconnectWallet();
          },
        },
        react_1['default'].createElement(
          'span',
          {
            className:
              'block h-6 w-6 bg-transparent text-2xl text-white outline-none focus:outline-none',
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
            'mb-2 mt-[40px] block text-sm font-bold text-gray-700 dark:text-white',
        },
        'Nombre'
      ),
      react_1['default'].createElement('input', {
        onChange: function onChange(e) {
          return ChangeInfo('Nombre', e.target.value);
        },
        className:
          'focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none',
        id: 'username',
        type: 'text',
        placeholder: 'Nombre',
      }),
      react_1['default'].createElement(
        'label',
        {
          className:
            'mb-2 mt-[20px] block text-sm font-bold text-gray-700 dark:text-white',
        },
        'Correo'
      ),
      react_1['default'].createElement('input', {
        onChange: function onChange(e) {
          return ChangeInfo('Correo', e.target.value);
        },
        className:
          'focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none',
        id: 'username',
        type: 'text',
        placeholder: 'Correo',
      }),
      react_1['default'].createElement(
        'label',
        {
          className:
            'mb-2 mt-[20px] block text-sm font-bold text-gray-700 dark:text-white',
        },
        'Numero'
      ),
      react_1['default'].createElement('input', {
        onChange: function onChange(e) {
          return ChangeInfo('Telefono', e.target.value);
        },
        className:
          'focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none',
        id: 'username',
        type: 'text',
        placeholder: 'Numero',
      }),
      react_1['default'].createElement(
        'button',
        {
          onClick: function onClick() {
            return Registrar();
          },
          className:
            ' mt-[70px] flex h-14 w-full cursor-pointer items-center justify-center rounded-lg bg-gradient-to-l from-[#ffdc24] to-[#ff5c00] px-4 text-base text-white transition-all hover:-translate-y-0.5',
        },
        react_1['default'].createElement('span', null, 'Registrarse'),
        react_1['default'].createElement('span', {
          className: 'h-auto w-9',
        })
      )
    )
  );
}

exports['default'] = ModalRegister;
