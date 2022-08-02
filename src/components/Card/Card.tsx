import React from "react";
import cn from "classnames";

import "./Card.css";

interface CardProps {
	cardNum: string;
	balance: number;
	id: string;
	cardCurrency?: string;
	type?: "black" | "white" | "e-aid";
}

function Card({ cardNum, balance, id, cardCurrency = "UAH", type = "black" }: CardProps): React.ReactElement {
	return (
		<div
			className={cn("card", {
				"card_white-card": type === "white",
				"card_black-card": type === "black",
				"card_e-aid-card": type === "e-aid",
			})}
		>
			<div className='card__logo'>
				<img src={`./mono_logo${type === "black" ? "_white" : ""}.png`} alt='monobank logo' width={120} height={34} />
			</div>
			<div
				className={cn("card__card-num", {
					"card__card-num_white-card": type === "white",
					"card__card-num_black-card": type === "black",
					"card__card-num_e-aid-card": type === "e-aid",
				})}
			>
				<p>{cardNum}</p>
			</div>
			<div
				className={cn("card__card-balance", {
					"card__card-balance_white-card": type === "white",
					"card__card-balance_black-card": type === "black",
					"card__card-balance_e-aid-card": type === "e-aid",
				})}
			>
				<p>
					{balance} {cardCurrency}
				</p>
			</div>
		</div>
	);
}

export default Card;
