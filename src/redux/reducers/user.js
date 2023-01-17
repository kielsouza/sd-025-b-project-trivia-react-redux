import { USER_LOGIN, USER_SCORE, USER_ASSERTIONS, RESET_SCORE } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  score: 0,
  assertions: 0,
  picture: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN: {
    return {
      ...state,
      email: action.payload.email,
      name: action.payload.name,
      picture: action.payload.picture,
    };
  }
  case USER_SCORE: {
    return {
      ...state,
      score: state.score + action.payload,
    };
  }
  case USER_ASSERTIONS: {
    return {
      ...state,
      assertions: state.assertions + action.payload,
    };
  }
  case RESET_SCORE: {
    return {
      ...state,
      score: action.payload,
    };
  }

  default: return state;
  }
};

export default userReducer;
