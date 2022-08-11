import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { paymentPreparedInterface } from "../../mono_api_interfaces";
import PaymentStatisticsProps from "./PaymentsDiagram.props";

import Button from "../UI/Button/Button";
import Select from "../UI/Select/Select";

import "./PaymentsDiagram.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const PaymentsDiagram: React.FC<PaymentStatisticsProps> = ({
  payments,
  handleChangeShowDiagram,
}) => {
  const [isIncome, setIsIncome] = useState<boolean>(false);
  const filteredPaymentsByCategory: any = {};
  const sumByCategory: any = {};
  const categories: Array<string> = [];
  const sums: Array<number> = [];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsIncome(event.target.value === "income");
  };

  payments?.forEach((payment: paymentPreparedInterface) => {
    if (isIncome ? payment.sumOperationCurrency > 0 : payment.sumOperationCurrency <= 0) {
      if (!filteredPaymentsByCategory[payment.category]) {
        sumByCategory[payment.category] = 0;
        filteredPaymentsByCategory[payment.category] = [];
      }
      filteredPaymentsByCategory[payment.category].push(payment);
      sumByCategory[payment.category] += payment.sumCardCurrency;
    }
  });

  for (const key in sumByCategory) {
    if (Object.prototype.hasOwnProperty.call(sumByCategory, key)) {
      categories.push(key);
      sums.push(sumByCategory[key]);
    }
  }

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Статистика за 31 день",
        data: sums,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={"diagram"}>
      <div className={"diagram__top"}>
        <div className='diagram__top__select'>
          <label htmlFor='sorting'>Сортувати:</label>
          <Select
            value={isIncome ? "income" : "spend"}
            onChange={(event) => handleSelectChange(event)}
            name='sorting'
            id='sorting'
          >
            <option value='income'>Показати надходження</option>
            <option value='spend'>Показати витрати</option>
          </Select>
        </div>
        <Button onClick={handleChangeShowDiagram}>Показати список</Button>
      </div>
      <div className={"diagram__doughnut"}>
        {categories.length && sums.length ? <Doughnut data={data} /> : <p>Список пустий</p>}
      </div>
    </div>
  );
};

export default PaymentsDiagram;
