import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../modules/accesstoken";
import { setUser } from "../../modules/user";
import { oauthLogin } from "../../modules/login";
import axios from "axios";
import jwt_decode from "jwt-decode";
const KakaoLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const KAKAO_CODE = location.search.split("=")[1];
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const SendKakaoCode = async () => {
    try {
      const data = {
        code: KAKAO_CODE,
      };
      console.log("starting axios");
      const res = await axios.post("http://localhost:3500/auth/kakao", data);
      if (res.status === 200) {
        const decode = jwt_decode(res.data.accessToken);

        dispatch(setAccessToken(res.data.accessToken));
        /* 디코딩된 액세스토큰의 정보 저장*/
        dispatch(setUser(decode.email, decode.loginId, decode.name));
        dispatch(oauthLogin(true));
        navigate("/main");
      } else {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    SendKakaoCode();
    console.log("useEffect");
  }, []);

  return isLoading ? <div>Loading...</div> : <div>Success!</div>;
};

export default KakaoLogin;
