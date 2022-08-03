import React from "react";

import "./App.css";
import Payment from "./components/Payment/Payment";

function App(): React.ReactElement {
	return (
		<div className='App'>
			<Payment
				time={5}
				description={"ATB MARKET"}
				category='Продукты'
				amount={278.31}
				operationAmount={278.31}
				currency='UAH'
				balance={5091.77}
				cardCurrency='UAH'
			/>
		</div>
	);
}

export default App;
