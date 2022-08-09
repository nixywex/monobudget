import axios from "axios";
import cc from "currency-codes";
import { getMccCategory } from "./mcc";
import {
  paymentInterface,
  paymentPreparedInterface,
  clientInfoInterface,
} from "./mono_api_interfaces";

const getJsonClientInfo = async (
  token: string
): Promise<clientInfoInterface> => {
  const url = "https://api.monobank.ua/personal/client-info";

  return (
    await axios.get(url, {
      headers: {
        "X-Token": token,
      },
    })
  )?.data;
};

const getJsonPayments = async (
  url: string,
  token: string
): Promise<paymentInterface[]> => {
  return (
    await axios.get(url, {
      headers: {
        "X-Token": token,
      },
    })
  )?.data;
};

const getPaymentsList = (
  payments: Array<paymentInterface>
): Array<paymentPreparedInterface> => {
  return payments.map((payment) => {
    let currencyCode: string | undefined = cc.number(
      String(payment.currencyCode)
    )?.code;
    if (!currencyCode) currencyCode = "UAH";

    let category: string | null = getMccCategory(payment.mcc);
    if (!category) category = "Інше";

    return {
      paymentDescription: payment.description,
      time: payment.time,
      sumCardCurrency: payment.amount / 100,
      sumOperationCurrency: payment.operationAmount / 100,
      currency: currencyCode,
      balance: payment.balance / 100,
      category: category,
      id: payment.id,
    };
  });
};

const getPayments = async (
  url: string,
  token: string
): Promise<paymentPreparedInterface[] | null> => {
  const jsonData: paymentInterface[] = await getJsonPayments(url, token);
  return getPaymentsList(jsonData);
};

const generateInfoURL = (id: string, from: number, to?: number): string => {
  const urlSample = "https://api.monobank.ua/personal/statement/";
  return urlSample + id + "/" + from + "/" + (to ? to : "");
};

export { getPayments, getJsonPayments, generateInfoURL, getJsonClientInfo };
