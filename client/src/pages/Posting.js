import React, { useState } from "react";
import Input from "../components/Input";
import styleInput from "../components/Input.module.css";
import Button from "../components/Button";
import styleButton from "../components/Button.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
const Posting = () => {
  const accessToken = useSelector((state) => state.accesstoken.accessToken);
  const [title, setTitle] = useState("");

  const decode = jwt_decode(accessToken);
  console.log(decode.userInfo);
  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async () => {
    if (!title) {
      alert("제목을 입력해주세요.");
      return;
    }
    const res = await axios.post(
      "http://localhost:3500/topic/create",
      {
        title: title,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(res.data);

    alert("글이 등록되었습니다.");
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <Input
        className={styleInput.input}
        placeholder="제목을 입력하세요."
        valid="true"
        onChange={titleChangeHandler}
      >
        글제목
      </Input>

      <Button className={styleButton.button} onClick={handleSubmit}>
        글쓰기
      </Button>
    </div>
  );
};

export default Posting;
