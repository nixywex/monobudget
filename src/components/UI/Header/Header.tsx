import React from "react";
import { Link } from "react-router-dom";

import Logo from "../Logo/Logo";

import "./Header.css";

const Header = () => {
  return (
    <div className={"header"}>
      <Link to={"/"}>
        <Logo />
      </Link>
    </div>
  );
};

export default Header;
