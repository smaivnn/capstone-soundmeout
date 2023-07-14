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
  console.log("accessToken", accessToken);
  const getUserProfile = async () => {
    try {
      console.log("getUserProfile");
      console.log(props.userId);
      const res = await axios.get(
        `http://localhost:3500/user/profile/${props.userId}`
      );
      if (res.data.topicArray.length === 0) {
        return;
      } else {
        setTopicArray((prevArray) => [...prevArray, ...res.data.topicArray]);
        const lastIndex = res.data.topicArray.length - 1;
        setEndPoint(res.data.topicArray[lastIndex]._id);
        console.log(endPoint);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserTopic = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3500/topic/list`,
        { searchUser: props.userId, endPoint: endPoint },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
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
          <div>{name}님</div>
          <div>로그인한 ID : {loginId}</div>
          <div>작성한 토픽 :</div>
          <div>팔로워 수 : </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
