import "./Categories.css";
import React, { useState } from "react";

function Categories() {
	const [SelectedCategory, SetSelectedCategory] = useState("CatBtn" + 0);

	return (
		<div className="Categories">
			<div
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
			</div>
			<div
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
			</div>
			<div
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
			</div>
			<div
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
			</div>
		</div>
	);
}

export default Categories;
