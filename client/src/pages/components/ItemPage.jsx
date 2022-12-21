import "./ItemPage.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { Axios } from "axios";

function ItemPage(props) {
	const [ItemName, SetItemName] = useState("");
	const [ItemDesc, SetItemDesc] = useState("");
	const [ItemPrice, SetItemPrice] = useState();
	const [OptionList, SetOptionList] = useState([]);
	let { ItemId } = useParams();

	async function UpdateDate(enddate) {
		var x = setInterval(function () {
			var months = [
				"0",
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec",
			];

			var countDownDate = new Date(
				months[enddate[5] + enddate[6]] +
					"" +
					(enddate[8] + enddate[9]) +
					", " +
					enddate[0] +
					enddate[1] +
					enddate[2] +
					enddate[3] +
					" 0:00:00"
			).getTime();
			var now = new Date().getTime();

			var distance = countDownDate - now;
			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var hours = Math.floor(
				(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);

			document.getElementById("time").innerHTML =
				days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

			if (distance < 0) {
				clearInterval(x);
				document.getElementById("time").innerHTML =
					"this item is no longer available";
				document.getElementById("OrderButton").style.display = "none";
			}
		}, 1000);
	}

	const GetItem = () => {
		axios
			.post("http://localhost:3001/api/GetItem", { id: ItemId })
			.then((response) => {
				console.log(response);
				SetItemName(response.data.name);
				SetItemPrice(response.data.price);
				SetOptionList(response.data.options);
				if (response.data.limitedTime) {
					//console.log(response.data.endDate);
					UpdateDate(response.data.endDate);
				}
			});
	};

	useEffect(() => {
		GetItem();
	}, []);

	return (
		<div className="ItemPage">
			<div id="time"></div>
			<img
				className="ItemPageImage"
				src="https://m.media-amazon.com/images/I/71BnqTCnBRL._AC_UX679_.jpg"
				alt="Italian Trulli"
			/>
			<div className="Iteminfo">
				<div className="ItemName" id="name">
					{ItemName}
				</div>
				<div className="ItemPrice" id="price">
					{ItemPrice}
				</div>
			</div>

			{OptionList.map((info, index) => {
				return (
					<div className="OptionParent" key={index}>
						<div className="OptionName">{info[0]}</div>
						<div className="OptionContainer">
							{OptionList[index].map((info2, index2) => {
								if (index2 > 0) {
									return (
										<div className="OptionValue" key={index2}>
											{info2}
										</div>
									);
								}
							})}
						</div>
					</div>
				);
			})}

			<button className="ItemPageBtn" id="OrderButton" onClick={() => {}}>
				Add To Cart
			</button>
		</div>
	);
}

export default ItemPage;
