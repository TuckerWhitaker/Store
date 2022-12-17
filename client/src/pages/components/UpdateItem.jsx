import "./UpdateItem.css";
import axios, { Axios } from "axios";
import React, { useEffect, useRef, useState } from "react";

function UpdateItem() {
	const [ItemList, SetItemList] = useState([]);
	const GetItemList = () => {
		axios.post("http://localhost:3001/api/GetItems").then((response) => {
			console.log(response.data);
			SetItemList(response.data);
		});
	};

	useEffect(() => {
		GetItemList();
	}, []);

	return (
		<div className="UpdateItemParent">
			<div className="UpdateItemList">
				{ItemList.map((info, index) => {
					return (
						<button
							className="ItemListItem"
							key={index}
							onClick={() => {
								/* Get Item Info */
							}}
						>
							{info.name}
						</button>
					);
				})}
			</div>
			<div className="UpdateItemInfo">
				<input className="UpdateItemInfoInput" placeholder="name"></input>
				<input className="UpdateItemInfoInput" placeholder="desc"></input>
				<input className="UpdateItemInfoInput" placeholder="price"></input>
			</div>
		</div>
	);
}

export default UpdateItem;
