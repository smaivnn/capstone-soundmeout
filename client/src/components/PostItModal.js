import React, { useState } from "react";
import styles from "./PostItModal.module.css";
import Text from "./Text";
import styleText from "./Text.module.css";
import Input from "./Input"
import InputStyle from "./Input.module.css"

const PostItModal = (props) => {
const [text,setText]=useState("");

const handleChange=(event)=>{
  const value=event.target.value;
  setText(value);
  props.onTextChange(value);
}
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>포스트잇 추가</h2>
          <button className={styles.closeButton} onClick={props.onClose}>
            X
          </button>
          
        </div>
        
        <div className={styles.modalBody}>
           <textarea className={InputStyle.input_addPost} onChange={handleChange} ></textarea> 
        </div>
        <button  className={styles.submitButton} onClick={props.onClick}>
            포스트잇 작성하기!
          </button>
      </div>
    </div>
  );
};

export default PostItModal;
