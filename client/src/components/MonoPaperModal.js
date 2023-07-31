import React, { useState } from "react";
import styles from "./PostItModal.module.css";
import InputStyle from "./Input.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Head1 from "./Head1";
const MonoPaperModal = (props) => {
  const [text, setText] = useState("");
  const accessToken = useSelector((state) => state.accesstoken.accessToken);

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
        { paper_id: props.paperid },
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

  const deletePaperHandler = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:3500/paper/delete`,
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
        <div>
          {visible === "true" ? null : <Head1>비공개 페이퍼입니다.</Head1>}
          <button className={styles.submitButton} onClick={deletePaperHandler}>
            삭제 하기!
          </button>
          {visible === "true" ? (
            <button
              className={styles.submitButton}
              onClick={updatePaperHandler}
            >
              비공개하기!
            </button>
          ) : (
            <button
              className={styles.submitButton}
              onClick={updatePaperHandler}
            >
              공개하기!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonoPaperModal;
