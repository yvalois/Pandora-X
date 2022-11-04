const initialState = {
  loading: false,
  dataloaded: false,
  error: null,
  errorMsg: null,
  disponibleNft: [],
  MintedNft: [],
  priceFormat: 0,
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
        disponibleNft: action.payload.disponibleNft,
        MintedNft: action.payload.MintedNft,
        priceFormat: action.payload.priceFormat,
      };
    case 'MINTED_ERROR':
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };

    default:
      return state;
  }
};

export default MintedReducer;
