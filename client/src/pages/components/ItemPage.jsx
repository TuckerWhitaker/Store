import "./ItemPage.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { Axios } from "axios";
import Cookies from "js-cookie";

function ItemPage(props) {
	const [ImageId, SetImageId] = useState();
	const [ItemName, SetItemName] = useState("");
	const [ItemPrice, SetItemPrice] = useState();
	const [OptionList, SetOptionList] = useState([]);
	const [CustomTextList, SetCustomTextList] = useState([]);

	let { ItemId } = useParams();

	async function UpdateDate(enddate) {
		console.log(enddate);
		var x = setInterval(function () {
			var countDownDate = new Date(enddate).getTime();
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
				SetCustomTextList(response.data.customText);
				SetImageId(response.data.imageNames[0]);

				if (response.data.limitedTime) {
					console.log(response.data.endDate);
					UpdateDate(response.data.endDate);
				}
				document.getElementById("Image").src =
					"http://localhost:3001/api/getImage?id=" +
					response.data.imageNames[0];
			});
	};

	useEffect(() => {
		GetItem();
	}, []);

	return (
		<div className="ItemPage">
			<div className="ItemPageColumn">
				<div className="ItemName" id="name">
					{ItemName}
				</div>
				<div id="time"></div>
				<img className="ItemPageImage" id="Image" alt="Italian Trulli" />
				<div className="Iteminfo">
					<div className="ItemPrice" id="price">
						${ItemPrice}
					</div>
				</div>
				<button
					className="ItemPageBtn"
					id="OrderButton"
					onClick={() => {
						Cookies.set("cart", ItemId + "*" + Cookies.get("cart"));
						console.log(Cookies.get("cart"));
						document.getElementById("OrderButton").innerHTML = "Added to cart!";
						document.getElementById("OrderButton").style.backgroundColor =
							"#2EAA2A";
					}}
				>
					Add To Cart
				</button>
			</div>

			<div className="ItemPageColumn" id="ItemPageColumn2">
				<div className="Quantity">
					Quantity{" "}
					<input type="number" className="QuantityInp" placeholder={1}></input>
				</div>

				{CustomTextList.map((info, index) => {
					return (
						<div key={"CTL" + index} className="CustomTextListInput">
							{info}{" "}
							<input type="text" className="CustomTextListInputIN"></input>
						</div>
					);
				})}
				{OptionList.map((info, index) => {
					let SelectedOptionID = 0;
					return (
						<div className="OptionParent" key={index}>
							<div className="OptionName">{info[0]}</div>
							<div className="OptionContainer">
								{OptionList[index].map((info2, index2) => {
									if (index2 > 0) {
										return (
											<div
												className="OptionValue"
												key={index2}
												id={index + ":" + index2}
												onClick={() => {
													if (SelectedOptionID !== 0) {
														document.getElementById(
															SelectedOptionID
														).style.backgroundColor = "#979696";
													}

													SelectedOptionID = index + ":" + index2;
													document.getElementById(
														index + ":" + index2
													).style.backgroundColor = "#ffffff";
												}}
											>
												{info2}
											</div>
										);
									}
								})}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ItemPage;
