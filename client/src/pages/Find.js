import React, { useState } from "react";
import axios from "axios";
import Head1 from "../components/Head1";
import HeadStyle from "../components/Head1.module.css";

import Input from "../components/Input";
import styleInput from "../components/Input.module.css";
import Scrollbar from "../components/Scrollbar";
import styleScrollbar from "../components/Scrollbar.module.css";
import Button from "../components/Button";
import styleButton from "../components/Button.module.css";
import Text from "../components/Text";
import styleText from "../components/Text.module.css";
import styles from "../components/PostItModal.module.css";
import InfoModal from "../components/InfoModal";
import { useSelector } from "react-redux";
const Find = () => {
  const accessToken = useSelector((state) => state.accesstoken.accessToken);
  const [searchId, setSearchId] = useState("");
  const [userArray, setUserArray] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [userId, setUserId] = useState("");
  const searchIdChangeHandler = (event) => {
    setSearchId(event.target.value);
  };

  const clickInfoHandler = (event) => {
    const id = event.currentTarget.getAttribute("loginId");
    setShowInfoModal(true);
    setUserId(id);
  };

  const getUserInfo = async () => {
    if (!searchId) {
      alert("검색할 ID를 입력해주세요.");
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/search/${searchId}`
      );
      setUserArray(res.data.userArray);
    } catch (error) {
      console.log(error);
    }
  };

  const followClickHandler = async (event) => {
    const id = event.currentTarget.getAttribute("_id");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/follow/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error) {
      if (error.response.status === 400) {
        alert("이미 팔로우한 사람입니다.");
      } else if (error.response.status === 404) {
        alert("존재하지 않는 유저입니다.");
      }
    }
  };

  return (
    <div>
      <Head1 className={HeadStyle.h1}>친구 찾기</Head1>
      <div style={{ marginBottom: "30px" }}></div>
      <Input
        className={styleInput.input}
        placeholder="이메일 ID를 입력하세요."
        onChange={searchIdChangeHandler}
      >
        친구 이름 입력
      </Input>
      <Button onClick={getUserInfo} className={styleButton.button_modalSmall}>
        검색
      </Button>
      <Head1 className={HeadStyle.h1}>검색 결과</Head1>
      <Scrollbar className={styleScrollbar.scrollbar_bigger}>
        {userArray.map((user) => (
          <Text key={user._id} className={styleText.frame}>
            <div style={{ marginBottom: "20px" }}>
              <div>{user.name}</div>

              <div>
                <button
                  loginid={user.loginId}
                  className={styles.submitButton}
                  onClick={clickInfoHandler}
                >
                  정보 보기
                </button>
                <button
                  _id={user._id}
                  className={styles.submitButton}
                  onClick={followClickHandler}
                >
                  Follow
                </button>
              </div>
            </div>
          </Text>
        ))}
      </Scrollbar>
      {showInfoModal && (
        <InfoModal
          title="친구 정보"
          onClose={() => setShowInfoModal(false)}
          userId={userId}
        ></InfoModal>
      )}
    </div>
  );
};

export default Find;
