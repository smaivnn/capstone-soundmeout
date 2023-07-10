import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setTopic } from "../modules/topic";

const useTopicController = (topicId) => {
  const userId = useSelector((state) => state.user.userId);
  const accessToken = useSelector((state) => state.accesstoken.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3500/user/topic/${topicId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        dispatch(setTopic(res.data.topicArray));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return null; // 렌더링되는 요소가 없음을 나타내기 위해 null 반환
};

export default useTopicController;
