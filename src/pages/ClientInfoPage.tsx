import React, { useEffect, useState } from "react";
import { getJsonClientInfo } from "../mono_api";
import { Link } from "react-router-dom";
import cc from "currency-codes";
import { clientInfoInterface, accountInterface } from "../mono_api_interfaces";

import Card from "../components/Card/Card";

interface ClientInfoPageProps {
  token: string;
  prepareCardNumber: (number: string) => string;
}

const linkStyles = {
  textDecoration: "none",
};

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

  useEffect(() => {
    if (token) {
      getJsonClientInfo(token).then((response) => setClientInfo(response));
    }
  }, [token]);

  if (!clientInfo) return <></>;

  return (
    <div style={pageStyles}>
      <h1 style={titleStyles}>Вітаю, {clientInfo.name}</h1>
      <p style={descriptionStyles}>Оберіть картку для перегляду виписки:</p>
      <div style={cardsStyles} className="cards">
        {clientInfo?.accounts?.map((account: accountInterface) => {
          return (
            <Link
              style={linkStyles}
              key={account.id}
              to={"/cardInfo/" + account.id}
            >
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
};

export default ClientInfoPage;
