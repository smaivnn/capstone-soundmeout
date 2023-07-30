import React, { useState } from "react";
import Head1 from "../components/Head1";
import HeadStyle from "../components/Head1.module.css";
import Button from "../components/Button";
import styleButton from "../components/Button.module.css";
import Input from "../components/Input";
import styleInput from "../components/Input.module.css";

import axios from "axios";

const FindPw = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const findPassWordHandler = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/find-password`,
        {
          email,
          name,
        }
      );
      alert("이메일로 임시 비밀번호를 발송했습니다.");
    } catch (err) {
      console.log(err);
      alert("비밀번호 찾기에 실패했습니다.");
    }
  };

  return (
    <div>
      <div>
        <Head1 className={HeadStyle.h1}>비밀번호 찾기 </Head1>
        <div style={{ marginBottom: "60px" }}></div>
        <Input
          className={styleInput.input}
          placeholder="사용하시는 이메일을 입력하세요."
          valid="true"
          onChange={emailChangeHandler}
        >
          이메일
        </Input>
        <Input
          className={styleInput.input}
          placeholder="이름을 입력하세요."
          valid="true"
          onChange={nameChangeHandler}
        >
          이름
        </Input>

        <Button className={styleButton.button} onClick={findPassWordHandler}>
          비밀번호 찾기!
        </Button>
      </div>
    </div>
  );
};

export default FindPw;
