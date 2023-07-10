import React from "react";

const Thumbnail = ({ imageUrl, title, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{ border: "2px solid black", margin: "12px", borderRadius: "5px" }}
    >
      <img
        src={imageUrl}
        alt={title}
        style={{ width: "200px", height: "180px" }}
      />
      <h3>{title}</h3>
    </div>
  );
};

export default Thumbnail;
