import { NEXT_QUESTION } from '../actions';

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
  default: return state;
  }
};

export default gameReducer;
