import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";

import "./Checkout.css";
import CheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
	"pk_test_51N1bXsEd09y8Pdkfy73uNcrCFoEvcRgtjLidObwdRBfVjzu37Yo1evbdyHkrZWggQyO54q4pzKhYQsDmIwjy28nC00m6S1NbfU"
);

export default function Checkout() {
	const [clientSecret, setClientSecret] = useState("");

	let orderIDS = [];

	useEffect(() => {
		if (JSON.parse(localStorage.getItem("Cart")) === null) {
			console.log("CART IS NULL");
		} else {
			console.log("CART NOT NULL");

			let OrderArray = JSON.parse(localStorage.getItem("Cart"));
			console.log(OrderArray);
			for (let i = 0; i < OrderArray.length; i++) {
				console.log(OrderArray[i]);
				orderIDS.push(OrderArray[i].id);
			}
		}
		console.log(orderIDS);

		// Create PaymentIntent as soon as the page loads
		fetch("http://localhost:3001/create-payment-intent", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				items: [orderIDS],
			}),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, []);

	const appearance = {
		theme: "stripe",
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<div className="Checkout">
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			)}
		</div>
	);
}
