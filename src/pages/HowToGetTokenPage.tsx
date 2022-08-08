import React from "react";
import { Link } from "react-router-dom";

import Button from "../components/UI/Button/Button";

const styles = {
  textAlign: "left" as "left",
  padding: "40px",
};

const titleStyles = {
  fontSize: "40px",
};

const ulStyles = {
  margin: "40px 0",
  fontSize: "22px",
};

const liStyles = {
  margin: "10px 0",
};

const HowToGetTokenPage: React.FC = () => {
  return (
    <div style={styles}>
      <h1 style={titleStyles}>Як отримати токен?</h1>
      <ul style={ulStyles}>
        <li style={liStyles}>1. Перейдіть за посиланням api.monobank.ua.</li>
        <li style={liStyles}>
          2. Відскануйте QR-код за допомогою застосунку monobank на телефоні.
        </li>
        <li style={liStyles}>3. Нажміть “Отримати токен”.</li>
        <li style={liStyles}>
          4. Скопіюйте токен і вставте до застосунку monobudget.
        </li>
      </ul>
      <Link to={"/"}>
        <Button>Повернутися на головну</Button>
      </Link>
    </div>
  );
};

export default HowToGetTokenPage;
