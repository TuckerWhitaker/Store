import React, { useState } from "react";
import "./AdminCreateItemTest.css";
function AdminCreateItemTest() {
	//const [AdminDropDownStates, SetAdminDropDownStates] = useState([]);

	let AdminDropDownStates = [true, false, false, false, false, false];

	return (
		<div className="AdminCreateItemTest">
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
								"100px";
							AdminDropDownStates[0] = true;
						}
					}}
				>
					Name
				</button>
				<div className="AdminDropDownContent" id="AdminDropDownContent">
					content
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
								"100px";
							AdminDropDownStates[1] = true;
						}
					}}
				>
					Name
				</button>
				<div className="AdminDropDownContent" id="AdminDropDownContent1">
					content
				</div>
			</div>
		</div>
	);
}

export default AdminCreateItemTest;
