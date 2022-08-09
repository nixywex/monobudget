import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { paymentPreparedInterface } from "../../mono_api_interfaces";
import PaymentStatisticsProps from "./PaymentStatics.props";

import "./PaymentStatistics.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const PaymentStatistics: React.FC<PaymentStatisticsProps> = ({ payments }) => {
  const filteredPaymentsByCategory: any = {};
  const sumByCategory: any = {};
  const categories: Array<string> = [];
  const sums: Array<number> = [];

  payments?.forEach((payment: paymentPreparedInterface) => {
    if (payment.sumOperationCurrency <= 0) {
      if (!filteredPaymentsByCategory[payment.category]) {
        sumByCategory[payment.category] = 0;
        filteredPaymentsByCategory[payment.category] = [];
      }
      filteredPaymentsByCategory[payment.category].push(payment);
      sumByCategory[payment.category] += payment.sumCardCurrency;
    }
  });

  for (let key in sumByCategory) {
    categories.push(key);
    sums.push(sumByCategory[key]);
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
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export default PaymentStatistics;
