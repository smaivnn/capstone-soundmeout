import React, { useState, useEffect } from "react";
import Head1 from "../components/Head1";
import styleHead from "../components/Head1.module.css";
import PostItList from "../components/PostItList";
import axios from "axios";
import styleButton from "../components/AddPostIt.module.css";
import PostItModal from "../components/PostItModal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";
import Header from "../components/Header";
const Topic = (props) => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login.isLoggedin);
  const userId = useSelector((state) => state.user.loginId);
  const [visible, setVisible] = useState("false");
  const accessToken = useSelector((state) => state.accesstoken.accessToken);
  const [paperArray, setPaperArray] = useState([]);
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(true);
  const { topicId } = props;
  const [showAddPostIt, setShowAddPostIt] = useState(false);
  const [postItTextValue, setPostItTextValue] = useState("");
  const [topicTitle, setTopicTitle] = useState("");
  const [endPoint, setEndPoint] = useState();
  const [ref, inView] = useInView({
    threshold: 0,
  });
  console.log("accessToken", accessToken);
  const handleScroll = () => {
    setShowButton(window.scrollY === 0);
  };
  //토픽 내 페이퍼 받아오기
  const getPaper = async () => {
    console.log(inView);
    try {
      console.log("getPaper");
      const res = await axios.post(
        `http://localhost:3500/paper/list/${topicId}`,
        { endPoint: endPoint },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("paper response");

      if (res.data.paperArray.length === 0) {
      } else {
        setPaperArray((prevArray) => [...prevArray, ...res.data.paperArray]);
        const lastIndex = res.data.paperArray.length - 1;
        setEndPoint(res.data.paperArray[lastIndex]._id);
        console.log(paperArray, "paperArray");
      }
    } catch (error) {
      console.log(error);
    }
  };
  ///useEffect - 페이지가 재렌더링될때마다 토픽,페이퍼 최신화
  useEffect(() => {
    const getTopic = async () => {
      try {
        console.log("getTopic");
        const res = await axios.get(`http://localhost:3500/topic/${topicId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (res.status === 200) {
          setVisible(res.data.result.visible);
          setTopicTitle(res.data.result.title);
          console.log("토픽 비저블 상태", res.data.result.visible, visible);
          setVisible(visible);
          if (inView) {
            getPaper();
          }
        } else {
          alert("권한이 없습니다.");
        }
      } catch (error) {
        alert("존재하지 않거나 비공개된 토픽입니다.");
        window.history.back();
      }
    };

    getTopic();
  }, [visible, inView, paperArray]);

  // useEffect(() => {
  //   setVisible(visible);
  //   if (inView) {
  //     getPaper();
  //   }
  // }, [inView, paperArray]);
  //토픽 삭제
  const deleteTopic = async () => {
    console.log("deleteTopic");

    console.log(topicId);
    try {
      const res = await axios.patch(
        `http://localhost:3500/topic/delete/${topicId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.status === 200) {
        alert("토픽이 삭제되었습니다.");
        navigate("/main");
      }
    } catch (error) {
      console.log(error);
    }
  };

  ///토픽 관련끝
  //페이퍼 관련 부분
  //페이퍼의 텍스트값 받아오기
  const handleTextValue = (text) => {
    setPostItTextValue(text);
  };

  //페이퍼를 작성해서 서버에 보내는 버튼
  const postItSubmitButton = async () => {
    console.log("postItSubmitButton");
    try {
      const data = {
        text: postItTextValue,
        topic_id: topicId,
        redirectPath: `topic/${topicId}`,
      };
      console.log(data);
      const res = await axios.post("http://localhost:3500/paper/create", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.status === 200) {
        alert("페이퍼가 등록되었습니다.");
        console.log("paper response");
        console.log(res.data);
        setShowAddPostIt(false);
        navigate(`/topic/${topicId}`);
        window.location.reload();
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addPostItButttonController = () => {
    if (!login) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
    } else {
      setShowAddPostIt(true);
    }
  };
  const handleCloseModal = () => {
    setShowAddPostIt(false);
  };
  /////페이퍼 끝
  window.addEventListener("scroll", handleScroll);

  return (
    <div>
      <div>
        <Header
          visible={visible}
          deleteTopic={deleteTopic}
          useTopicMenuButton="true"
          topicId={topicId}
        ></Header>
        {visible ? null : (
          <Head1 className={styleHead.h2}>비공개 토픽입니다.</Head1>
        )}
        {showAddPostIt ? (
          <PostItModal
            onTextChange={handleTextValue}
            onClose={handleCloseModal}
            onClick={postItSubmitButton}
          ></PostItModal>
        ) : null}
        <Head1 className={styleHead.h1}>{topicTitle}</Head1>
        {showButton ? (
          <button
            className={styleButton.button}
            onClick={addPostItButttonController}
          >
            Add PostIt!
          </button>
        ) : null}

        <PostItList posts={paperArray}></PostItList>
        <div ref={ref}>페이퍼의 마지막입니다!</div>
      </div>
    </div>
  );
};

export default Topic;
