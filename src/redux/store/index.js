import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const store = createStore(
  rootReducer,
  // trivia,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;

if (window.Cypress) {
  window.store = store;
}
