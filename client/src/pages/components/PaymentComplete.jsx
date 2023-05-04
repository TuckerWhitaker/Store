import axios from "axios";

function PaymentComplete() {
	let OrderArray = JSON.parse(localStorage.getItem("Cart"));
	axios.post("http://localhost:3001/api/OrderItem", {
		OrderArray: OrderArray,
	});

	localStorage.clear("Cart");
	return <div>Your order is complete!</div>;
}

export default PaymentComplete;
