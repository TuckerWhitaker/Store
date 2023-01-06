import "./CartPage.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
function CartPage(props) {
	const [Itemids, SetItemids] = useState([]);
	const [ItemName, SetItemName] = useState("");
	const [ItemPrice, SetItemPrice] = useState();

	useEffect(() => {
		let ids = localStorage.CartItemIDs;

		let items = Itemids;

		for (let i = 0; i < ids.length; i++) {
			if (ids[i] == "i" && ids[i + 1] == "d") {
				let Item = [];
				for (let j = i + 3; j < i + 12; j++) {
					Item.push(ids[j]);
				}

				items.push(
					Item[0] +
						Item[1] +
						Item[2] +
						Item[3] +
						Item[4] +
						Item[5] +
						Item[6] +
						Item[7] +
						Item[8]
				);
			}
		}

		for (let i = 0; i < Itemids.length; i++) {
			axios
				.post("http://localhost:3001/api/GetItem", { id: Itemids[i] })
				.then((response) => {
					SetItemName(response.data.name);
					SetItemPrice(response.data.price);
					//SetOptionList(response.data.options);
					//SetImageId(response.data.imageNames[0]);

					/*if (response.data.limitedTime) {
					console.log(response.data.endDate);
					UpdateDate(response.data.endDate);
				}
				document.getElementById("Image").src =
					"http://localhost:3001/api/getImage?id=" +
					response.data.imageNames[0];
					*/
				});
		}

		console.log(Itemids);
	}, []);

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
