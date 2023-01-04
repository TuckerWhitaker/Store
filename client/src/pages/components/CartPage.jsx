import "./CartPage.css";
import React, { useState } from "react";

function CartPage(props) {
	const [Itemids, SetItemids] = useState([]);

	let ids = localStorage.CartItemIDs;
	console.log(ids);
	console.log("PPQQ");
	let items = Itemids;
	for (let i = 0; i < ids.length; i++) {
		if (
			ids[i] == "i" &&
			ids[i + 1] == "t" &&
			ids[i + 2] == "e" &&
			ids[i + 3] == "m" &&
			ids[i + 4] == "i" &&
			ids[i + 5] == "d" &&
			ids[i + 6] == ":"
		) {
			console.log(i + "!");

			items.push(
				ids[i + 7] +
					ids[i + 8] +
					ids[i + 9] +
					ids[i + 10] +
					ids[i + 11] +
					ids[i + 12] +
					ids[i + 13] +
					ids[i + 14] +
					ids[i + 15] +
					ids[i + 16] +
					ids[i + 17] +
					ids[i + 18] +
					ids[i + 19]
			);
			i += 12;
			console.log(i + " ?");
		}
	}
	SetItemids(items);
	console.log(Itemids);

	return (
		<div className="CartParent">
			<div className="ItemList">
				<div className="ItemListChild">
					<div className="ItemColumn">Image</div>
					<div className="ItemColumn">Name/desc</div>
					<div className="ItemColumn">Price</div>
				</div>
			</div>
			<div className="OrderInfo">
				<div>Total</div>
				<button className="OrderBtn">Proceed to Checkout</button>
			</div>
		</div>
	);
}

export default CartPage;
