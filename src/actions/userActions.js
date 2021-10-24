import { getCategories } from '../services/apiTrivia';
import { setCategories } from './settingsActions';

export const SET_USER = 'SET_USER';

export const setUser = (payload) => ({ type: SET_USER, payload });

export const setCategoriesAPI = () => async (dispatch) => {
  const categories = await getCategories();
  dispatch(setCategories(categories));
};
