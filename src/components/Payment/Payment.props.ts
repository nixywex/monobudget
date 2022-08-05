export default interface PaymentInterface {
	time: number;
	description: string;
	category: string;
	amount: number;
	currency: string;
	balance: number;
	cardCurrency: string;
	operationAmount?: number;
}
