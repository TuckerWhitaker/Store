import "./Option.css";
import React, { useEffect } from "react";

let OptionActive = false;

function Option() {
	useEffect(() => {
		OptionDropDown();
	}, []);

	return (
		<div className="OptionParent" id="OptionParent">
			Option
			<div className="DropDown" id="DropDown">
				<div className="Content" id="Content">
					this is a little paragraph placeholder
				</div>
			</div>
		</div>
	);
}

const OptionDropDown = () => {
	document.getElementById("OptionParent").addEventListener("click", () => {
		if (!OptionActive) {
			document.getElementById("DropDown").style.height = "500px";
			document.getElementById("DropDown").style.overflow = "visible";
			OptionActive = true;
		} else {
			document.getElementById("DropDown").style.height = "0px";
			document.getElementById("DropDown").style.overflow = "hidden";
			OptionActive = false;
		}
	});
};

export default Option;
