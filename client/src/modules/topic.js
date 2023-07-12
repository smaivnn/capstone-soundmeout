// Action Types
const SET_TOPIC = "user/SET_TOPIC";

// Initial State
const initialState = {
  topicArray: [],
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_TOPIC:
      return {
        ...state,
        topicArray: action.payload.topicArray,
      };
    default:
      return state;
  }
}

// Action Creators
export function setTopic(topicArray) {
  return {
    type: SET_TOPIC,
    payload: {
      topicArray,
    },
  };
}
