import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// Para visualização da store a cada atualização
store.subscribe(() => {
  // console.log(store.getState());
});

// Criado por conta do cypress
if (window.Cypress) {
  window.store = store;
}

export default store;
