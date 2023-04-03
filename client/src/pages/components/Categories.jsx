import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Categories.css";

function Categories(props) {
	const [SelectedCategory, SetSelectedCategory] = useState("CatBtn" + 0);
	const [CategoriesList, SetCategoriesList] = useState([
		"category",
		"category",
	]);
	//Categories List map
	useEffect(() => {
		axios.post("http://localhost:3001/api/GetCategories").then((response) => {
			console.log(response.data);
			SetCategoriesList(response.data);
		}, []);
		console.log("P");
	}, []);

	return (
		<div className="Categories">
			{CategoriesList.map((info, index) => {
				return (
					<button
						className="CatBtn"
						key={"CatBtn" + index}
						id={"CatBtn" + index}
						onClick={() => {
							document.getElementById(SelectedCategory).style.textDecoration =
								"none";
							document.getElementById("CatBtn" + index).style.textDecoration =
								"underline";
							SetSelectedCategory("CatBtn" + index);

							props.refreshpage(info.cat);
						}}
					>
						{info.cat}
					</button>
				);
			})}
		</div>
	);
}

export default Categories;
