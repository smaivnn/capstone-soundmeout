import React from "react";

const Thumbnail = (props) => {
  const dateString = props.date;
  const date = new Date(dateString);

  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return (
    <div className={props.className} onClick={props.onClick}>
      <h2 style={{ textAlign: "left", marginLeft: "10px" }}> {props.title}</h2>
      <h3 style={{ textAlign: "right", marginRight: "10px" }}>
        {formattedDate}
      </h3>
    </div>
  );
};

export default Thumbnail;
