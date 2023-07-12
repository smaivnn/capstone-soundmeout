import React from "react";
import img from "../../img/btn_google_signin_dark_focus_web.png";
let url = "https://accounts.google.com/o/oauth2/v2/auth";
url +=
  "?client_id=" +
  "382152492559-0t3t9qleql25qd1v08h1onq0gj1vqm8p.apps.googleusercontent.com";
url += "&redirect_uri=" + "http://localhost:3000/auth/google/redirect";
url += "&response_type=code";
url += "&scope=email profile";

const GoogleLogin = () => {
  const handleSubmit = async () => {
    window.location.href = url;
  };

  return (
    <img
      src={img}
      onClick={handleSubmit}
      style={{ height: "40%", width: "40%" }}
    />
  );
};

export default GoogleLogin;
