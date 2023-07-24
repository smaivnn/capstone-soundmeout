import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";
import Button from "./Button";
import styleButton from "./Button.module.css";
import Scrollbar from "./Scrollbar";
import ScrollbarStyle from "./Scrollbar.module.css";
import Text from "./Text";
import styleText from "./Text.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
const Modal = (props) => {
  const accessToken = useSelector((state) => state.accesstoken.accessToken);
  const [notiArray, setNotiArray] = useState([]);
  useEffect(() => {
    getNoti();
  }, []);
  const getNoti = async () => {
    const res = await axios.get("http://localhost:3500/notification/check", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.data.success) {
      if (res.data.notiArray.length > 0) {
        setNotiArray(res.data.notiArray);
        console.log(res.data.notiArray);
        console.log(notiArray);
      }
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
              <div>
                <Text className={styleText.frame}>{noti.category}</Text>
              </div>
            ))}
          </Scrollbar>
        </div>
      </div>
    </div>
  );
};

export default Modal;
