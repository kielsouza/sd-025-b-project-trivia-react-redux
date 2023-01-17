import { NEXT_QUESTION, RESET_INDEX } from '../actions';

const INITIAL_STATE = {
  questions: [],
  currentIndex: 0,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEXT_QUESTION: {
    return {
      ...state,
      currentIndex: state.currentIndex + action.payload,
    };
  }
  case RESET_INDEX: {
    return {
      ...state,
      currentIndex: action.payload,
    };
  }
  default: return state;
  }
};

export default gameReducer;
