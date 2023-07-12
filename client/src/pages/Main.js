import React from "react";
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

const Main = () => {
  const login = useSelector((state) => state.login.isLoggedin);
  const navigate = useNavigate();
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
            <Route path="/" element={<Home />} />
            <Route path="/posting" element={<Posting />} />
            <Route path="/find" element={<Find />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
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
