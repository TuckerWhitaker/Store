import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AdminCreateItemTest.css";
function AdminCreateItemTest() {
	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);

	function delay(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	let AdminDropDownStates = [true, true, true, true, true, true];

	const [ImageFiles, SetImageFiles] = useState([]);
	const [ItemList, SetItemList] = useState([]);
	const [selectedItem, SetSelectedItem] = useState({
		customText: [],
		description: "w",
		endDate: "",
		id: null,
		imageNames: [],
		limitedTime: "",
		name: "",
		options: [],
		price: 0,
		categories: [],
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

	const ClearItems = () => {
		axios.post("http://localhost:3001/api/ClearItems");
	};

	async function CreateNewItem() {
		let ImageNames = [];
		for (let i = 0; i < ImageFiles.length; i++) {
			await delay(1);
			let ImageName = Date.now();
			ImageNames.push(ImageName);
			let data = new FormData();
			data.append("file", ImageFiles[i], ImageName);

			axios
				.post("http://localhost:3001/api/uploadImage", data, {
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

		axios
			.post("http://localhost:3001/api/CreateItem", {
				name: selectedItem.name,
				price: selectedItem.price,
				options: selectedItem.options,
				customText: selectedItem.customText,
				imageNames: ImageNames,
				limitedTime: selectedItem.limitedTime,
				endDate: selectedItem.endDate,
				categories: selectedItem.categories,
			})
			.then(() => {
				window.location.reload();
			});
	}

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
						<div>ID: {selectedItem.id}</div>
						Name:
						<input
							value={selectedItem.name}
							onChange={(e) => {
								selectedItem.name = e.target.value;
								SetSelectedItem(selectedItem);
								forceUpdate();
							}}
						></input>
						<br />
						Price:
						<input
							value={selectedItem.price}
							onChange={(e) => {
								selectedItem.price = e.target.value;
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
										<button
											className="AdminCreateItemAddBtn"
											onClick={() => {
												selectedItem.options[index].push("");
												SetSelectedItem(selectedItem);
												forceUpdate();
											}}
										>
											Add Value
										</button>
									</div>
								</div>
							);
						})}
						<button
							className="AdminCreateItemAddBtnOption"
							onClick={() => {
								selectedItem.options.push([""]);
								SetSelectedItem(selectedItem);
								forceUpdate();
							}}
						>
							Add Option
						</button>

						{selectedItem.customText.map((info, index) => {
							return (
								<input
									key={"CTN" + index}
									type="text"
									placeholder="Custom Text Name"
									value={info}
									onChange={(e) => {
										selectedItem.customText[index] = e.target.value;
										SetSelectedItem(selectedItem);
										forceUpdate();
									}}
								></input>
							);
						})}
						<button
							className="AdminCreateItemAddBtnOption"
							onClick={() => {
								selectedItem.customText.push([""]);
								SetSelectedItem(selectedItem);
								forceUpdate();
							}}
						>
							Add Custom Text Input
						</button>
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
						End Date:
						<input
							type="date"
							value={selectedItem.endDate}
							onChange={(e) => {
								selectedItem.endDate = e.target.value;
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
							if (AdminDropDownStates[3] === true) {
								document.getElementById("AdminDropDownContent3").style.height =
									"0px";
								AdminDropDownStates[3] = false;
							} else if (AdminDropDownStates[3] === false) {
								document.getElementById("AdminDropDownContent3").style.height =
									"fit-content";
								AdminDropDownStates[3] = true;
							}
						}}
					>
						Images
					</button>
					<div className="AdminDropDownContent" id="AdminDropDownContent3">
						{selectedItem.imageNames.map((info, index) => {
							return (
								<div key={index} className="AdminItemImageParent">
									<img
										id={"AdminItemImage" + index}
										className="AdminItemImage"
										src={"http://localhost:3001/api/getImage?id=" + info}
									></img>
									<button
										className="AdminItemImageDelete"
										onClick={() => {
											selectedItem.imageNames.splice(index, 1);
											SetSelectedItem(selectedItem);
											forceUpdate();
										}}
									>
										X
									</button>

									<input
										name="file"
										type="file"
										className="AdminItemImageBtn"
										onChange={(event) => {
											if (event.target.files && event.target.files[0]) {
												let reader = new FileReader();
												reader.onload = (e) => {
													document.getElementById(
														"AdminItemImage" + index
													).src = e.target.result;
												};
												reader.readAsDataURL(event.target.files[0]);
											}

											selectedItem.imageNames[index] = event.target.files[0];
											ImageFiles[index] = event.target.files[0];
											SetImageFiles(ImageFiles);
											SetSelectedItem(selectedItem);
											forceUpdate();
										}}
									></input>
								</div>
							);
						})}
						<button
							className="AdminCreateItemAddBtn"
							onClick={() => {
								selectedItem.imageNames.push("");
								SetSelectedItem(selectedItem);
								forceUpdate();
							}}
						>
							Add Image
						</button>
					</div>
				</div>
				<div className="AdminDropDown">
					<button
						className="AdminDropDownHeader"
						onClick={() => {
							if (AdminDropDownStates[4] === true) {
								document.getElementById("AdminDropDownContent4").style.height =
									"0px";
								AdminDropDownStates[4] = false;
							} else if (AdminDropDownStates[4] === false) {
								document.getElementById("AdminDropDownContent4").style.height =
									"fit-content";
								AdminDropDownStates[4] = true;
							}
						}}
					>
						Categories
					</button>

					<div className="AdminDropDownContent" id="AdminDropDownContent4">
						{selectedItem.categories.map((category, index) => {
							return (
								<input
									key={"Category" + index}
									value={category}
									onChange={(e) => {
										selectedItem.categories[index] = e.target.value;
										SetSelectedItem(selectedItem);
										forceUpdate();
									}}
								></input>
							);
						})}

						<button
							className="AdminCreateItemAddBtn"
							onClick={() => {
								selectedItem.categories.push("");
								SetSelectedItem(selectedItem);
								forceUpdate();
							}}
						>
							Add Category
						</button>
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

				<div className="AdminCreateItemButtonPanel">
					<button
						onClick={() => {
							CreateNewItem();
						}}
					>
						Create Item
					</button>
					<button
						onClick={() => {
							let ImageNames = [];
							for (let i = 0; i < ImageFiles.length; i++) {
								//might need a delay here
								let ImageName = Date.now();
								ImageNames.push(ImageName);
								let data = new FormData();
								data.append("file", ImageFiles[i], ImageName);

								axios
									.post("http://localhost:3001/api/uploadImage", data, {
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

							axios
								.post("http://localhost:3001/api/UpdateItem", selectedItem)
								.then(() => {
									window.location.reload();
								});
						}}
					>
						Update Item
					</button>
					<button
						onClick={() => {
							axios
								.post("http://localhost:3001/api/DeleteItem", {
									id: selectedItem.id,
								})
								.then(() => {
									window.location.reload();
								});
						}}
					>
						Delete Selected Item
					</button>
					<button
						onClick={() => {
							ClearItems();
						}}
					>
						Delete All Items
					</button>
				</div>
			</div>
		</div>
	);
}

export default AdminCreateItemTest;
