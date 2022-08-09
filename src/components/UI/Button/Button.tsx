import React from "react";
import ButtonProps from "./Button.props";

import "./Button.css";

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} className={"button"}>
      {children}
    </button>
  );
};

export default Button;
