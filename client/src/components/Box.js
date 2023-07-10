import React from "react";
import styles from "./Box.module.css";

const Box = (props) => {
  return <h1 className={styles.h1}>{props.children}</h1>;
};

export default Box;
