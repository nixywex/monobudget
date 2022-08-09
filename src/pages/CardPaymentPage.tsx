import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { generateInfoURL, getPayments } from "../mono_api";
import { paymentPreparedInterface } from "../mono_api_interfaces";
import useStatus from "../hooks/useStatus";

import PaymentsList from "../components/PaymentsList/PaymentsList";
import Loader from "../components/UI/Loader/Loader";
import Error from "../components/UI/Error/Error";

interface CardPaymentPageProps {
  token: string;
}

const styles = {
  description: {
    marginTop: "20px",
  },
  page: {
    padding: "0 40px",
  },
};

const CardPaymentPage: React.FC<CardPaymentPageProps> = ({ token }) => {
  const { cardID } = useParams();
  const [payments, setPayments] = useState<Array<paymentPreparedInterface>>([]);
  const { status, setStatus, error, setError } = useStatus();

  useEffect(() => {
    if (cardID && token) {
      setStatus("loading");
      const date: number = Math.round(+new Date() / 1000 - 2681999);
      const url: string = generateInfoURL(cardID, date);

      getPayments(url, token)
        .then((responsePayments) =>
          responsePayments ? setPayments(responsePayments) : null
        )
        .then(() => {
          setStatus("success");
        })
        .catch((e) => {
          setStatus("error");
          setError(
            axios.isAxiosError(e) ? e : new (Error as any)("Unexpected error")
          );
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
        <div style={styles.page}>
          <h1 style={styles.description}>Виписка за 31 день</h1>
          <PaymentsList payments={payments} />
        </div>
      );
    default:
      return <Error message={"Невідома помилка"} />;
  }
};

export default CardPaymentPage;
