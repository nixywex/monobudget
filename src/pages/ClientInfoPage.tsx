import React, { useEffect, useState } from "react";
import axios from "axios";
import { getJsonClientInfo } from "../mono_api";
import { Link } from "react-router-dom";
import cc from "currency-codes";
import { clientInfoInterface, accountInterface } from "../mono_api_interfaces";
import useStatus from "../hooks/useStatus";

import Card from "../components/Card/Card";
import Loader from "../components/UI/Loader/Loader";
import Error from "../components/UI/Error/Error";

interface ClientInfoPageProps {
  token: string;
  prepareCardNumber: (number: string) => string;
}

const cardsStyles = {
  display: "flex",
  flexWrap: "wrap" as "wrap",
  justifyContent: "flex-start",
  alignItems: "center",
};

const titleStyles = {
  margin: "20px 0",
};

const descriptionStyles = {
  margin: "20px 0",
  textAlign: "left" as "left",
  fontSize: "20px",
};

const pageStyles = {
  padding: "0 40px",
};

const ClientInfoPage: React.FC<ClientInfoPageProps> = ({
  token,
  prepareCardNumber,
}) => {
  const [clientInfo, setClientInfo] = useState<clientInfoInterface | null>(
    null
  );
  const { status, setStatus, error, setError } = useStatus();

  useEffect(() => {
    if (token) {
      setStatus("loading");
      getJsonClientInfo(token)
        .then((response) => setClientInfo(response))
        .then(() => setStatus("success"))
        .catch((e) => {
          setStatus("error");
          setError(
            axios.isAxiosError(e) ? e : new (Error as any)("Unexpected error")
          );
        });
    }
  }, [token]);

  switch (status) {
    case "loading":
      return <Loader></Loader>;
    case "error":
      return <Error message={error?.message || "Невідома помилка"} />;
    case "success":
      return (
        <div style={pageStyles}>
          <h1 style={titleStyles}>Вітаю, {clientInfo?.name}</h1>
          <p style={descriptionStyles}>Оберіть картку для перегляду виписки:</p>
          <div style={cardsStyles} className="cards">
            {clientInfo?.accounts?.map((account: accountInterface) => {
              return (
                <Link key={account.id} to={"/cardInfo/" + account.id}>
                  <Card
                    cardNum={prepareCardNumber(account.maskedPan[0])}
                    balance={account.balance / 100}
                    id={account.id}
                    type={account.type}
                    cardCurrency={cc.number(String(account.currencyCode))?.code}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      );
    default:
      return <Error message={"Невідома помилка"} />;
  }
};

export default ClientInfoPage;
