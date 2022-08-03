import React from "react";

import "./Payment.css";

interface PaymentInterface {
	time: number;
	description: string;
	category: string;
	amount: number;
	currency: string;
	balance: number;
	cardCurrency: string;
	operationAmount?: number;
}

const Payment = ({
	time,
	description,
	category,
	amount,
	currency,
	balance,
	cardCurrency,
	operationAmount,
}: PaymentInterface) => {
	return (
		<div className='payment'>
			<div className='payment__info'>
				<div className='payment__info__description'>
					<h1>{description}</h1>
				</div>
				<div className='payment__info__category'>
					<p>{category}</p>
				</div>
			</div>
			<div className='payment__sum'>
				<div className='payment__sum__amount'>
					<p>
						{amount} {cardCurrency}
					</p>
				</div>
				{operationAmount && (
					<div className='payment__sum__operationAmount'>
						<p>
							{operationAmount} {currency}
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Payment;
