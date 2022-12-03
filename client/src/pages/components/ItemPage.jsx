import "./ItemPage.css";
import React, { useEffect } from "react";

function ItemPage() {
	useEffect(() => {
		setTimeout(() => {
			Accordian();
		}, 1000);
	});
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
			<div>
				<button className="accordion">Option: CurrentSelectedValue</button>
				<div className="panel">
					<button className="ItemPageBtn">Value</button>
					<button className="ItemPageBtn">Value</button>
					<button className="ItemPageBtn">Value</button>
				</div>
			</div>
			<button
				onClick={() => {
					Accordian();
				}}
			>
				CLICK for accordians to work
			</button>
		</div>
	);
}

const Accordian = () => {
	var acc = document.getElementsByClassName("accordion");
	var i;

	for (i = 0; i < acc.length; i++) {
		acc[i].addEventListener("click", function () {
			this.classList.toggle("active");
			var panel = this.nextElementSibling;
			if (panel.style.maxHeight) {
				panel.style.maxHeight = null;
			} else {
				panel.style.maxHeight = panel.scrollHeight + "px";
			}
		});
	}
};

export default ItemPage;
