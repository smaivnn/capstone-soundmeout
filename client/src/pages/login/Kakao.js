import React from "react";
import img from "../../img/kakao_login_medium_wide.png";
const Kakao = () => {
  const REST_API_KEY = "62905cdd843de0ba5b4606b6cd28b12b";
  const redirectURI = "http://localhost:3000/auth/kakao";
  const URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${redirectURI}&response_type=code`;

  const handle = async () => {
    window.location.href = URL;
  };

  return (
    <div>
      <img src={img} onClick={handle}></img>
      
    </div>
  );
};

export default Kakao;
