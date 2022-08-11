import React from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/css";

import Button from "../components/UI/Button/Button";

const HowToGetTokenPage: React.FC = () => {
  return (
    <div
      className={css`
        text-align: left;
        padding: 40px;
      `}
    >
      <h1
        className={css`
          font-size: 40px;

          @media (max-width: 767px) {
            font-size: 35px;
          }
          @media (max-width: 425px) {
            font-size: 30px;
          }
          @media (max-width: 375px) {
            font-size: 25px;
          }
        `}
      >
        Як отримати токен?
      </h1>
      <ol
        className={css`
          margin: 40px 0;
          list-style-position: inside;
          font-size: 22px;
          & li {
            list-style-type: decimal;
            margin: 10px 0;
          }

          @media (max-width: 1200px) {
            font-size: 20px;
          }

          @media (max-width: 767px) {
            font-size: 18px;
          }

          @media (max-width: 425px) {
            font-size: 16px;
          }
        `}
      >
        <li>Перейдіть за посиланням api.monobank.ua.</li>
        <li>Відскануйте QR-код за допомогою застосунку monobank на телефоні.</li>
        <li>Нажміть “Отримати токен”.</li>
        <li>Скопіюйте токен і вставте до застосунку monobudget.</li>
      </ol>
      <Link to={"/"}>
        <Button>Повернутися на головну</Button>
      </Link>
    </div>
  );
};

export default HowToGetTokenPage;
