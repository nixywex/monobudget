import React, { useState } from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/css";

import Button from "../components/UI/Button/Button";
import Input from "../components/UI/Input/Input";

interface HomePageProps {
  submitToken: (token: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ submitToken }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  return (
    <div
      className={css`
        display: flex;
        justify-items: center;
        align-content: center;
        flex-direction: column;
        width: 100%;
      `}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <h1
          className={css`
            @media (max-width: 767px) {
              font-size: 25px;
            }
            @media (max-width: 375px) {
              font-size: 20px;
            }
          `}
        >
          Для отримання інформації введіть токен
        </h1>
        <Input
          placeholder={"Токен..."}
          type='text'
          onChange={(event) => handleInputChange(event)}
        />
        <div
          className={css`
            display: inline-block;
            margin: 20px;
          `}
        >
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
        </div>
      </form>
      <div>
        <Link
          className={css`
            color: var(--primary);
          `}
          to={"/how-to-get-token"}
        >
          Як отримати токен?
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
