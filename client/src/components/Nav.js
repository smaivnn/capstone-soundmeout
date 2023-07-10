import React from 'react';
import styles from './Nav.module.css';
import home from "../img/icons8-시골집-30.png"
import post from "../img/icons8-연필-30.png"
import find from "../img/icons8-수색-30.png"
import profile from "../img/icons8-사람-남자-30.png"
import { useNavigate } from "react-router-dom";

 const Nav=()=>{
 const navigate = useNavigate();
  return (
    <div className={styles.container}>
      
    <img className={styles.icon} src={home} alt="button1" onClick={() => navigate("/main/home")} />
             
    <img className={styles.icon} src={post} alt="button2" onClick={() => navigate("/main/posting")} />
             
    <img className={styles.icon} src={find} alt="button3" onClick={() => navigate("/main/find")} />
             
    <img className={styles.icon} src={profile} alt="button4" onClick={() => navigate("/main/profile")} />
              
    </div>
  );
}
export default  Nav;