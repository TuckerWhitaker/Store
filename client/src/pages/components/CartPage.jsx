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

	useEffect(() => {
		let id = "";
		for (let i = 0; i < itemIds.length; i++) {
			if (itemIds[i] == "*") {
				ItemIdArray.push(id);
				id = "";
			} else {
				id = id + itemIds[i];
			}
		}
		axios
			.post("http://localhost:3001/api/GetItemsWithIds", {
				ids: ItemIdArray,
			})
			.then((response) => {
				console.log(response);
				SetItems(response.data);
				console.log(response.data);
			});
	}, []);

	return (
		<div className="CartParent">
			<div className="ItemList">
				{Items.map((info, index) => {
					return (
						<div className="ItemListChild" key={index}>
							<div className="ItemColumn">Image</div>
							<div className="ItemColumn">{info.name}</div>
							<div className="ItemColumn">{info.price}</div>
						</div>
					);
				})}
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
