import React from "react";
import { Routes, Route } from "react-router-dom";
import KakaoLogin from "./login/KakaoLogin";
import NaverLoginController from "./login/NaverLoginController";
import GoogleLoginController from "./login/GoogleLoginController";
import FindAndChangPw from "./FindAndChangePw";
const Auths = () => {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/kakao" element={<KakaoLogin />} />
          <Route path="/naver/callback" element={<NaverLoginController />} />
          <Route path="/google/redirect" element={<GoogleLoginController />} />
          <Route path="/find-password/callback" element={<FindAndChangPw />} />
        </Routes>
      </div>
    </div>
  );
};

export default Auths;
