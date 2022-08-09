export default interface PaymentProps {
  time?: number;
  description: string;
  category?: string;
  amount: number;
  currency?: string | null;
  balance?: number;
  cardCurrency: string;
  operationAmount?: number;
}
