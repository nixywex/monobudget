import React, { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../components/UI/Button/Button";
import Input from "../components/UI/Input/Input";

interface HomePageProps {
  submitToken: (token: string) => void;
}

const styles = {
  page: {
    display: "flex",
    justifyItems: "center",
    alignContent: "center",
    flexDirection: "column" as "column",
    width: "100%",
  },
  link: { color: "var(--primary)" },
  button: {
    margin: "20px",
  },
};

const HomePage: React.FC<HomePageProps> = ({ submitToken }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputValue(event.target.value);
  };

  return (
    <div style={styles.page}>
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
            style={styles.button}
            onClick={() => {
              submitToken(inputValue);
            }}
            type={"submit"}
          >
            Відправити
          </Button>
        </Link>
      </form>
      <Link style={styles.link} to={"/how-to-get-token"}>
        Як отримати токен?
      </Link>
    </div>
  );
};

export default HomePage;
