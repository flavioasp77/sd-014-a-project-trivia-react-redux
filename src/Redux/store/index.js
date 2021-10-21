import { createStore } from 'redux';
import rootReducer from '../reducers';

const store = createStore(rootReducer);

store.subscribe(() => {
  console.log(store.getState());
});

if (window.Cypress) {
  window.store = store;
}

export default store;
