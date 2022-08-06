import React, { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../components/UI/Button/Button";
import Input from "../components/UI/Input/Input";

interface HomePageProps {
  submitToken: (token: string) => void;
}

const homePageStyle = {
  display: "flex",
  justifyItems: "center",
  alignContent: "center",
  flexDirection: "column" as "column",
  width: "100%",
};

const linkStyle = {
  color: "var(--primary)",
};

const HomePage: React.FC<HomePageProps> = ({ submitToken }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputValue(event.target.value);
  };

  return (
    <div style={homePageStyle}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <h1>Для отримання інформації введіть токен</h1>
        <Input
          placeholder={"Токен..."}
          type="text"
          onChange={(event) => handleInputChange(event)}
        />
        <Link to={"/clientInfo"}>
          <Button
            onClick={() => {
              submitToken(inputValue);
            }}
            type={"submit"}
          >
            Відправити
          </Button>
        </Link>
      </form>
      <Link style={linkStyle} to={"/how-to-get-token"}>
        Як отримати токен?
      </Link>
    </div>
  );
};

export default HomePage;
