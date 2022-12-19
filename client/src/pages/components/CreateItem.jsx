import "./CreateItem.css";
import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";

function CreateItem() {
	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);

	const [ItemList, SetItemList] = useState([]);
	const GetItemList = () => {
		axios.post("http://localhost:3001/api/GetItems").then((response) => {
			SetItemList(response.data);
		});
	};

	useEffect(() => {
		GetItemList();
	}, []);

	const ClearItems = () => {
		axios.post("http://localhost:3001/api/ClearItems");
	};

	//Option and Value List
	const [OptionList, SetOptionList] = useState([]);
	//first of every array is name and rest is values
	//OptionList.push([OptionName]) for every new option
	//

	const [ItemName, SetItemName] = useState("");
	//selected option should be index of option
	const [SelectedOption, SetSelectedOption] = useState();
	const [ItemDescription, SetDescription] = useState("");
	const [Price, SetPrice] = useState();
	const [OptionName, SetOptionName] = useState("");
	const [ValueName, SetValueName] = useState("");
	const [ItemID, SetItemID] = useState();

	const AddOption = () => {
		OptionList.push([OptionName]);
		SetOptionList(OptionList);
		forceUpdate();
	};

	const AddValue = () => {};

	return (
		<div className="CreateItemPage">
			<div className="CreateItemColumn">
				<div className="CreateItemInParent">
					<label className="CreateItemLabel">Name: </label>
					<input
						className="CreateItemInput"
						id="ItemNameInput"
						onChange={(e) => {
							SetItemName(e.target.value);
						}}
					></input>
				</div>
				<div className="CreateItemInParent">
					<label className="CreateItemLabel">Description: </label>
					<textarea
						className="CreateItemInput"
						id="description"
						onChange={(e) => {
							SetDescription(e.target.value);
						}}
					></textarea>
				</div>
				<div className="CreateItemInParent">
					<label className="CreateItemLabel">Price: </label>
					<input
						type="number"
						className="CreateItemInput"
						id="ItemPrice"
						onChange={(e) => {
							SetPrice(e.target.value);
						}}
					></input>
				</div>
				<button
					className="CreateItemBtn"
					onClick={() => {
						console.log(optionnames);
						axios
							.post("http://localhost:3001/api/CreateItem", {
								name: ItemName,
								description: ItemDescription,
								price: Price,
								options: CurrentOptionValues,
								optionNames: optionnames,
							})
							.then((response) => {
								if (response == "success") {
									alert("success!");
								}
							});
					}}
				>
					Create Item
				</button>
				<button
					className="CreateItemBtn"
					onClick={() => {
						//UPDATE ITEM
						/*axios
							.post("http://localhost:3001/api/UpdateItem", {
								id: ItemID,
								name: ItemName,
								description: ItemDescription,
								price: Price,
								options: CurrentOptionValues,
								optionNames: optionnames,
							})
							.then((response) => {
								if (response == "success") {
									alert("success!");
								}
							});*/

						console.log(ItemID);
					}}
				>
					Update Item
				</button>
			</div>
			<div className="CreateItemColumn">
				<div
					className="CreateItemOptionContainer"
					id="CreateItemOptionContainer"
				>
					{OptionList.map((info, index) => {
						console.log(info);
						return (
							<button
								className="CreateItemOption"
								key={index}
								id={"option" + index}
								onClick={() => {
									if (SelectedOption != undefined) {
										document.getElementById(
											"option" + SelectedOption
										).style.backgroundColor = "rgb(200, 200, 200)";
									}
									document.getElementById(
										"option" + index
									).style.backgroundColor = "#FBFBFB";
									SetSelectedOption(index);

									//set value list
								}}
							>
								{info}
							</button>
						);
					})}
				</div>
				<input
					className="CreateItemInput"
					onChange={(e) => {
						SetOptionName(e.target.value);
					}}
				></input>
				<button
					onClick={() => {
						AddOption();
					}}
					className="CreateItemBtn"
				>
					Add Option
				</button>
				<div className="CreateItemValueContainer" id="CurrentValues"></div>
				<input
					className="CreateItemInput"
					onChange={(e) => {
						SetValueName(e.target.value);
					}}
				></input>
				<button
					onClick={() => {
						AddValue(SelectedOption);
					}}
					className="CreateItemBtn"
				>
					Add Value to Selected Option
				</button>
				<button
					onClick={() => {
						ClearItems();
					}}
				>
					CLEAR ALL ITEMS FROM DB
				</button>
			</div>
			<div className="CreateItemColumn">
				<div className="UpdateItemList">
					{ItemList.map((info, index) => {
						return (
							<button
								className="ItemListItem"
								key={index}
								onClick={() => {
									console.log("click");
									document.getElementById("ItemNameInput").value = info.name;
									SetItemName(info.name);
									document.getElementById("description").value =
										info.description;
									SetDescription(info.description);
									document.getElementById("ItemPrice").value = info.price;
									SetPrice(info.price);
									SetItemID(info.id);
								}}
							>
								{info.name}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default CreateItem;
