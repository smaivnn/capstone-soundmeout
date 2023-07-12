import React, { useState } from "react";
import styles from "./Modal.module.css";
import Button from "./Button";
import styleButton from "./Button.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TopicMenuModal = (props) => {
  const accessToken = useSelector((state) => state.accesstoken.accessToken);
  const [showUpdate, setShowUpdate] = useState(false);
  const [checked, setChecked] = useState(props.visible);
  const navigate = useNavigate();
  const setVisibleTopic = async () => {
    try {
      const data = {
        visible: !checked,
      };
      const res = await axios.put(
        `http://localhost:3500/topic/update/${props.topicId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setChecked(!checked);
      if (res.status === 200) {
        alert("토픽이 수정되었습니다.");
        navigate(`/topic/${props.topicId}`);
        props.onClose();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleToggle = () => {
    setShowUpdate(!showUpdate);
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
        <div>
          <div className={styles.modalBody}>
            <Button className={styleButton.button_modal} onClick={handleToggle}>
              토픽 수정
            </Button>
            <div>
              {showUpdate && (
                <div>
                  <div>토픽 공개</div>
                  <input
                    type="checkbox"
                    onChange={setVisibleTopic}
                    checked={checked}
                  ></input>
                </div>
              )}
            </div>
            <Button
              className={styleButton.button_modal}
              onClick={props.deleteTopic}
            >
              토픽 삭제
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicMenuModal;
