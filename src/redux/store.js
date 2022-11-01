import {
  applyMiddleware,
  compose,
  createStore,
  combineReducers,
} from 'react-redux';
//import thunk from 'redux-thunk';
import UsuarioReducer from './Usuario/UsuarioReducers';

const rootReducer = combineReducers({
  Usuario: UsuarioReducer,
});

const middleware = [thunk];
//const composeEnhancers = compose(applyMiddleware(...middleware));

const configureStore = () => {
  return createStore(rootReducer /* composeEnhancers*/);
};

const store = configureStore();

export default store;
