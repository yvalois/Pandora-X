const initialState = {
  loading: false,
  dataloaded: false,
  error: null,
  errorMsg: null,
  inversiones: [],
  productos: [],
  frenchs: [],
};

const MintedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MINTED_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'MINTED_LOADED':
      return {
        ...state,
        loading: false,
        dataloaded: true,
        inversiones: action.payload.inversiones,
        productos: action.payload.productos,
      };
    case 'MINTED_ERROR':
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case 'UPDATE_FRENCH':
      return {
        ...state,
        frenchies: action.payload,
      };

    default:
      return state;
  }
};

export default MintedReducer;
