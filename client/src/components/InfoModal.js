import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import styleHead from "../components/Head1.module.css";
import Scrollbar from "../components/Scrollbar";
import styleScrollbar from "../components/Scrollbar.module.css";
import TopicBox from "../components/TopicBox";
import styleTopicBox from "../components/TopicBox.module.css";

import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

const InfoModal = (props) => {
  const [name, setName] = useState("");
  const [loginId, setLoginId] = useState("");
  const [endPoint, setEndPoint] = useState();
  const [topicArray, setTopicArray] = useState([]);
  const accessToken = useSelector((state) => state.accesstoken.accessToken);
  const [ref, inView] = useInView({
    threshold: 0,
  });
  const navigate = useNavigate();

  const getUserProfile = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/profile/${props.userId}`
      );

      setLoginId(res.data.userObject.loginId);
      setName(res.data.userObject.name);
    } catch (error) {
      console.log(error);
    }
  };

  const topicClickHandler = (event, _id) => {
    navigate(`/topic/${_id}`);
  };

  const getUserTopic = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/topic/list`,
        { searchUser: props.userId, endPoint: endPoint },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.data.topicArray.length === 0) {
        return;
      } else {
        setTopicArray((prevArray) => [...prevArray, ...res.data.topicArray]);
        const lastIndex = res.data.topicArray.length - 1;
        setEndPoint(res.data.topicArray[lastIndex]._id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserProfile();
    if (inView) {
      getUserTopic();
    }
  }, [inView]);

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
          <div>작성한 토픽</div>
          <Scrollbar className={styleScrollbar.scrollbar_container}>
            {topicArray.map((topic) => (
              <TopicBox
                className={styleTopicBox.frame}
                key={topic._id}
                _id={topic._id}
                title={topic.title}
                onClick={(event) => topicClickHandler(event, topic._id)}
                date={topic.createdAt}
              />
            ))}
            <div style={{ marginTop: "20px" }} ref={ref}>
              더이상 조회할 토픽이 없음.
            </div>
          </Scrollbar>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
