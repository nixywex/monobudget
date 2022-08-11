import React from "react";
import cn from "classnames";

import CardProps from "./Card.props";

import "./Card.css";

const Card: React.FC<CardProps> = ({ cardNum, balance, cardCurrency = "UAH", type = "black" }) => {
  return (
    <div
      className={cn("card", {
        "card_white-card": type === "white",
        "card_black-card": type === "black",
        "card_e-aid-card": type === "eAid",
      })}
    >
      <div className='card__logo'>
        <img
          src={`./mono_logo${type === "black" ? "_white" : ""}.png`}
          alt='monobank logo'
          width={110}
          height={30}
        />
      </div>
      <div
        className={cn("card__card-num", {
          "card__card-num_white-card": type === "white",
          "card__card-num_black-card": type === "black",
          "card__card-num_e-aid-card": type === "eAid",
        })}
      >
        <p>{cardNum}</p>
      </div>
      <div
        className={cn("card__card-balance", {
          "card__card-balance_white-card": type === "white",
          "card__card-balance_black-card": type === "black",
          "card__card-balance_e-aid-card": type === "eAid",
        })}
      >
        <p>
          {balance} {cardCurrency}
        </p>
      </div>
    </div>
  );
};

export default Card;
