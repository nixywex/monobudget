import React, { InputHTMLAttributes } from "react";

import "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
  return <input {...props} className={"input"} />;
};

export default Input;
