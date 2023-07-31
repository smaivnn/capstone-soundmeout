import React, { useEffect, useState } from "react";
import Head1 from "../components/Head1";
import HeadStyle from "../components/Head1.module.css";
import Button from "../components/Button";
import styleButton from "../components/Button.module.css";
import Input from "../components/Input";
import styleInput from "../components/Input.module.css";
import { useLocation } from "react-router-dom";

import axios from "axios";

const FindAndChangPw = () => {
  const [password, setPassword] = useState("");
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  const code = new URLSearchParams(location.search).get("code");
  const [accessToken, setAccessToken] = useState("");
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const codeController = async () => {
    console.log(email, code);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/find-password/callback`,
        { params: { email: email, code: code } }
      );

      setAccessToken(res.data.accessToken);
    } catch (err) {
      console.log(err);
      alert("비밀번호 변경에 실패했습니다.");
    }
  };

  const changePasswordHandler = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/find-password/update-password`,
        { newPassword: password },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert("비밀번호 변경에 성공했습니다.");
    } catch (err) {
      console.log(err);
      alert("비밀번호 변경에 실패했습니다.");
    }
  };

  useEffect(() => {
    codeController();
  }, [email, code]);

  return (
    <div>
      <div>
        <Head1 className={HeadStyle.h1}>비밀번호 변경 </Head1>
        <div style={{ marginBottom: "60px" }}></div>
        <Input
          className={styleInput.input}
          placeholder="새로운 비밀번호를 입력하세요."
          valid="true"
          onChange={passwordChangeHandler}
        >
          새로운 비밀번호
        </Input>
        <Button className={styleButton.button} onClick={changePasswordHandler}>
          비밀번호 변경
        </Button>
      </div>
    </div>
  );
};

export default FindAndChangPw;
