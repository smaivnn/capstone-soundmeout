import React from "react";

const Text = (props) => {
  return (
    <div className={props.className}>
      {React.Children.map(props.children, (child) => {
        return <div>{child}</div>;
      })}
    </div>
  );
};

export default Text;
