const initialState = {
  loading: false,
  account: '',
  errorMsg: '',
  rol: '',
  nombre: '',
  isConnect: false,
};

const UsuariosReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CONNECTION_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'CONNECTION_SUCCESS':
      return {
        ...state,
        loading: false,
        account: action.payload.account,
        //smartContract: action.payload.smartContract,
        //web3: action.payload.web3,
        //rol: action.payload.rol,
        //nombre: action.payload.nombre,
        isConnect: true,
      };
    case 'CONNECTION_FAILED':
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
      };
    case 'UPDATE_ACCOUNT':
      return {
        ...state,
        account: action.payload.account,
        rol: action.payload.rol,
        nombre: action.payload.nombre,
      };
    case 'DISCONECT_WALLET':
      return initialState;
    case 'CONNECT_TO_MONGO':
      return {
        ...state,
        loading: false,
        rol: action.payload.rol,
        nombre: action.payload.nombre,
      };
    default:
      return state;
  }
};

export default UsuariosReducer;
