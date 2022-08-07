import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { generateInfoURL, getPayments } from "../mono_api";
import { paymentPreparedInterface } from "../mono_api_interfaces";

import PaymentsList from "../components/PaymentsList/PaymentsList";

interface CardPaymentPageProps {
  token: string;
}

const descriptionStyle = {
  marginTop: "20px",
};

const pageStyle = {
  padding: "0 40px",
};

const CardPaymentPage: React.FC<CardPaymentPageProps> = ({ token }) => {
  const { cardID } = useParams();
  const [payments, setPayments] =
    useState<Array<paymentPreparedInterface> | null>(null);

  useEffect(() => {
    if (cardID && token) {
      generateInfoURL(cardID, Math.round(+new Date() / 1000 - 2681999))
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
    <div style={pageStyle}>
      <h1 style={descriptionStyle}>Виписка за 31 день</h1>
      <PaymentsList payments={payments} />
    </div>
  );
};

export default CardPaymentPage;
