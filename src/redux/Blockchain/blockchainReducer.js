const initialState = {
  loading: false,
  dataloaded: false,
  error: null,
  errorMsg: null,
  usdtContract: null,
  busdContract: null,
  usdcContract: null,
  daiContract: null,
  nudaraMinter: null,
  accountAddress: null,
  usdtBalance: null,
  busdBalance: null,
  usdcBalance: null,
  daiBalance: null,
  inventory: [],
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
        usdtContract: action.payload.usdtContract,
        busdContract: action.payload.busdContract,
        usdcContract: action.payload.usdcContract,
        daiContract: action.payload.daiContract,
        nudaraMinter: action.payload.nudaraMinter,
        accountAddress: action.payload.accountAddress,
        usdtBalance: action.payload.usdtBalance,
        busdBalance: action.payload.busdBalance,
        usdcBalance: action.payload.usdcBalance,
        daiBalance: action.payload.daiBalance,
        inventory: action.payload.inventory,
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
        usdtBalance: action.payload.usdtBalance,
        busdBalance: action.payload.busdBalance,
        usdcBalance: action.payload.usdcBalance,
        daiBalance: action.payload.daiBalance,
        inventory: action.payload.inventory,
      };
    case 'LOGOUT':
      return {
        initialState,
      };
    default:
      return state;
  }
};

export default blockchainReducer;
