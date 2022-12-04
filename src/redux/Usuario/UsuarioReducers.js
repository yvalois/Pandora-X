const initialState = {
  loading: false,
  account: '',
  errorMsg: '',
  rol: '',
  nombre: '',
  isConnect: false,
  isReferido: false,
  referidor: '',
  range: '',
  type: '',
  categoria: '',
  rango: '',
  paid: [],
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
        isreferido: action.payload.isreferido,
        referidor: action.payload.referidor,
        range: action.payload.range,
        type: action.payload.type,
        categoria: action.payload.categoria,
        rango: action.payload.rango,
        paid: action.payload.paid,
      };
    default:
      return state;
  }
};

export default UsuariosReducer;
