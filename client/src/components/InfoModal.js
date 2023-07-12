import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const InfoModal = (props) => {
  const [name, setName] = useState("");
  const [loginId, setLoginId] = useState("");
  const getUserProfile = async () => {
    try {
      console.log("getUserProfile");
      console.log(props.userId);
      const res = await axios.get(
        `http://localhost:3500/user/profile/${props.userId}`
      );
      console.log(res.data.userObject);
      setName(res.data.userObject.name);
      setLoginId(res.data.userObject.loginId);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserTopic = async () => {
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
          <div>{loginId}</div>
          <div>작성한 토픽 :</div>
          <div>팔로워 수 : </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
