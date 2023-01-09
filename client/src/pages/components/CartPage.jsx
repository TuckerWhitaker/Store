import "./CartPage.css";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function CartPage() {
	const itemIds = Cookies.get("cart");

	const [ItemIdArray, SetItemIdArray] = useState([]);
	const [Items, SetItems] = useState([]);
	const [ItemName, SetItemName] = useState("");
	const [ItemPrice, SetItemPrice] = useState();

	let id = "";
	for (let i = 0; i < itemIds.length; i++) {
		if (itemIds[i] == "*") {
			ItemIdArray.push(id);
			id = "";
		} else {
			id = id + itemIds[i];
		}
	}

	console.log(ItemIdArray);

	useEffect(() => {
		for (let i = 0; i < ItemIdArray.length; i++) {
			axios
				.post("http://localhost:3001/api/GetItem", { id: ItemIdArray[i] })
				.then((response) => {
					console.log(response);
					//response.data
					Items.push(response.data);
					SetItems(Items);
					console.log(Items);
				});
		}
	}, []);

	return (
		<div className="CartParent">
			<div className="ItemList">
				{Items.map((info, index) => {
					return <div key={index}>1</div>;
				})}
				<div className="ItemListChild">
					<div className="ItemColumn">Image</div>
					<div className="ItemColumn">Name/desc</div>
					<div className="ItemColumn">Price</div>
				</div>
			</div>
			<div className="OrderInfo">
				<div>Total</div>
				<button className="OrderBtn">Proceed to Checkout</button>
				<button
					onClick={() => {
						Cookies.set("cart", "");
					}}
				>
					Clear Cart
				</button>
			</div>
		</div>
	);
}

export default CartPage;
