import React from "react";
import SelectProps from "./Select.props";

import "./Select.css";

const Select: React.FC<SelectProps> = ({ children, ...props }) => {
  return (
    <select className={"select"} {...props}>
      {children}
    </select>
  );
};

export default Select;
