import React from "react";

import "./Error.css";

interface ErrorInterface {
  message: string;
}
const Error: React.FC<ErrorInterface> = ({ message }) => {
  return (
    <div className={"error"}>
      <img
        className={"error__image"}
        height={150}
        width={150}
        src="./error.svg"
        alt=""
      />
      <h1 className={"error__title"}>Дідька лисого...</h1>
      <p className={"error__description"}>
        Щось трапилось... Ми вже працюємо над вирішенням проблеми!
      </p>
      <p className={"error__message"}>Детальніше: {message}</p>
    </div>
  );
};

export default Error;
