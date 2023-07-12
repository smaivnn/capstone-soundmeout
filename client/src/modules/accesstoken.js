// 액션 타입 정의
const SET_ACCESS_TOKEN = 'auth/SET_ACCESS_TOKEN';

// 액션 생성자 함수
export const setAccessToken = (accessToken) => ({
  type: SET_ACCESS_TOKEN,
  payload: accessToken,
});

// reducers.js

// 초기 상태
const initialState = {
  accessToken: null,
};

// 리듀서
const  authReducer = (state = initialState, action) =>{
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };
    default:
      return state;
  }
}

export default authReducer;