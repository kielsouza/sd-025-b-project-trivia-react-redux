import { USER_LOGIN, USER_SCORE, USER_ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  score: 0,
  assertions: 0,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN: {
    return {
      ...state,
      email: action.payload.email,
      name: action.payload.name,
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

  default: return state;
  }
};

export default userReducer;
