import React from "react";
import Topic from "./Topic";
import { useParams } from "react-router-dom";

const TopicWrapper = () => {
  const { id } = useParams();
  return <Topic topicId={id} />;
};

export default TopicWrapper;
