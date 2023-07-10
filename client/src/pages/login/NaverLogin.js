import axios from "axios";
import img from "../../img/btnG_축약형.png";
const NaverLogin = () => {
  const handleSubmit = async () => {
    try {
      const res = await axios.get("http://localhost:3500/auth/naver");
      console.log(res.data.url);
      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <img
      src={img}
      onClick={handleSubmit}
      style={{ height: "60px", width: "40%" }}
    ></img>
  );
};

export default NaverLogin;
