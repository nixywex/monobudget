import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { generateInfoURL, getPayments } from "../mono_api";
import { paymentPreparedInterface } from "../mono_api_interfaces";
import useStatus from "../hooks/useStatus";
import { css } from "@emotion/css";

import PaymentsList from "../components/PaymentsList/PaymentsList";
import Loader from "../components/UI/Loader/Loader";
import Error from "../components/UI/Error/Error";
import PaymentsDiagram from "../components/PaymentsDiagram/PaymentsDiagram";

interface CardPaymentPageProps {
  token: string;
}

const CardPaymentPage: React.FC<CardPaymentPageProps> = ({ token }) => {
  const { cardID } = useParams();
  const [payments, setPayments] = useState<Array<paymentPreparedInterface>>([]);
  const { status, setStatus, error, setError } = useStatus();
  const [showDiagram, setShowDiagram] = useState<boolean>(false);

  const handleChangeShowDiagram = (): void => {
    setShowDiagram((prev) => !prev);
  };

  useEffect(() => {
    if (cardID && token) {
      setStatus("loading");
      const date: number = Math.round(+new Date() / 1000 - 2681999);
      const url: string = generateInfoURL(cardID, date);

      getPayments(url, token)
        .then((responsePayments) => (responsePayments ? setPayments(responsePayments) : null))
        .then(() => {
          setStatus("success");
        })
        .catch((e) => {
          setStatus("error");
          setError(axios.isAxiosError(e) ? e : new (Error as any)("Unexpected error"));
        });
    }
  }, [cardID, token]);

  switch (status) {
    case "loading":
      return <Loader />;
    case "error":
      return <Error message={error?.message || "Невідома помилка"} />;
    case "success":
      return (
        <div>
          <h1
            className={css`
              margin-top: 20px;

              @media (max-width: 425px) {
                font-size: 30px;
              }
              @media (max-width: 375px) {
                font-size: 25px;
              }
              @media (max-width: 320px) {
                font-size: 20px;
              }
            `}
          >
            Виписка за 31 день
          </h1>
          {showDiagram ? (
            <PaymentsDiagram
              payments={payments}
              handleChangeShowDiagram={handleChangeShowDiagram}
            />
          ) : (
            <PaymentsList payments={payments} handleChangeShowDiagram={handleChangeShowDiagram} />
          )}
        </div>
      );
    default:
      return <Error message={"Невідома помилка"} />;
  }
};

export default CardPaymentPage;
