import "./ItemPage.css";
import React, { useEffect } from "react";

function ItemPage() {
	return (
		<div className="ItemPage">
			<div className="Iteminfo">
				<div className="ItemName">Name</div>
				<div className="ItemPrice">Price</div>
			</div>
			<img
				className="ItemPageImage"
				src="https://m.media-amazon.com/images/I/71BnqTCnBRL._AC_UX679_.jpg"
				alt="Italian Trulli"
			/>

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
		</div>
	);
}

export default ItemPage;
