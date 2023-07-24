import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
const InfoModal = (props) => {
  const [name, setName] = useState("");
  const [loginId, setLoginId] = useState("");
  const [endPoint, setEndPoint] = useState();
  const [topicArray, setTopicArray] = useState([]);
  const accessToken = useSelector((state) => state.accesstoken.accessToken);

  console.log(props.userId);
  const getUserProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3500/user/profile/${props.userId}`
      );
      setLoginId(res.data.userObject.loginId);
      setName(res.data.userObject.name);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserTopic = async () => {
    console.log("getUserTopic");
    try {
      const res = await axios.get(
        `http://localhost:3500/user/topic/${props.userId}`
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserProfile();
    getUserTopic();
  }, []);

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{props.title}</h2>
          <button className={styles.closeButton} onClick={props.onClose}>
            X
          </button>
        </div>
        <div className={styles.modalInfoBody}>
          <div style={{ marginBottom: "5px" }}>{name}님</div>
          <div style={{ marginBottom: "5px" }}>로그인한 ID : {loginId}</div>
          <div>작성한 토픽 :</div>
          <div>팔로워 수 : </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
