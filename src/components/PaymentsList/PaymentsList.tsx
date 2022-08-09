import React from "react";
import { paymentPreparedInterface } from "../../mono_api_interfaces";
import PaymentsListProps from "./PaymentList.props";

import Payment from "../Payment/Payment";

import "./PaymentsList.css";

const PaymentsList: React.FC<PaymentsListProps> = ({ payments }) => {
  const spending: Array<paymentPreparedInterface> = payments.filter(
    (payment) => payment.sumOperationCurrency <= 0
  );
  const income: Array<paymentPreparedInterface> = payments.filter(
    (payment) => payment.sumOperationCurrency > 0
  );

  return (
    <div className="payments-list">
      <div className="payments-list__spending">
        <h1 className="payments-list__title">Витрати</h1>
        {spending.map((payment: paymentPreparedInterface) => {
          return (
            <Payment
              key={payment.id}
              description={payment.paymentDescription}
              amount={payment.sumCardCurrency}
              cardCurrency={"UAH"}
              operationAmount={payment.sumOperationCurrency}
              currency={payment.currency}
              category={payment.category}
            />
          );
        })}
      </div>
      <div className="payments-list__income">
        <h1 className="payments-list__title">Надходження</h1>
        {income.map((payment: paymentPreparedInterface) => {
          return (
            <Payment
              key={payment.id}
              description={payment.paymentDescription}
              amount={payment.sumCardCurrency}
              cardCurrency={"UAH"}
              operationAmount={payment.sumOperationCurrency}
              currency={payment.currency}
              category={payment.category}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PaymentsList;
