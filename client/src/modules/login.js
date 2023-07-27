import axios from "axios";
// 로그인 액션 타입 정의
const LOGIN_REQUEST = "auth/LOGIN_REQUEST";
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGIN_FAILURE = "auth/LOGIN_FAILURE";
const OAUTH_LOGIN = "auth/OAUTH_LOGIN";
const LOCAL_LOGIN = "auth/LOCAL_LOGIN";
const LOGOUT = "auth/LOGOUT";

// 로그인 액션 생성자 함수
export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = () => ({ type: LOGIN_SUCCESS });
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

// 로그인 비동기 액션 생성자 함수
export const login = (id, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const data = {
      loginId: id,
      password: password,
    };
    console.log("fetching,,,");
    console.log(data);
    const res = await axios.post(
      "http://localhost:3500/auth/login",

      data,
      {
        withCredentials: true,
      }
    );
    dispatch(loginSuccess());
    console.log("login res");
    console.log(res);
    return res;
  } catch (error) {
    dispatch(loginFailure(error));
  }
};
export const localLogin = (isLoggedin) => ({
  type: LOCAL_LOGIN,
  payload: isLoggedin,
});

export const oauthLogin = (isLoggedin) => ({
  type: OAUTH_LOGIN,
  payload: isLoggedin,
});

export const logout = () => ({
  type: LOGOUT,
});

// 초기 상태 정의
const initialState = {
  loading: false,
  error: null,
  isLoggedin: false,
  oauthLogin: false,
};

// 리듀서 함수 정의
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        isLoggedin: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isLoggedin: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isLoggedin: false,
      };
    case OAUTH_LOGIN:
      return {
        ...state,
        isLoggedin: action.payload,
        oauthLogin: true,
      };
    case LOCAL_LOGIN:
      return {
        ...state,
        isLoggedin: action.payload,
        oauthLogin: false,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedin: false,
        oauthLogin: false,
      };

    default:
      return state;
  }
};

export default authReducer;
