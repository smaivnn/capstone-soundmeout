import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../modules/accesstoken";
import { setUser } from "../../modules/user";
import { oauthLogin } from "../../modules/login";
const NaverLoginController = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handler = async () => {
    const NAVER_CODE = new URLSearchParams(location.search).get("code");
    const NAVER_STATE = new URLSearchParams(location.search).get("state");

    const res = await axios.get("http://localhost:3500/auth/naver/callback", {
      params: {
        code: NAVER_CODE,
        state: NAVER_STATE,
      },
    });
    /* 액세스 토큰 저장 */
    dispatch(setAccessToken(res.data.accessToken));
    const decode = jwt_decode(res.data.accessToken);
    /* 디코딩된 액세스토큰의 정보 저장*/
    console.log("decode");

    console.log(decode.userInfo);
    dispatch(
      setUser(
        decode.userInfo.email,
        decode.userInfo.loginId,
        decode.userInfo.name
      )
    );
    dispatch(oauthLogin(true));
    navigate("/main");
  };

  useEffect(() => {
    console.log("useEffect");
    handler();
  }, []);

  return <div>Success!</div>;
};
export default NaverLoginController;
