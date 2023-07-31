import React, { useEffect, useState } from "react";
import Head1 from "../components/Head1";
import styleHead from "../components/Head1.module.css";
import Scrollbar from "../components/Scrollbar";
import styleScrollbar from "../components/Scrollbar.module.css";
import TopicBox from "../components/TopicBox";
import styleTopicBox from "../components/TopicBox.module.css";
import profile from "../img/logo.png";
import axios from "axios";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const loginId = useSelector((state) => state.user.loginId);
  const accessToken = useSelector((state) => state.accesstoken.accessToken);
  const [endPoint, setEndPoint] = useState();
  const [topicArray, setTopicArray] = useState([]);
  const [paperArray, setPaperArray] = useState([]);
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    threshold: 0,
  });
  const topicClickHandler = (event, _id) => {
    navigate(`/topic/${_id}`);
  };
  useEffect(() => {
    if (inView) {
      getMyTopic();
    }
    getMyPaper();
  }, [inView]);

  const getMyTopic = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/topic/list`,
        { searchUser: loginId, endPoint: endPoint },
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

  const getMyPaper = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/paper/${loginId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setPaperArray(res.data.paperArray);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Head1 className={styleHead.h1}>나의 포스트</Head1>
      <Scrollbar className={styleScrollbar.scrollbar_container}>
        {topicArray.map((topic) => (
          <TopicBox
            className={styleTopicBox.frame}
            key={topic._id}
            _id={topic._id}
            title={topic.title}
            onClick={(event) => topicClickHandler(event, topic._id)}
            imageUrl={profile}
            date={topic.createdAt}
          />
        ))}
        <div style={{ marginTop: "20px" }} ref={ref}>
          더이상 조회할 토픽이 없음.
        </div>
      </Scrollbar>
      <Head1 className={styleHead.h1}>내가 작성한 페이퍼</Head1>
      <Scrollbar className={styleScrollbar.scrollbar_container}>
        {paperArray.map((paper) => (
          <TopicBox
            className={styleTopicBox.frame}
            key={paper._id}
            _id={paper._id}
            title={paper.text}
            onClick={(event) => topicClickHandler(event, paper.topic)}
            imageUrl={profile}
            date={paper.createdAt}
          />
        ))}
      </Scrollbar>
    </div>
  );
};

export default Home;
