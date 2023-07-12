import React, { useEffect, useState } from "react";
import Scrollbar from "../components/Scrollbar";
import Head1 from "../components/Head1";
import styleScrollbar from "../components/Scrollbar.module.css";
import Thumbnail from "../components/Thumbnail";
import profile from "../img/logo.png";
import axios from "axios";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

const GetTopicList = () => {
  const loginId = useSelector((state) => state.user.loginId);
  const accessToken = useSelector((state) => state.accesstoken.accessToken);
  const [endPoint, setEndPoint] = useState();
  const [topicArray, setTopicArray] = useState([]);
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    threshold: 0,
  });
  console.log(loginId);
  const ThumbnailClickHandler = (event, _id) => {
    console.log(_id);
    navigate(`/topic/${_id}`);
  };
  useEffect(() => {
    if (inView) {
      getMyTopic();
    }
    // getMyPaper();
  }, [inView]);

  const getMyTopic = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3500/topic/list`,
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
        console.log(endPoint);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   const getMyPaper = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:3500/user/paper/${loginId}`
  //       );
  //       console.log(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <div>
      <Head1>나의 포스트</Head1>
      <Scrollbar className={styleScrollbar.scrollbar_container}>
        {topicArray.map((topic) => (
          <Thumbnail
            key={topic._id}
            _id={topic._id}
            title={topic.title}
            onClick={(event) => ThumbnailClickHandler(event, topic._id)}
            imageUrl={profile}
          />
          //   <Thumbnail
          //   imageUrl={profile}
          //   title="제목"
          //   onClick={ThumbnailClickHandler}
          // ></Thumbnail>
        ))}
        <div style={{ marginTop: "20px" }} ref={ref}>
          더이상 조회할 토픽이 없음.
        </div>
      </Scrollbar>
      <Head1>내가 작성한 페이퍼</Head1>
      <Scrollbar className={styleScrollbar.scrollbar_container}></Scrollbar>
    </div>
  );
};

export default GetTopicList;
