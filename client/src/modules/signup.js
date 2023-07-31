import axios from "axios";
// 회원가입 액션 타입 정의
const SIGNUP_REQUEST = "auth/SIGNUP_REQUEST";
const SIGNUP_SUCCESS = "auth/SIGNUP_SUCCESS";
const SIGNUP_FAILURE = "auth/SIGNUP_FAILURE";

// 회원가입 액션 생성자 함수
export const signupRequest = () => ({ type: SIGNUP_REQUEST });
export const signupSuccess = () => ({ type: SIGNUP_SUCCESS });
export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

// 회원가입 비동기 액션 생성자 함수
export const signup = (id, name, email, password) => async (dispatch) => {
  dispatch(signupRequest());
  try {
    const data = {
      loginId: id,
      name: name,
      email: email,
      password: password,
    };

    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/signup`,
      data
    );

    dispatch(signupSuccess());
    return res.data;
  } catch (error) {
    dispatch(signupFailure(error));
  }
};

// 초기 상태 정의
const initialState = {
  loading: false,
  error: null,
};

// 리듀서 함수 정의
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
