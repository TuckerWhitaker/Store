import axios, { Axios } from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ItemPage.css";
import ImageCarousel from "./imageCarousel";

function ItemPage(props) {
	const [CustomTextArray, SetCustomTextArray] = useState([]);
	const [SelectedOptions, SetSelectedOptions] = useState([]);

	const [ImageId, SetImageId] = useState();
	const [ItemName, SetItemName] = useState("");
	const [ItemPrice, SetItemPrice] = useState();
	const [OptionList, SetOptionList] = useState([]);
	const [CustomTextList, SetCustomTextList] = useState([]);
	const [ImageList, SetImageList] = useState([]);

	let { ItemId } = useParams();

	async function UpdateDate(enddate) {
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

				if (response.data.endDate) {
					UpdateDate(response.data.endDate);
				}

				SetImageList(response.data.imageNames);
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

				<ImageCarousel images={ImageList} id="ImageCarousel"></ImageCarousel>
				<div className="Iteminfo">
					<div className="ItemPrice" id="price">
						${ItemPrice}
					</div>
				</div>
				<button
					className="ItemPageBtn"
					id="OrderButton"
					onClick={() => {
						let order = {
							id: Number(ItemId),
							ItemName: ItemName,
							ItemPrice: ItemPrice,
							CustomTextArray: [],
							SelectedOptions: [],
							ImageList: ImageList,
						};
						for (let i = 0; i < CustomTextArray.length; i++) {
							order.CustomTextArray.push(
								CustomTextList[i] + " : " + CustomTextArray[i]
							);
						}
						for (let i = 0; i < SelectedOptions.length; i++) {
							order.SelectedOptions.push(
								OptionList[i][0] + " : " + SelectedOptions[i]
							);
						}

						if (localStorage.getItem("Cart") === null) {
							localStorage.setItem("Cart", JSON.stringify([order]));
						} else {
							console.log(JSON.parse(localStorage.getItem("Cart")));
							let Temp = JSON.parse(localStorage.getItem("Cart"));
							Temp.push(order);
							localStorage.setItem("Cart", JSON.stringify(Temp));
						}

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
							<input
								type="text"
								className="CustomTextListInputIN"
								onChange={(e) => {
									CustomTextArray[index] = e.target.value;
									SetCustomTextArray(CustomTextArray);
									console.log(CustomTextArray);
								}}
							></input>
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
														).style.backgroundColor = "#decac5";
													}
													SelectedOptions[index] = info2;
													SetSelectedOptions(SelectedOptions);
													console.log(SelectedOptions);
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
