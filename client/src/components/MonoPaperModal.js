import React, { useState } from "react";
import styles from "./PostItModal.module.css";
import InputStyle from "./Input.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Head1 from "./Head1";
import { useLocation } from "react-router-dom";
import Input from "./Input";

const MonoPaperModal = (props) => {
  const [text, setText] = useState("");

  const accessToken = useSelector((state) => state.accesstoken.accessToken);
  const _id = useSelector((state) => state.user._id);
  const isMyPaper = props.author === _id;
  console.log(props.author, _id, isMyPaper);

  const location = useLocation();
  const redirectPath =
    location.pathname.split("/")[1] + "/" + location.pathname.split("/")[2];

  const visible = props.isvisible;
  const handleChange = (event) => {
    const value = event.target.value;
    setText(value);
    props.onTextChange(value);
  };

  const updatePaperHandler = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/paper/visible`,
        { paper_id: props.paperid, redirectURL: redirectPath },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        alert("페이퍼가 수정되었습니다.");
        window.location.reload();
      }
    } catch (error) {
      alert("페이퍼 수정에 실패했습니다 : 권한이 없습니다.");
      console.log(error);
    }
  };
  const handleComment = (event) => {
    const value = event.target.value;
    setText(value);
  };
  const sendCommentHandler = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/comment/create`,
        {
          paper_id: props.paperid,
          text: text,
          redirectURL: redirectPath,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        alert("댓글이 등록되었습니다.");
        window.location.reload();
      }
    } catch (error) {
      alert("댓글 등록에 실패했습니다.");
      console.log(error);
    }
  };

  const deletePaperHandler = async () => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/paper/delete`,
        { paper_id: props.paperid, redirectPath: `topic/${props.topicId}` },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        alert("페이퍼가 삭제되었습니다.");
        window.location.reload();
      }
    } catch (error) {
      alert("페이퍼 삭제에 실패했습니다 : 권한이 없습니다.");
      console.log(error);
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2></h2>
          <button className={styles.closeButton} onClick={props.onClose}>
            X
          </button>
        </div>
        <div
          className={styles.modalBody}
          style={{ backgroundColor: `${props.color}` }}
        >
          <div className={InputStyle.input_showPaper} onChange={handleChange}>
            {props.text}
          </div>
        </div>
        {visible === "true" ? null : <Head1>비공개 페이퍼입니다.</Head1>}
        {props.mytopic || isMyPaper ? (
          <button className={styles.submitButton} onClick={deletePaperHandler}>
            삭제 하기!
          </button>
        ) : null}
        {props.mytopic && visible !== "true" ? (
          <button className={styles.submitButton} onClick={updatePaperHandler}>
            공개하기!
          </button>
        ) : null}
        {props.mytopic && visible === "true" ? (
          <button className={styles.submitButton} onClick={updatePaperHandler}>
            비공개하기!
          </button>
        ) : null}

        <div>
          <div style={{ height: "30px" }}></div>
          {props.mytopic ? (
            <div>
              <h2>포스트잇을 남겨준 사람에게 고마움을 표시하세요!</h2>
              <Input className={InputStyle.input} onChange={handleComment}>
                포스트잇을 남겨준 사람에게 고마움을 표시하세요!
              </Input>
              <button className={styles.submitButton}>고마움 표시하기!</button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MonoPaperModal;
