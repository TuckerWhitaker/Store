import "./ItemPage.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { Axios } from "axios";

function ItemPage(props) {
	const [ItemName, SetItemName] = useState("");
	const [ItemDesc, SetItemDesc] = useState("");
	const [ItemPrice, SetItemPrice] = useState();
	const [OptionList, SetOptionList] = useState([]);
	const [EndDate, SetEndDate] = useState();
	let { ItemId } = useParams();

	function delay(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	async function UpdateDate() {
		await delay(5000);
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
			console.log(EndDate);

			var countDownDate = new Date(
				months[EndDate[5] + EndDate[6]] +
					"" +
					(EndDate[8] + EndDate[9]) +
					", " +
					EndDate[0] +
					EndDate[1] +
					EndDate[2] +
					EndDate[3] +
					" 12:00:00"
			).getTime();
			//var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();
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
					SetEndDate(response.data.endDate);
					UpdateDate();
				}
			});
	};

	useEffect(() => {
		GetItem();
	}, []);

	return (
		<div className="ItemPage">
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

			<div id="time">{EndDate}</div>
			<button className="ItemPageBtn" onClick={() => {}}>
				Add To Cart
			</button>
		</div>
	);
}

export default ItemPage;
