import React from "react";

const User = (props) => {
  return (
    <div className={props.className}>
      {React.Children.map(props.children, (child) => {
        return <div>{child}</div>;
      })}
    </div>
  );
};

export default User;
