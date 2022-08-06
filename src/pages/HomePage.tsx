import React, { useState } from "react";
import { Link } from "react-router-dom";

interface HomePageProps {
  submitToken: (token: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ submitToken }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <h1>Введіть Token</h1>
        <input type="text" onChange={(event) => handleInputChange(event)} />
        <Link to={"/clientInfo"}>
          <button
            onClick={() => {
              submitToken(inputValue);
            }}
            type={"submit"}
          >
            Відправити
          </button>
        </Link>
      </form>
    </div>
  );
};

export default HomePage;
