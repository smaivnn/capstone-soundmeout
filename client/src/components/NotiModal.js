import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";

import Scrollbar from "./Scrollbar";
import ScrollbarStyle from "./Scrollbar.module.css";
import Text from "./Text";
import styleText from "./Text.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
const Modal = (props) => {
  const accessToken = useSelector((state) => state.accesstoken.accessToken);
  const notiArray = props.notiArray;

  const notiClickHandler = async (event) => {
    const notiId = event.target.id;
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/noti/read/${notiId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.data.success) {
        alert("알림을 읽었습니다.");
        window.location.href = "/main";
      }
    } catch (err) {
      console.log(err);
      alert("알림을 읽는데 실패했습니다.");
    }
  };
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{props.title}</h2>
          <button className={styles.closeButton} onClick={props.onClose}>
            X
          </button>
        </div>

        <div className={styles.modalBody}>
          <Scrollbar className={ScrollbarStyle.scrollbar_bigger}>
            {notiArray.map((noti) => (
              <Text
                className={styleText.frame}
                id={noti._id}
                key={noti._id}
                onClick={notiClickHandler}
              >
                {noti.category}
                {noti._id}
              </Text>
            ))}
          </Scrollbar>
        </div>
      </div>
    </div>
  );
};

export default Modal;
