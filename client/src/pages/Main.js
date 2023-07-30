import Home from "./Home";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Posting from "./Posting";
import Find from "./Find";
import Profile from "./Profile";
import ChangePw from "./ChangePw";

import DeleteAccount from "./DeleteAccount";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Main = () => {
  const login = useSelector((state) => state.login.isLoggedin);
  const navigate = useNavigate();
  const [noti, setNoti] = useState(false);
  const [notiArray, setNotiArray] = useState([]);

  const accessToken = useSelector((state) => state.accesstoken.accessToken);
  const getNoti = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/notification/check`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (res.data.success) {
      if (res.data.notiArray.length > 0) {
        setNoti(true);
        setNotiArray(res.data.notiArray);
        console.log(notiArray);
      }
    }
  };
  useEffect(() => {
    getNoti();
  }, [noti]);
  if (!login) {
    alert("로그인이 필요한 서비스입니다.");
    window.location.href = "/login";
    return;
  }
  return (
    <div>
      <Header
        useMenuButton="true"
        useNotiButton="true"
        isNoti={noti}
        notiArray={notiArray}
      ></Header>
      {login ? (
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posting" element={<Posting />} />
            <Route path="/find" element={<Find />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
            <Route path="/changepassword" element={<ChangePw />} />
            <Route path="/deleteaccount" element={<DeleteAccount />} />
          </Routes>
        </div>
      ) : (
        <div />
      )}
      <Nav />
    </div>
  );
};

export default Main;
