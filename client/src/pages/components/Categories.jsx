import React, { useState } from "react";
import "./Categories.css";

function Categories() {
	const [SelectedCategory, SetSelectedCategory] = useState("CatBtn" + 0);
	const [CategoriesList, SetCategoriesList] = useState();

	//Categories List map

	return (
		<div className="Categories">
			<button
				className="CatBtn"
				id={"CatBtn" + 0}
				onClick={() => {
					document.getElementById(SelectedCategory).style.textDecoration =
						"none";
					document.getElementById("CatBtn" + 0).style.textDecoration =
						"underline";
					SetSelectedCategory("CatBtn" + 0);
				}}
			>
				Category
			</button>
			<button
				className="CatBtn"
				id={"CatBtn" + 1}
				onClick={() => {
					document.getElementById(SelectedCategory).style.textDecoration =
						"none";
					document.getElementById("CatBtn" + 1).style.textDecoration =
						"underline";
					SetSelectedCategory("CatBtn" + 1);
				}}
			>
				Category
			</button>
			<button
				className="CatBtn"
				id={"CatBtn" + 2}
				onClick={() => {
					document.getElementById(SelectedCategory).style.textDecoration =
						"none";
					document.getElementById("CatBtn" + 2).style.textDecoration =
						"underline";
					SetSelectedCategory("CatBtn" + 2);
				}}
			>
				Category
			</button>
			<button
				className="CatBtn"
				id={"CatBtn" + 3}
				onClick={() => {
					document.getElementById(SelectedCategory).style.textDecoration =
						"none";
					document.getElementById("CatBtn" + 3).style.textDecoration =
						"underline";
					SetSelectedCategory("CatBtn" + 3);
				}}
			>
				Category
			</button>
		</div>
	);
}

export default Categories;
