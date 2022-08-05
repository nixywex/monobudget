export default interface CardProps {
	cardNum: string;
	balance: number;
	id: string;
	cardCurrency?: string;
	type?: "black" | "white" | "eAid";
}
