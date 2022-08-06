import axios from "axios";
import cc, { CurrencyCodeRecord } from "currency-codes";
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
    const currencyCode: CurrencyCodeRecord | undefined = cc.number(
      String(payment.currencyCode)
    );

    return {
      paymentDescription: payment.description,
      time: payment.time,
      sumCardCurrency: payment.amount / 100,
      sumOperationCurrency: payment.operationAmount / 100,
      currency: currencyCode ? currencyCode.code : null,
      balance: payment.balance / 100,
      category: getMccCategory(payment.mcc),
      id: payment.id,
    };
  });
};

const getPayments = async (
  url: string,
  token: string
): Promise<paymentPreparedInterface[] | null> => {
  try {
    const jsonData: paymentInterface[] = await getJsonPayments(url, token);
    return getPaymentsList(jsonData);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error("Something went wrong: " + e.message);
    } else {
      console.error("unexpected error");
    }
    return null;
  }
};

const generateInfoURL = async (
  id: string,
  from: number,
  to?: number
): Promise<string | null> => {
  try {
    const urlSample = "https://api.monobank.ua/personal/statement/";
    return urlSample + id + "/" + from + "/" + (to ? to : "");
  } catch (e) {
    if (axios.isAxiosError(e)) console.log(e.message);
    else console.log("unexpected error");
    return null;
  }
};

export { getPayments, getJsonPayments, generateInfoURL, getJsonClientInfo };
