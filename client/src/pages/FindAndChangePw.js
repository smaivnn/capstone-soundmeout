import React, { useState } from "react";
import Head1 from "../components/Head1";
import HeadStyle from "../components/Head1.module.css";
import Button from "../components/Button";
import styleButton from "../components/Button.module.css";
import Input from "../components/Input";
import styleInput from "../components/Input.module.css";

import { useSelector } from "react-redux";
import axios from "axios";

const FindAndChangPw = () => {
  const accessToken = useSelector((state) => state.accesstoken.accessToken);

  const [newPw, setNewPw] = useState("");
  const [newPwCheck, setNewPwCheck] = useState("");

  const newPwChangeHandler = (event) => {
    setNewPw(event.target.value);
  };
  const newPwCheckChangeHandler = (event) => {
    setNewPwCheck(event.target.value);
  };

  const changePwHandler = async () => {
    if (newPw !== newPwCheck) {
      alert("새로운 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/update-password`,
        {
          newPassword: newPw,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      alert("비밀번호가 변경되었습니다.");
    } catch (err) {
      console.log(err);
      alert("비밀번호 변경에 실패했습니다.");
    }
  };

  return (
    <div>
      <div>
        <Head1 className={HeadStyle.h1}>비밀번호 변경 </Head1>
        <div style={{ marginBottom: "60px" }}></div>

        <Input
          className={styleInput.input}
          placeholder="새로 사용할 비밀번호를 입력하세요."
          valid="true"
          onChange={newPwChangeHandler}
        >
          새로운 비밀번호
        </Input>
        <Input
          className={styleInput.input}
          placeholder="비밀번호 확인을 위해 동일한 비밀번호를 입력하세요."
          valid="true"
          onChange={newPwCheckChangeHandler}
        >
          비밀번호 확인
        </Input>
        <Button className={styleButton.button} onClick={changePwHandler}>
          비밀번호 변경
        </Button>
      </div>
    </div>
  );
};

export default FindAndChangPw;
