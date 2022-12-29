import "./CreateItem.css";
import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import FormData from "form-data";

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
	const [ItemName, SetItemName] = useState("");
	//selected option should be index of option
	const [SelectedOption, SetSelectedOption] = useState();
	const [SelectedValue, SetSelectedValue] = useState();
	const [ItemDescription, SetDescription] = useState("");
	const [Price, SetPrice] = useState();
	const [OptionName, SetOptionName] = useState("");
	const [ValueName, SetValueName] = useState("");
	const [ItemID, SetItemID] = useState();

	const [LimitedTime, SetLimitedTime] = useState();
	const [EndDate, SetEndDate] = useState();

	const [ImageFiles, SetImageFiles] = useState([]);

	function delay(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	const AddOption = () => {
		OptionList.push([OptionName]);
		SetOptionList(OptionList);
		forceUpdate();
	};

	const DeleteOption = () => {
		OptionList.splice(SelectedOption, 1);
		SetOptionList(OptionList);
		forceUpdate();
	};

	const AddValue = () => {
		OptionList[SelectedOption].push(ValueName);
		SetOptionList(OptionList);
		forceUpdate();
	};

	const DeleteValue = () => {
		OptionList[SelectedOption].splice(SelectedValue, 1);
		SetOptionList(OptionList);
		forceUpdate();
	};

	async function UploadImage() {
		console.log(ImageFiles);
		for (let i = 0; i < ImageFiles.length; i++) {
			await delay(1);
			let data = new FormData();
			data.append("file", ImageFiles[i]);

			axios
				.post("http://localhost:3001/image", data, {
					headers: {
						accept: "application/json",
						"Accept-Language": "en-US,en;q=0.8",
						"Content-Type": `multipart/form-data; boundary=${data._boundary}`,
					},
				})
				.then((response) => {
					//handle success
				})
				.catch((error) => {
					//handle error
				});
		}
	}

	return (
		<div className="CreateItemPage">
			<div className="CreateItemColumn">
				<div className="CreateItemInParent">
					<div>Item ID: {ItemID}</div>
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
						axios
							.post("http://localhost:3001/api/CreateItem", {
								name: ItemName,
								description: ItemDescription,
								price: Price,
								options: OptionList,
								limitedTime: LimitedTime,
								endDate: EndDate,
							})
							.then(() => {
								window.location.reload();
							});
					}}
				>
					Create Item
				</button>

				<button
					className="CreateItemBtn"
					onClick={() => {
						axios
							.post("http://localhost:3001/api/UpdateItem", {
								id: ItemID,
								name: ItemName,
								description: ItemDescription,
								price: Price,
								options: OptionList,
								limitedTime: LimitedTime,
								endDate: EndDate,
							})
							.then(() => {
								window.location.reload();
							});
					}}
				>
					Update Item
				</button>
				<button
					className="CreateItemBtnDanger"
					onClick={() => {
						axios
							.post("http://localhost:3001/api/DeleteItem", {
								id: ItemID,
							})
							.then(() => {
								window.location.reload();
							});
					}}
				>
					Delete Selected Item
				</button>
				<div className="DateContainer">
					<div className="DateText">Limited Time?</div>
					<input
						type="checkbox"
						className="CheckBox"
						id="LimitedTime"
						onChange={(e) => {
							SetLimitedTime(e.target.value);
						}}
					></input>
					<input
						type="date"
						id="SetDate"
						onChange={(e) => {
							SetEndDate(e.target.value);
						}}
					></input>
				</div>
			</div>
			<div className="CreateItemColumn">
				<div
					className="CreateItemOptionContainer"
					id="CreateItemOptionContainer"
				>
					{OptionList.map((info, index) => {
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
								{info[0]}
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
				<button
					onClick={() => {
						DeleteOption();
					}}
					className="CreateItemBtnDanger"
				>
					Delete Option
				</button>
				<div className="CreateItemValueContainer" id="CurrentValues">
					{OptionList.map((info, index) => {
						if (index === SelectedOption) {
							return info.map((info2, index2) => {
								if (index2 > 0) {
									return (
										<button
											key={"value" + index2}
											id={"value" + index2}
											className="CreateItemOption"
											onClick={() => {
												if (SelectedValue != undefined) {
													document.getElementById(
														"value" + SelectedValue
													).style.backgroundColor = "rgb(200, 200, 200)";
												}
												document.getElementById(
													"value" + index2
												).style.backgroundColor = "#FBFBFB";
												SetSelectedValue(index2);
											}}
										>
											{info2}
										</button>
									);
								}
							});
						}
					})}
				</div>
				<input
					className="CreateItemInput"
					onChange={(e) => {
						SetValueName(e.target.value);
					}}
				></input>
				<button
					onClick={() => {
						AddValue();
					}}
					className="CreateItemBtn"
				>
					Add Value to Selected Option
				</button>
				<button
					onClick={() => {
						DeleteValue();
					}}
					className="CreateItemBtnDanger"
				>
					Delete Value from Selected Option
				</button>
				<button
					className="ClearAll"
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
									document.getElementById("ItemNameInput").value = info.name;
									SetItemName(info.name);
									document.getElementById("description").value =
										info.description;
									SetDescription(info.description);
									document.getElementById("ItemPrice").value = info.price;
									SetPrice(info.price);
									SetItemID(info.id);
									SetOptionList(info.options);
									SetSelectedOption(undefined);
									SetSelectedValue(undefined);
									document.getElementById("SetDate").value = info.endDate;
									document.getElementById("LimitedTime").checked =
										info.limitedTime;
								}}
							>
								{info.name}
							</button>
						);
					})}
				</div>
				<div className="ImageManager" id="ImageManager">
					<label>Images</label>

					<div className="FileContainer" id="FileContainer">
						<input
							type="file"
							name="file"
							onChange={function (event) {
								ImageFiles.push(event.target.files[0]);
								SetImageFiles(ImageFiles);
								forceUpdate();
							}}
						/>
					</div>

					<div className="ImageBtnContainer">
						<button
							onClick={() => {
								let newimage = document.createElement("input");
								newimage.type = "file";
								newimage.name = "file";
								(newimage.onchange = function (event) {
									console.log(ImageFiles);
									ImageFiles.push(event.target.files[0]);
									SetImageFiles(ImageFiles);
									forceUpdate();
								}),
									document
										.getElementById("FileContainer")
										.appendChild(newimage);
							}}
						>
							Add Image
						</button>
						<button
							onClick={() => {
								UploadImage();
							}}
						>
							Upload
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreateItem;
