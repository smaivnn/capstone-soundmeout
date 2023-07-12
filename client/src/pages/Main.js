import React, { useEffect } from "react";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Posting from "./Posting";
import Find from "./Find";
import Profile from "./Profile";
import ChangePw from "./ChangePw";
import { useNavigate } from "react-router-dom";
import GetTopicList from "../components/GetTopicList";
import { useSelector } from "react-redux";
import axios from "axios";

const Main = () => {
  const login = useSelector((state) => state.login.isLoggedin);
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.accesstoken.accessToken);
  const getNoti = async () => {
    const res = await axios.get("http://localhost:3500/notification/check", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.data.success) {
      if (res.data.notiArray.length > 0) {
        alert("새로운 알림이 있습니다.");
        console.log(res.data.notiArray);
      }
    }
  };
  useEffect(() => {
    getNoti();
  }, []);

  if (!login) {
    alert("로그인이 필요한 서비스입니다.");
    window.location.href = "/login";
  }
  return (
    <div>
      <Header useButton="true"></Header>
      {login ? (
        <div>
          <Routes>
            <Route path="/" element={<GetTopicList />} />
            <Route path="/posting" element={<Posting />} />
            <Route path="/find" element={<Find />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<GetTopicList />} />
            <Route path="/changepassword" element={<ChangePw />} />
            <Route path="/deleteaccount" element={<ChangePw />} />
            <Route path="/test" element={<GetTopicList />} />
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
