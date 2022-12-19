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

	const GetItem = () => {
		axios
			.post("http://localhost:3001/api/GetItem", { id: ItemId })
			.then((response) => {
				console.log(response);
				SetItemName(response.data.name);
				SetItemPrice(response.data.price);
				SetOptionList(response.data.options);
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

			<button className="ItemPageBtn">Add To Cart</button>
		</div>
	);
}

export default ItemPage;
