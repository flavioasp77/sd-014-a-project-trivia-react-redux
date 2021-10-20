const INITIAL_STATE = {
  name: '',
  email: '',
  img: '',
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_USER':
    return {
      ...state,
      email: action.email,
      name: action.name,
      img: action.img,
    };
  default:
    return state;
  }
}
