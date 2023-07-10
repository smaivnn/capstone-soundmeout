import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPaper } from "../modules/paper";

const usePaperController = () => {
  const userId = useSelector((state) => state.user.userId);
  const accessToken = useSelector((state) => state.accesstoken.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3500/user/paper/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        dispatch(setPaper(res.data.paperArray));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return null; // 렌더링되는 요소가 없음을 나타내기 위해 null 반환
};

export default usePaperController;
