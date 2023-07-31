import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../modules/accesstoken";
import { setUser } from "../../modules/user";
import { oauthLogin } from "../../modules/login";
const GoogleLoginController = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");

    const res = axios
      .get(`${process.env.REACT_APP_API_URL}/auth/google?code=${code}`)
      .then((res) => {
        if (res.status === 200) {
          const decode = jwt_decode(res.data.accessToken);
          dispatch(setAccessToken(res.data.accessToken));
          dispatch(setUser(decode.email, decode.loginId, decode.name));
          dispatch(oauthLogin(true));
          navigate("/main");
        } else {
          alert("로그인에 실패했습니다. 다시 시도해주세요.");
          navigate("/login");
        }
      });
  }, []);
};
export default GoogleLoginController;
