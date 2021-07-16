import React from "react";

const Button = props => {
  return (
    <button
      style={{
        marginRight: 20,
        backgroundColor: "#4466f2",
        color: "#fff"
      }}
      className="btn btn-info btn-air-info btn-air-info"
      type="button"
      onClick ={props.onClick}
    >
      {props?.title || Button}
    </button>
  );
};

export default Button;
