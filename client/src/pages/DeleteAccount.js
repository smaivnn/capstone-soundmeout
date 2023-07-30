import React, { useState } from "react";
import Head1 from "../components/Head1";
import Button from "../components/Button";
import styleButton from "../components/Button.module.css";
import Input from "../components/Input";
import styleInput from "../components/Input.module.css";
import HeadStyle from "../components/Head1.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
const DeleteAccount = () => {
  const accessToken = useSelector((state) => state.accesstoken.accessToken);
  const [passWord, setPassword] = useState("");

  const pwChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const pwDeleteHandler = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/leave`,
        {
          password: passWord,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      alert("계정이 삭제되었습니다.");
    } catch (err) {
      console.log(err);
      alert("계정 삭제에 실패했습니다.");
    }
  };
  return (
    <div>
      <Head1 className={HeadStyle.h1}>계정 탈퇴</Head1>
      <div style={{ marginBottom: "60px" }}></div>
      <Input
        className={styleInput.input}
        placeholder="기존 비밀번호를 입력하세요."
        valid="true"
        onChange={pwChangeHandler}
      >
        기존 비밀번호
      </Input>

      <Button className={styleButton.button} onClick={pwDeleteHandler}>
        계정 탈퇴
      </Button>
    </div>
  );
};

export default DeleteAccount;
