import axios from "axios";
import img from "../../img/btnG_축약형.png";
const NaverLogin = () => {
  const handleSubmit = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/naver`
      );

      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <img
      alt="naverLogin"
      src={img}
      onClick={handleSubmit}
      style={{ height: "60px", width: "40%" }}
    ></img>
  );
};

export default NaverLogin;
