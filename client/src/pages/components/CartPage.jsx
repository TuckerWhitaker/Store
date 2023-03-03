import "./CartPage.css";
import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function CartPage() {
	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);

	const [OrderArray, SetOrderArray] = useState([]);
	const [EmptyCart, SetEmptyCart] = useState();
	let CartTotal = 0;

	useEffect(() => {
		if (JSON.parse(localStorage.getItem("Cart")) === null) {
			console.log("PFJOPAWFOAN");
			SetOrderArray([]);
			SetEmptyCart("Your cart is currently empty!");
			forceUpdate();
		} else {
			SetOrderArray(JSON.parse(localStorage.getItem("Cart")));
			SetEmptyCart("");
		}
		console.log(OrderArray);
	}, []);

	return (
		<div className="CartParent">
			<div className="ItemList">
				{EmptyCart}
				{OrderArray.map((info, index) => {
					return (
						<div className="ItemListChild" key={index}>
							<div className="ItemColumn">Image</div>
							<div className="ItemColumn">{info.ItemName}</div>
							<div className="ItemColumn">{info.ItemPrice}</div>
						</div>
					);
				})}
			</div>
			<div className="OrderInfo">
				{OrderArray.map((info, index) => {
					CartTotal += parseInt(info.ItemPrice);
					document.getElementById("CartTotal").innerHTML = CartTotal;
				})}
				<div id="CartTotal"></div>
				<button
					className="OrderBtn"
					onClick={() => {
						axios
							.post("http://localhost:3001/api/OrderItem", {
								OrderArray: OrderArray,
							})
							.then((response) => {
								if (response.data == "success") {
									localStorage.clear("Cart");
									window.location.href = "http://localhost:3000/cart";
								} else if (response.data == "fail") {
									alert("Fail");
								}
							});
					}}
				>
					Proceed to Checkout
				</button>
				<button
					onClick={() => {
						localStorage.clear("Cart");
						window.location.href = "http://localhost:3000/cart";
					}}
				>
					Clear Cart
				</button>
			</div>
		</div>
	);
}
export function SendOrder(input) {
	console.log(input);
}
export default CartPage;
