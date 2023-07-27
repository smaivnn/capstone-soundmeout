import React, { useState } from "react";
import Box from "../components/Box";
import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";
import Kakao from "./login/Kakao";
import { useNavigate } from "react-router-dom";
import styleButton from "../components/Button.module.css";
import styleInput from "../components/Input.module.css";
import GoogleLogin from "./login/GoogleLogin";
import NaverLogin from "./login/NaverLogin";
import { useDispatch } from "react-redux";
import { localLogin, login, oauthLogin } from "../modules/login";
import { setAccessToken } from "../modules/accesstoken";
import { setUser } from "../modules/user";
import jwt_decode from "jwt-decode";
import store from "../store";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const idChangeHandler = (event) => {
    setId(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await dispatch(login(id, password));

      console.log(res.data);
      if (
        !store.getState().login.loading &&
        store.getState().login.error === null &&
        res &&
        id &&
        password
      ) {
        dispatch(setAccessToken(res.data.accessToken));
        const decode = jwt_decode(res.data.accessToken);
        console.log("decode");
        console.log(decode.userInfo);

        /* 디코딩된 액세스토큰의 정보 저장*/
        dispatch(
          setUser(
            decode.userInfo.email,
            decode.userInfo.loginId,
            decode.userInfo.name
          )
        );
        dispatch(localLogin(true));
        console.log(res.status);
        navigate("/main");
      }
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with an error status code
        alert(error.response.data); // Set the server error message to the state
      } else if (error.request) {
        // The request was made but no response was received (e.g., network error)
        alert("Network Error");
      } else if (!id || !password) {
        alert("아이디와 비밀번호를 입력해주세요.");
      } else {
        // Something else happened while setting up the request
        alert("일치하지 않는 정보입니다.");
      }
    }
  };

  return (
    <div>
      <Header />
      <Box>이메일 ID로 로그인</Box>
      <Input
        className={styleInput.input}
        placeholder="이메일 ID를 입력하세요."
        valid="true"
        onChange={idChangeHandler}
      >
        ID
      </Input>
      <Input
        className={styleInput.input}
        placeholder="비밀번호를 입력하세요."
        valid="true"
        type="password"
        onChange={passwordChangeHandler}
      >
        PASSWORD
      </Input>
      <Button className={styleButton.button} onClick={handleSubmit}>
        로그인 하기!
      </Button>
      <Box>SNS 계정으로 로그인</Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Kakao />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <GoogleLogin />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <NaverLogin />
      </div>
      <Box>아직 회원이 아니신가요?</Box>
      <Button
        className={styleButton.button}
        onClick={() => {
          navigate("/signup");
        }}
      >
        회원가입
      </Button>
    </div>
  );
};

export default Login;
