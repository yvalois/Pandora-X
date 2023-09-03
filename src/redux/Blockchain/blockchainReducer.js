const initialState = {
  loading: false,
  dataloaded: false,
  error: null,
  errorMsg: null,
  tokenContract: null,
  usdtContract: null,
  maticContract: null,
  //busdContract: null,
  //usdcContract: null,
  //daiContract: null,
  productoMinter: null,
  inversionMinter: null,
  frenchiesMinter: null,
  frenchiesMinter2: null,
  stakingfrenPContract: null,
  stakingfrenEContract: null,
  ventasContract: null,
  auctionContract: null,
  ofertasContract: null,
  //  stakinfETH: null,
  //  stakingPOL: null,
  staking: null,
  NftAccessContract: null,
  accountAddress: '',
  //usdtBalance: null,
  //busdBalance: null,
  //usdcBalance: null,
  //daiBalance: null,
  inventoryp: [],
  inventoryi: [],
  inventorys: [],
  inventoryf: [],
  inventoryf2: [],
  inventorys: [],
  inventorysf: [],
  isConnect: false,
  rol: '',
  nombre: '',
  instance: null,
  isUser: null,
  paid: [],
  paids: [],
  balanceI: [0],
  chainId: 1,
  frenchies: null,
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
        tokenContract: action.payload.tokenContract,
        maticContract: action.payload.maticContract,
        //busdContract: action.payload.busdContract,
        //usdcContract: action.payload.usdcContract,
        //daiContract: action.payload.daiContract,
        productoMinter: action.payload.productoMinter,
        inversionMinter: action.payload.inversionMinter,
        frenchiesMinter: action.payload.frenchiesMinter,
        frenchiesMinter2: action.payload.frenchiesMinter2,
        stakingfrenPContract: action.payload.stakingfrenPContract,
        stakingfrenEContract: action.payload.stakingfrenEContract,
        NftAccessContract: action.payload.NftAccessContract,
        ventasContract: action.payload.ventasContract,
        auctionContract: action.payload.auctionContract,
        ofertasContract: action.payload.ofertasContract,
        //stakinfETH: action.payload.stakinfETH,
        //stakingPOL: action.payload.stakingPOL,
        staking: action.payload.staking,
        accountAddress: action.payload.accountAddress,
        //usdtBalance: action.payload.usdtBalance,
        //tokenBalance: action.payload.usdtBalance,
        //busdBalance: action.payload.busdBalance,
        //usdcBalance: action.payload.usdcBalance,
        //daiBalance: action.payload.daiBalance,
        inventoryp: action.payload.inventoryp,
        inventoryi: action.payload.inventoryi,
        inventorys: action.payload.inventorys,
        inventoryf: action.payload.inventoryf,
        inventoryf2: action.payload.inventoryf2,

        inventorysf: action.payload.inventorysf,
        isConnect: true,
        isUser: true,
        balanceI: action.payload.balancei,
        chainId: action.payload.chainId,
        frenchiess: action.payload.frenchies,
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
        inventorys: action.payload.inventorys,
      };
    case 'LOGOUT':
      return {
        initialState,
      };
    case 'DISCONECT_WALLET':
      return {
        loading: false,
        dataloaded: false,
        error: null,
        errorMsg: null,
        tokenContract: null,
        usdtContract: null,
        maticContract: null,
        //busdContract: null,
        //usdcContract: null,
        //daiContract: null,
        productoMinter: null,
        inversionMinter: null,
        frenchiesMinter: null,
        frenchiesMinter2: null,
        stakingfrenPContract: null,
        stakingfrenEContract: null,
        ventasContract: null,
        auctionContract: null,
        ofertasContract: null,
        //  stakinfETH: null,
        //  stakingPOL: null,
        staking: null,
        NftAccessContract: null,
        accountAddress: '',
        //usdtBalance: null,
        //busdBalance: null,
        //usdcBalance: null,
        //daiBalance: null,
        inventoryp: [],
        inventoryi: [],
        inventorys: [],
        inventoryf: [],
        inventoryf2: [],
        inventorys: [],
        inventorysf: [],
        isConnect: false,
        rol: '',
        nombre: '',
        instance: null,
        isUser: null,
        paid: [],
        paids: [],
        balanceI: [0],
        chainId: 1,
        frenchies: null,
      };
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
    case 'ADD_PAID':
      return {
        ...state,
        paid: action.payload.pagos,
      };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        inventoryp: action.payload.inventoryp,
      };
    case 'UPDATE_INVERTION':
      return {
        ...state,
        inventoryi: action.payload.inventoryi,
      };
    case 'UPDATE_STAKING':
      return {
        ...state,
        inventorys: action.payload.inventorys,
      };
    case 'UPDATE_STAKINGF':
      return {
        ...state,
        inventorysf: action.payload.inventorysf,
      };
    case 'UPDATE_FRENCH':
      return {
        ...state,
        inventoryf: action.payload.inventoryf,
      };
    case 'UPDATE_FRENCH2':
      return {
        ...state,
        frenchiess: action.payload.frenchies,
      };
    default:
      return state;
  }
};

export default blockchainReducer;
