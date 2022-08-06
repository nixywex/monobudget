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
    <div>
      <h1>Вітаю, {clientInfo.name}</h1>
      {clientInfo.accounts.map((account: accountInterface) => {
        return (
          <Link to={"/cardInfo/" + account.id}>
            <Card
              key={account.id}
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
  );
};

export default ClientInfoPage;
