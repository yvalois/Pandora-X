const initialState = {
  Transactions: [],
};

const TransactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TRANSATION':
      return {
        Transactions: action.payload.Transactions,
      };
    default:
      return state;
  }
};

export default TransactionsReducer;
