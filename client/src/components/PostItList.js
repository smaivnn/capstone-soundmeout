import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MonoPaperModal from "./MonoPaperModal";
const PostItList = ({ posts }) => {
  const [colors, setColors] = useState({});
  const [angles, setAngles] = useState({});
  const [showPaperModal, setShowPaperModal] = useState(false);
  const [modalColor, setModalColor] = useState("");
  const [modalText, setModalText] = useState("");
  const [paperid, setPaperid] = useState("");
  const [visible, setVisible] = useState("");
  const PostIt = styled.div`
    background-color: ${({ color }) => color};
    transform: rotate(${({ angle }) => angle}deg);
    opacity: 0.8;
    width: 200px;
    height: 200px;
    padding: 10px;
    display: inline-block;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: move;
    margin-top: 20%;
    filter: saturate(0.7);
    margin: 20px;
  `;
  const InvisiblePostIt = styled.div`
    background-color: gray;
    transform: rotate($(0) => angle}deg);
    opacity: 0.8;
    width: 200px;
    height: 200px;
    padding: 10px;
    display: inline-block;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: move;
    margin-top: 20%;
    filter: saturate(0.7);
    margin: 20px;
  `;

  const getRandomColor = (postId) => {
    if (!colors[postId]) {
      const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
      setColors((prevColors) => ({ ...prevColors, [postId]: color }));
    }
    return colors[postId];
  };

  const getRandomAngle = (postId) => {
    if (!angles[postId]) {
      const angle = Math.floor(Math.random() * 20) - 5;
      setAngles((prevAngles) => ({ ...prevAngles, [postId]: angle }));
    }
    return angles[postId];
  };

  const handleCloseModal = () => {
    setShowPaperModal(false);
  };

  const paperClickHandler = (event) => {
    setShowPaperModal(true);
    const color = event.currentTarget.getAttribute("color");
    const text = event.currentTarget.textContent;
    const id = event.currentTarget.getAttribute("paperid");
    const visible = event.currentTarget.getAttribute("isvisible");

    setModalColor(color);
    setModalText(text);
    setPaperid(id);
    setVisible(visible);
  };

  return (
    <div style={{ marginBottom: "20%" }}>
      {posts.map((posts) =>
        posts.visible ? (
          <PostIt
            key={posts._id}
            color={getRandomColor(posts._id)}
            angle={getRandomAngle(posts._id)}
            onClick={paperClickHandler}
            paperid={posts._id}
            isvisible="true"
          >
            {posts.text}
          </PostIt>
        ) : (
          <InvisiblePostIt
            key={posts._id}
            color="gray"
            angle={getRandomAngle(posts._id)}
            onClick={paperClickHandler}
            paperid={posts._id}
            isvisible="false"
          >
            {posts.text}
          </InvisiblePostIt>
        )
      )}

      {showPaperModal ? (
        <MonoPaperModal
          color={modalColor}
          onClose={handleCloseModal}
          text={modalText}
          paperid={paperid}
          isvisible={visible}
        ></MonoPaperModal>
      ) : null}
    </div>
  );
};

export default PostItList;
