import { SET_CATEGORIES, SET_NEW_SETTINGS } from '../actions/indexActions';

const INITIAL_STATE = {
  categories: [],
  chosedSettings: {
    howMuch: 5,
    category: '',
    difficulty: '',
    type: '',
  },
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_CATEGORIES:
    return {
      ...state,
      categories: action.payload.trivia_categories,
    };
  case SET_NEW_SETTINGS:
    return {
      ...state,
      chosedSettings: action.payload,
    };
  default:
    return state;
  }
};

export default settings;
