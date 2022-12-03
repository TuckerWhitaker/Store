import "./CreateItem.css";
import React, { useState } from "react";
import axios, { Axios } from "axios";
let CurrentOptionValues = [];
let CurrentOption;
let optionnames = [];

function CreateItem() {
	const [OptionName, SetOptionName] = useState("");
	const [ValueName, SetValueName] = useState("");
	const [ItemName, SetItemName] = useState("");
	const [ItemDescription, SetDescription] = useState("");
	const [Price, SetPrice] = useState();

	const SetValueList = (OptionID) => {
		OptionID = OptionID.id;
		let parent = document.getElementById("CurrentValues");
		if (parent.childElementCount > 0) {
			while (parent.firstChild) {
				parent.removeChild(parent.firstChild);
			}
		}
		if (CurrentOptionValues[OptionID] != undefined) {
			for (let i = 0; i < CurrentOptionValues[OptionID].length; i++) {
				let v = document.createElement("div");
				v.innerHTML = CurrentOptionValues[OptionID][i];
				v.className = "CreateItemOption";
				document.getElementById("CurrentValues").appendChild(v);
			}
		}
	};

	const AddToValueList = (OptionID) => {
		OptionID = OptionID.id;
		console.log(CurrentOptionValues);
		CurrentOptionValues[OptionID].push(ValueName);
		let v = document.createElement("div");
		v.innerHTML = ValueName;
		v.className = "CreateItemOption";
		document.getElementById("CurrentValues").appendChild(v);
	};

	const AddOption = () => {
		console.log(CurrentOptionValues);
		var option = document.createElement("button");
		option.className = "CreateItemOption";
		option.innerHTML = OptionName;
		optionnames.push(OptionName);
		console.log("optionNames: ");
		console.log(optionnames);
		option.id = document.getElementById(
			"CreateItemOptionContainer"
		).childElementCount;
		option.addEventListener("click", () => {
			if (CurrentOption != undefined) {
				CurrentOption.style.backgroundColor = "rgb(200, 200, 200)";
			}
			option.style.backgroundColor = "#FBFBFB";
			CurrentOption = option;

			SetValueList(CurrentOption);
			console.log(option.id);
		});
		CurrentOptionValues.push([]);
		document.getElementById("CreateItemOptionContainer").appendChild(option);
	};

	return (
		<div className="CreateItemPage">
			<div className="CreateItemColumn">
				<div className="CreateItemInParent">
					<label className="CreateItemLabel">Name: </label>
					<input
						className="CreateItemInput"
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
			</div>
			<div className="CreateItemColumn">
				<div
					className="CreateItemOptionContainer"
					id="CreateItemOptionContainer"
				></div>
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
						AddToValueList(CurrentOption);
					}}
					className="CreateItemBtn"
				>
					Add Value to Selected Option
				</button>
			</div>
		</div>
	);
}

export default CreateItem;
