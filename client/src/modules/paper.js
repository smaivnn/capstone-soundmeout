// Action Types
const SET_PAPER = "user/SET_PAPER";

// Initial State
const initialState = {
  paperArray: [],
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_PAPER:
      return {
        ...state,
        paperArray: action.payload.paperArray,
      };
    default:
      return state;
  }
}

// Action Creators
export function setPaper(paperArray) {
  return {
    type: SET_PAPER,
    payload: {
      paperArray,
    },
  };
}
