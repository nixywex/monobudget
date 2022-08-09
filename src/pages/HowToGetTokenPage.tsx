import React from "react";
import { Link } from "react-router-dom";

import Button from "../components/UI/Button/Button";

const styles = {
  page: {
    textAlign: "left" as "left",
    padding: "40px",
  },
  title: {
    fontSize: "40px",
  },
  list: {
    margin: "40px 0",
    fontSize: "22px",
  },
  listItem: {
    margin: "10px 0",
  },
};

const HowToGetTokenPage: React.FC = () => {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Як отримати токен?</h1>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          1. Перейдіть за посиланням api.monobank.ua.
        </li>
        <li style={styles.listItem}>
          2. Відскануйте QR-код за допомогою застосунку monobank на телефоні.
        </li>
        <li style={styles.listItem}>3. Нажміть “Отримати токен”.</li>
        <li style={styles.listItem}>
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
