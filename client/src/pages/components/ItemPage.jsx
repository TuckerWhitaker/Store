import "./ItemPage.css";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function ItemPage(props) {
	let { ItemId } = useParams();

	console.log(ItemId);
	return (
		<div className="ItemPage">
			<img
				className="ItemPageImage"
				src="https://m.media-amazon.com/images/I/71BnqTCnBRL._AC_UX679_.jpg"
				alt="Italian Trulli"
			/>
			<div className="Iteminfo">
				<div className="ItemName">{ItemId}</div>
				<div className="ItemPrice">Price</div>
			</div>

			<div className="OptionParent">
				<div className="OptionName">OptionName</div>
				<div className="OptionContainer">
					<div className="OptionValue">Value1</div>
					<div className="OptionValue">Value2</div>
					<div className="OptionValue">Value3</div>
					<div className="OptionValue">Value4</div>
					<div className="OptionValue">Value5</div>
				</div>
			</div>
			<button className="ItemPageBtn">Add To Cart</button>
		</div>
	);
}

export default ItemPage;
