import React, { useEffect } from "react";
import Scrollbar from "../components/Scrollbar";
import Head1 from "../components/Head1";
import styleScrollbar from "../components/Scrollbar.module.css";
import Thumbnail from "../components/Thumbnail";
import profile from "../img/logo.png";
import store from "../store";
import axios from "axios";
import { useSelector } from "react-redux";

const Home = () => {
  const loginId = useSelector((state) => state.user.loginId);
  console.log(loginId);
  const ThumbnailClickHandler = () => {
    console.log("ThumbnailClickHandler");
  };
  useEffect(() => {
    getMyTopic();
    getMyPaper();
  }, []);

  const getMyTopic = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3500/user/topic/${loginId}`
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMyPaper = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3500/user/paper/${loginId}`
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Head1>나의 포스트</Head1>
      <Scrollbar className={styleScrollbar.scrollbar_container}>
        <Thumbnail
          imageUrl={profile}
          title="제목"
          onClick={ThumbnailClickHandler}
        ></Thumbnail>
        <Thumbnail imageUrl={profile} title="제목"></Thumbnail>
        <Thumbnail imageUrl={profile} title="제목"></Thumbnail>
        <Thumbnail imageUrl={profile} title="제목"></Thumbnail>
      </Scrollbar>
      <Head1>내가 작성한 페이퍼</Head1>
      <Scrollbar className={styleScrollbar.scrollbar_container}></Scrollbar>
    </div>
  );
};

export default Home;
