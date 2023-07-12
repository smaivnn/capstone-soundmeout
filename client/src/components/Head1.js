import React from "react";
import styles from "./Head1.module.css";
const Head1 = (props) => {
  return <h1 className={styles.h1}>{props.children}</h1>;
};

export default Head1;
