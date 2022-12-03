import "./Main.css";
import Item from "./components/Item";
import ItemPage from "./components/ItemPage";
import axios, { Axios } from "axios";
import ReactDOM from "react-dom/client";
import React, { useEffect, useRef, useState } from "react";

// get relevant item list but for now just all items
// loop through those items and add them to the main page

function Main() {
	const [ItemList, SetItemList] = useState([]);
	const [OptionList, SetOptionList] = useState([]);

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
		<div className="Parent">
			<div className="Main" id="Main">
				{ItemList.map((info, index) => {
					return (
						<Item
							key={index}
							ItemInfo={info}
							SetOptionList={SetOptionList}
						></Item>
					);
				})}
			</div>
		</div>
	);
	/*<ItemPage id="itempage" OptionList={OptionList} /> */
}

export default Main;
