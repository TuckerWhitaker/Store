import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AdminCreateItemTest.css";
function AdminCreateItemTest() {
	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);

	let AdminDropDownStates = [true, true, true, true, true, true];

	const [ItemList, SetItemList] = useState([]);
	const [selectedItem, SetSelectedItem] = useState({
		customText: [""],
		description: "w",
		endDate: "",
		id: null,
		imageNames: [],
		limitedTime: "",
		name: "",
		options: [],
		price: null,
	});

	const GetItemList = () => {
		axios.post("http://localhost:3001/api/GetItems").then((response) => {
			SetItemList(response.data);
		});
	};

	useEffect(() => {
		GetItemList();
		console.log(ItemList);
	}, []);

	return (
		<div className="AdminCreateItemTest">
			<div className="AdminColumn">
				<div className="AdminDropDown">
					<button
						className="AdminDropDownHeader"
						onClick={() => {
							if (AdminDropDownStates[0] === true) {
								document.getElementById("AdminDropDownContent").style.height =
									"0px";
								AdminDropDownStates[0] = false;
							} else if (AdminDropDownStates[0] === false) {
								document.getElementById("AdminDropDownContent").style.height =
									"fit-content";
								AdminDropDownStates[0] = true;
							}
						}}
					>
						Basic Information
					</button>
					<div className="AdminDropDownContent" id="AdminDropDownContent">
						Name:
						<input
							value={selectedItem.name}
							onChange={(e) => {
								selectedItem.name = e.target.value;
								SetSelectedItem(selectedItem);
								forceUpdate();
							}}
						></input>
					</div>
				</div>
				<div className="AdminDropDown">
					<button
						className="AdminDropDownHeader"
						onClick={() => {
							if (AdminDropDownStates[1] === true) {
								document.getElementById("AdminDropDownContent1").style.height =
									"0px";
								AdminDropDownStates[1] = false;
							} else if (AdminDropDownStates[1] === false) {
								document.getElementById("AdminDropDownContent1").style.height =
									"fit-content";
								AdminDropDownStates[1] = true;
							}
						}}
					>
						Options
					</button>
					<div className="AdminDropDownContent" id="AdminDropDownContent1">
						{selectedItem.options.map((info, index) => {
							let SelectedOptionID = 0;
							return (
								<div className="AdminOptionParent" key={index}>
									<input
										className="AdminOptionName"
										value={selectedItem.options[index][0]}
										onChange={(e) => {
											selectedItem.options[index][0] = e.target.value;
											SetSelectedItem(selectedItem);
											forceUpdate();
										}}
									></input>
									<div className="AdminOptionContainer">
										{selectedItem.options[index].map((info2, index2) => {
											if (index2 > 0) {
												return (
													<input
														className="AdminOptionValue"
														key={index2}
														id={index + ":" + index2}
														value={selectedItem.options[index][index2]}
														onChange={(e) => {
															selectedItem.options[index][index2] =
																e.target.value;
															SetSelectedItem(selectedItem);
															forceUpdate();
														}}
													></input>
												);
											}
										})}
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className="AdminDropDown">
					<button
						className="AdminDropDownHeader"
						onClick={() => {
							if (AdminDropDownStates[2] === true) {
								document.getElementById("AdminDropDownContent2").style.height =
									"0px";
								AdminDropDownStates[2] = false;
							} else if (AdminDropDownStates[2] === false) {
								document.getElementById("AdminDropDownContent2").style.height =
									"fit-content";
								AdminDropDownStates[2] = true;
							}
						}}
					>
						Limited Time
					</button>
					<div className="AdminDropDownContent" id="AdminDropDownContent2">
						content
					</div>
				</div>
			</div>
			<div className="AdminColumn">
				{ItemList.map((info, index) => {
					return (
						<button
							className="AdminItemListItem"
							key={index}
							onClick={() => {
								console.log(ItemList);
								SetSelectedItem(ItemList[index]);
							}}
						>
							{info.name}
						</button>
					);
				})}
			</div>
		</div>
	);
}

export default AdminCreateItemTest;
