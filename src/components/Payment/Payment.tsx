import React from "react";
import cn from "classnames";

import PaymentInterface from "./Payment.props";

import "./Payment.css";

const Payment: React.FC<PaymentInterface> = ({
  description,
  amount,
  cardCurrency,
  currency,
  category,
  operationAmount,
}) => {
  return (
    <div className="payment">
      <div className="payment__info">
        <div className="payment__info__description">
          <h1>{description}</h1>
        </div>
        {category ? (
          <div className="payment__info__category">
            <p>{category}</p>
          </div>
        ) : null}
      </div>
      <div className="payment__sum">
        <div className="payment__sum__amount">
          <p
            className={cn("", {
              payment__sum_spend: amount < 0,
              payment__sum_income: amount > 0,
            })}
          >
            {amount} {cardCurrency}
          </p>
        </div>
        {operationAmount && (
          <div className="payment__sum__operationAmount">
            <p
              className={cn("", {
                payment__sum_spend: amount < 0,
                payment__sum_income: amount > 0,
              })}
            >
              {operationAmount} {currency && "UAH"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
