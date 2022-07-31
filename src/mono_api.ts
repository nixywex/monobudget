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

const getJsonData = async (url: string, token: string): Promise<paymentInterface[]> => {
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

export { getPayments, getJsonData };
