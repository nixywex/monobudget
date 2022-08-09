import React from "react";
import InputProps from "./Input.props";

import "./Input.css";

const Input: React.FC<InputProps> = (props) => {
  return <input {...props} className={"input"} />;
};

export default Input;
