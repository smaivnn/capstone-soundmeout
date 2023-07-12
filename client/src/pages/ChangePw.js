import React, { useState } from "react";
import Head1 from "../components/Head1";
import Button from "../components/Button";
import styleButton from "../components/Button.module.css";
import Input from "../components/Input";
import styleInput from "../components/Input.module.css";
import Box from "../components/Box";
import { useSelector } from "react-redux";

const ChangePw = () => {
  const isOauth = useSelector((state) => state.login.oauthLogin);
  const [prevPw, setPrevPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPwCheck, setNewPwCheck] = useState("");

  const prevPwChangeHandler = (event) => {
    setPrevPw(event.target.value);
  };
  const newPwChangeHandler = (event) => {
    setNewPw(event.target.value);
  };
  const newPwCheckChangeHandler = (event) => {
    setNewPwCheck(event.target.value);
  };

  return (
    <div>
      {isOauth ? (
        <Head1>
          간편로그인 회원은 <br />
          비밀번호를 <br />
          변경할 수 없습니다.
        </Head1>
      ) : (
        <div>
          <Head1>비밀번호 변경 </Head1>
          <div style={{ marginBottom: "60px" }}></div>
          <Input
            className={styleInput.input}
            placeholder="기존 비밀번호를 입력하세요."
            valid="true"
            onChange={prevPwChangeHandler}
          >
            기존 비밀번호
          </Input>
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
          <Button className={styleButton.button}>비밀번호 변경</Button>
        </div>
      )}
    </div>
  );
};

export default ChangePw;
