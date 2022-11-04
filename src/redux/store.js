import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import UsuarioReducer from './Usuario/UsuarioReducers';
import blockchainReducer from './Blockchain/blockchainReducer';
import MintedReducer from './Minted/MintedReducer';

const rootReducer = combineReducers({
  Usuario: UsuarioReducer,
  blockchain: blockchainReducer,
  minted: MintedReducer,
});

const middleware = [thunk];
const composeEnhancers = compose(applyMiddleware(...middleware));

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers);
};

const store = configureStore();

export default store;
