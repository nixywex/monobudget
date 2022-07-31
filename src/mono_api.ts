import axios from "axios";
import cc, { CurrencyCodeRecord } from "currency-codes";
import { getMccCategory } from "./mcc";

interface paymentInterface {
	id: string;
	time: number;
	description: string;
	mcc: number;
	originalMcc: number;
	amount: number;
	operationAmount: number;
	currencyCode: number;
	commissionRate: number;
	cashbackAmount: number;
	balance: number;
	hold: boolean;
	receiptId: string;
}

interface paymentPreparedInterface {
	paymentDescription: string;
	time: number;
	sumCardCurrency: number;
	sumOperationCurrency: number;
	currency: string | null;
	balance: number;
	category: Promise<string | null>;
}

interface accountInterface {
	balance: number;
	cashbackType: string;
	creditLimit: number;
	currencyCode: number;
	iban: string;
	id: string;
	maskedPan: Array<string>;
	sendId: string;
	type: string;
}
interface clientInfoInterface {
	accounts: Array<accountInterface>;
	clientId: string;
	name: string;
	permissions: string;
	webHookUrl: string;
}

const getJsonData = async (url: string, token: string): Promise<paymentInterface[]> => {
	return (
		await axios.get(url, {
			headers: {
				"X-Token": token,
			},
		})
	).data;
};

const getJsonClientInfo = async (url: string, token: string): Promise<clientInfoInterface> => {
	return (
		await axios.get(url, {
			headers: {
				"X-Token": token,
			},
		})
	).data;
};

const getPaymentsList = (payments: Array<paymentInterface>): Array<paymentPreparedInterface> => {
	return payments.map((payment) => {
		const currencyCode: CurrencyCodeRecord | undefined = cc.number(String(payment.currencyCode));

		return {
			paymentDescription: payment.description,
			time: payment.time,
			sumCardCurrency: payment.amount / 100,
			sumOperationCurrency: payment.operationAmount / 100,
			currency: currencyCode ? currencyCode.code : null,
			balance: payment.balance / 100,
			category: getMccCategory(payment.mcc),
		};
	});
};

const getPayments = async (url: string, token: string): Promise<paymentPreparedInterface[] | null> => {
	try {
		const jsonData: paymentInterface[] = await getJsonData(url, token);
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

const generateInfoURL = async (url: string, token: string, from: number, to?: number): Promise<string | null> => {
	if ((to ? to : Date.now()) - 2682000 > from) {
		console.error("Обраний занадто великий діапазон даних");
		return null;
	}

	try {
		const urlSample = "https://api.monobank.ua/personal/statement/";
		const clientInfo: clientInfoInterface = await getJsonClientInfo(url, token);
		const accounts = clientInfo.accounts;
		const id = accounts[2].id;
		return urlSample + id + "/" + from + "/" + (to ? to : "");
	} catch (e) {
		if (axios.isAxiosError(e)) console.log(e.message);
		else console.log("unexpected error");
		return null;
	}
};

export { getPayments, getJsonData, generateInfoURL };
