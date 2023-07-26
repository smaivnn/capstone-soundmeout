import React, { useEffect, useState } from "react";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Posting from "./Posting";
import Find from "./Find";
import Profile from "./Profile";
import ChangePw from "./ChangePw";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Main = () => {
  const login = useSelector((state) => state.login.isLoggedin);
  const [noti, setNoti] = useState(false);
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.accesstoken.accessToken);
  console.log(accessToken, "accessToken");
  const getNoti = async () => {
    const res = await axios.get("http://localhost:3500/notification/check", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.data.success) {
      if (res.data.notiArray.length > 0) {
        setNoti(true);
        console.log(res.data);
      }
    }
  };
  useEffect(() => {
    getNoti();
  }, [noti]);
  console.log(noti, "noti");
  if (!login) {
    alert("로그인이 필요한 서비스입니다.");
    window.location.href = "/login";
  }
  return (
    <div>
      <Header useMenuButton="true" useNotiButton="true" isNoti={noti}></Header>
      {login ? (
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posting" element={<Posting />} />
            <Route path="/find" element={<Find />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
            <Route path="/changepassword" element={<ChangePw />} />
            <Route path="/deleteaccount" element={<ChangePw />} />
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
