// Action Types
const SET_USER = 'user/SET_USER';

// Initial State
const initialState = {
  email: '',
  loginId: '',
  name: '',
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        email: action.payload.email,
        loginId: action.payload.loginId,
        name: action.payload.name,
      };
    default:
      return state;
  }
}

// Action Creators
export function setUser(email, loginId, name) {
  return {
    type: SET_USER,
    payload: {
      email,
      loginId,
      name,
    },
  };
}
