import React from "react";
import ErrorProps from "./Error.props";
import { Link } from "react-router-dom";

import Button from "../Button/Button";

import "./Error.css";

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className={"error"}>
      <img
        className={"error__image"}
        height={150}
        width={150}
        src={"./error.svg"}
        alt=""
      />
      <h1 className={"error__title"}>Дідька лисого...</h1>
      <p className={"error__description"}>
        Щось трапилось... Ми вже працюємо над вирішенням проблеми!
      </p>
      <p className={"error__message"}>Детальніше: {message}</p>
      <Link to={"/"}>
        <Button>На головну</Button>
      </Link>
    </div>
  );
};

export default Error;
