import React, { useEffect, useState } from "react";
import Head1 from "../components/Head1";
import HeadStyle from "../components/Head1.module.css";
import Text from "../components/Text";
import styleText from "../components/Text.module.css";
import Button from "../components/Button";
import styleButton from "../components/Button.module.css";
import store from "../store";
import Scrollbar from "../components/Scrollbar";
import styleScrollbar from "../components/Scrollbar.module.css";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../modules/accesstoken";
import { setUser } from "../modules/user";
import { logout } from "../modules/login";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import styles from "../components/PostItModal.module.css";
import InfoModal from "../components/InfoModal";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.accesstoken.accessToken);
  const decode = jwt_decode(accessToken);
  const myId = decode.userInfo._id;
  const [following, setFollowing] = useState(0);
  const [follower, setFollower] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [userId, setUserId] = useState("");

  const toggleController = () => {
    setToggle(!toggle);
  };

  const clickInfoHandler = (event) => {
    const id = event.currentTarget.getAttribute("loginId");
    setShowInfoModal(true);
    setUserId(id);
  };

  useEffect(() => {
    getFollowingHandler();
    getFollowerHandler();
  }, []);

  const getFollowingHandler = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/follow/followings/${myId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setFollowing(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowerHandler = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/follow/followers/${myId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setFollower(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const info = store.getState().user;

  const LogoutHandler = () => {
    dispatch(setAccessToken(""));
    dispatch(setUser("", "", ""));
    dispatch(logout());
    alert("로그아웃 되었습니다.");
    navigate("/main");
  };

  return (
    <div>
      <Head1 className={HeadStyle.h1}>내 정보 </Head1>
      <Text className={styleText.frame}>
        <div>{info.name} 님</div>
        <div>{info.email}</div>
      </Text>
      <Head1 className={HeadStyle.h1}>친구 </Head1>
      <Text className={styleText.frame}>
        <div>팔로잉 : {following.length} 명</div>
        <div>팔로워 : {follower.length} 명</div>
      </Text>
      <Button
        className={styleButton.button_modalSmall}
        onClick={toggleController}
      >
        팔로우 목록 확인!
      </Button>
      {toggle ? (
        <div style={{ display: "flex" }}>
          <div style={{ flex: "1" }}>
            <Head1 className={HeadStyle.h2}>팔로워 목록</Head1>
            <Scrollbar className={styleScrollbar.scrollbar_container}>
              {follower.map((user) => (
                <Text key={user._id} className={styleText.frame_profile}>
                  <div style={{ marginBottom: "20px" }}>
                    <div>{user.name}</div>
                    <div>{user.loginId}</div>

                    <div>
                      <button
                        _id={user._id}
                        className={styles.submitButton}
                        onClick={clickInfoHandler}
                      >
                        정보 보기
                      </button>
                    </div>
                  </div>
                </Text>
              ))}
            </Scrollbar>
          </div>
          <div style={{ flex: "1" }}>
            <Head1 className={HeadStyle.h2}>팔로잉 목록</Head1>
            <Scrollbar className={styleScrollbar.scrollbar_container}>
              {following.map((user) => (
                <Text key={user._id} className={styleText.frame_profile}>
                  <div style={{ marginBottom: "20px" }}>
                    <div>{user.name}</div>
                    <div>{user.loginId}</div>

                    <button
                      _id={user._id}
                      className={styles.submitButton}
                      onClick={clickInfoHandler}
                    >
                      정보 보기
                    </button>
                  </div>
                </Text>
              ))}
            </Scrollbar>
          </div>
        </div>
      ) : (
        <div />
      )}

      <Button className={styleButton.button} onClick={LogoutHandler}>
        로그아웃
      </Button>
      <div style={{ marginBottom: "50px" }}></div>

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

export default Profile;
