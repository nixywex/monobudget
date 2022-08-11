import React, { useState } from "react";
import { paymentPreparedInterface } from "../../mono_api_interfaces";
import PaymentsListProps from "./PaymentList.props";

import Payment from "../Payment/Payment";
import Button from "../UI/Button/Button";
import Select from "../UI/Select/Select";

import "./PaymentsList.css";

const PaymentsList: React.FC<PaymentsListProps> = ({ payments, handleChangeShowDiagram }) => {
  const [sortingCriterion, setSortingCriterion] = useState<string>("date");

  const handleSelectChange = (selectObject: React.ChangeEvent<HTMLSelectElement>) => {
    setSortingCriterion(selectObject.target.value);
  };

  const sortPayments = (
    sortingPayments: Array<paymentPreparedInterface>,
    criterion: string,
  ): Array<paymentPreparedInterface> => {
    switch (criterion) {
      case "date":
        return sortingPayments.sort((prev, next) => {
          return next.time - prev.time;
        });
      case "sumUp":
        return sortingPayments.sort((prev, next) => {
          const difference = prev.sumCardCurrency - next.sumCardCurrency;
          return prev.sumCardCurrency <= 0 && next.sumCardCurrency <= 0
            ? difference * -1
            : difference;
        });
      case "sumDown":
        return sortingPayments.sort((prev, next) => {
          const difference = next.sumCardCurrency - prev.sumCardCurrency;
          return prev.sumCardCurrency <= 0 && next.sumCardCurrency <= 0
            ? difference * -1
            : difference;
        });
      default:
        return sortingPayments;
    }
  };

  payments = sortPayments(payments, sortingCriterion);

  const spending: Array<paymentPreparedInterface> = payments.filter(
    (payment) => payment.sumOperationCurrency <= 0,
  );
  const income: Array<paymentPreparedInterface> = payments.filter(
    (payment) => payment.sumOperationCurrency > 0,
  );

  return (
    <div className={"payments"}>
      <div className={"payments__top"}>
        <div>
          <label htmlFor='sorting'>Сортувати:</label>
          <Select
            value={sortingCriterion}
            onChange={(event) => handleSelectChange(event)}
            name='sorting'
            id='sorting'
          >
            <option value='date'>За датою</option>
            <option value='sumUp'>Від меншої суми, до більшої</option>
            <option value='sumDown'>Від більшої суми, до меншої</option>
          </Select>
        </div>
        <Button onClick={handleChangeShowDiagram}>Показати діаграмму</Button>
      </div>
      <div className='payments__payments-list'>
        <div className='payments__payments-list__spending'>
          <h1 className='payments__payments-list__title'>Витрати</h1>
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
        <div className='payments__payments-list__income'>
          <h1 className='payments__payments-list__title'>Надходження</h1>
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
    </div>
  );
};

export default PaymentsList;
