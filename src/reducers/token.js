import {REQUEST} from './actionType'

const INITIAL_TOKEN = {
  token: ''
}

function playerToken(state = INITIAL_TOKEN, action) {
  switch (action.type) {
    case REQUEST:
      return {...state, token: action.payload.token}
    default:
      return state;
  }
}

export default playerToken;