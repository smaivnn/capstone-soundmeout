import React from "react";
import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <div>
      <div className={styles.div}>{props.children}</div>
      <input
        className={props.className}
        placeholder={props.placeholder}
        onChange={props.onChange}
        type={props.type}
        name={props.name}
      />
    </div>
  );
};

export default Input;
