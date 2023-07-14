import React, { useEffect, useState } from "react";
import Head1 from "../components/Head1";
import Text from "../components/Text";
import Thumbnail from "../components/Thumbnail";
import profile from "../img/logo.png";
import styleText from "../components/Text.module.css";
import Button from "../components/Button";
import styleButton from "../components/Button.module.css";
import store from "../store";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../modules/accesstoken";
import { setUser } from "../modules/user";
import { oauthLogin } from "../modules/login";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.accesstoken.accessToken);
  const decode = jwt_decode(accessToken);
  const myId = decode.userInfo._id;
  const [following, setFollowing] = useState(0);
  const [follower, setFollower] = useState(0);
  useEffect(() => {
    getFollowingHandler();
    getFollowerHandler();
  }, []);

  const getFollowingHandler = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3500/follow/followings/${myId}`
      );
      setFollowing(res.data.result.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowerHandler = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3500/follow/followers/${myId}`
      );
      setFollower(res.data.result.length);
    } catch (error) {
      console.log(error);
    }
  };
  const info = store.getState().user;
  console.log(info);

  const LogoutHandler = () => {
    dispatch(setAccessToken(""));
    dispatch(setUser("", "", ""));
    dispatch(oauthLogin(false));
    alert("로그아웃 되었습니다.");
    navigate("/main");
  };

  return (
    <div>
      <Head1>내 정보 </Head1>
      <Text className={styleText.frame}>
        <div>{info.name} 님</div>
        <div>{info.email}</div>
      </Text>
      <Head1>친구 </Head1>
      <Text className={styleText.frame}>
        <div>팔로잉 : {following} 명</div>
        <div>팔로워 : {follower} 명</div>
        <div>게시물 : 3개</div>
        <div>받은 포스트잇 :34개</div>
      </Text>
      <Button className={styleButton.button_modalSmall}>
        팔로우 목록 확인!
      </Button>
      <Head1>최근 게시한 글 </Head1>
      <Text className={styleText.frame_currentTopic}>
        <Thumbnail imageUrl={profile} title="Topic ex>1"></Thumbnail>
        <Thumbnail imageUrl={profile} title="Topic ex>2"></Thumbnail>
      </Text>
      <Button className={styleButton.button} onClick={LogoutHandler}>
        로그아웃
      </Button>
      <div style={{ marginBottom: "50px" }}></div>
    </div>
  );
};

export default Profile;
