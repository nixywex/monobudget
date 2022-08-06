import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { generateInfoURL, getPayments } from "../mono_api";
import { paymentPreparedInterface } from "../mono_api_interfaces";

import Payment from "../components/Payment/Payment";

interface CardPaymentPageProps {
  token: string;
}

const CardPaymentPage: React.FC<CardPaymentPageProps> = ({ token }) => {
  const { cardID } = useParams();
  const [payments, setPayments] =
    useState<Array<paymentPreparedInterface> | null>(null);

  useEffect(() => {
    if (cardID && token) {
      generateInfoURL(cardID, 1657436731)
        .then((url) => {
          if (url) return getPayments(url, token);
        })
        .then((responsePayments) =>
          responsePayments ? setPayments(responsePayments) : null
        );
    }
  }, [cardID, token]);

  if (!payments) return <></>;

  return (
    <div>
      {payments.map((payment: paymentPreparedInterface) => {
        return (
          <Payment
            key={payment.id}
            description={payment.paymentDescription}
            amount={payment.sumCardCurrency}
            cardCurrency={"UAH"}
            operationAmount={payment.sumOperationCurrency}
            currency={payment.currency}
            category={payment.category ? payment.category : "Інше"}
          />
        );
      })}
    </div>
  );
};

export default CardPaymentPage;
