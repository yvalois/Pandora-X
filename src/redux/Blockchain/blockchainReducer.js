const initialState = {
  loading: false,
  dataloaded: false,
  error: null,
  errorMsg: null,
  usdtContract: null,
  tokenContract: null,
  //busdContract: null,
  //usdcContract: null,
  //daiContract: null,
  productoMinter: null,
  inversionMinter: null,
  accountAddress: '',
  //usdtBalance: null,
  //busdBalance: null,
  //usdcBalance: null,
  //daiBalance: null,
  inventoryp: [],
  inventoryi: [],
  isConnect: false,
  rol: '',
  nombre: '',
  instance: null,
  isUser: null,
};

const blockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'DATA_LOADED':
      return {
        ...state,
        loading: false,
        dataloaded: true,
        //usdtContract: action.payload.usdtContract,
        tokenContract: action.payload.tokenContract,
        //busdContract: action.payload.busdContract,
        //usdcContract: action.payload.usdcContract,
        //daiContract: action.payload.daiContract,
        productoMinter: action.payload.productoMinter,
        inversionMinter: action.payload.inversionMinter,
        accountAddress: action.payload.accountAddress,
        //usdtBalance: action.payload.usdtBalance,
        //tokenBalance: action.payload.usdtBalance,
        //busdBalance: action.payload.busdBalance,
        //usdcBalance: action.payload.usdcBalance,
        //daiBalance: action.payload.daiBalance,
        inventoryp: action.payload.inventoryp,
        inventoryi: action.payload.inventoryi,
        isConnect: true,
        isUser: true,
      };
    case 'ERROR':
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case 'UPDATE_BALANCE':
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: null,
        //usdtBalance: action.payload.usdtBalance,
        //tokenBalance: action.payload.tokenBalance,
        //busdBalance: action.payload.busdBalance,
        //usdcBalance: action.payload.usdcBalance,
        //daiBalance: action.payload.daiBalance,
        inventoryp: action.payload.inventoryp,
        inventoryi: action.payload.inventoryi,
      };
    case 'LOGOUT':
      return {
        initialState,
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
    case 'REGISTER':
      return {
        ...state,
        isUser: false,
      };
    default:
      return state;
  }
};

export default blockchainReducer;
