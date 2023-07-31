import React from "react";

const Text = (props) => {
  return (
    <div
      className={props.className}
      onClick={props.onClick}
      rediurl={props.redirectURL}
      _id={props.id}
    >
      {React.Children.map(props.children, (child) => {
        return <div>{child}</div>;
      })}
    </div>
  );
};

export default Text;
