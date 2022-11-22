import "./Option.css";

function Option() {
	return (
		<div className="OptionParent" id="OptionParent">
			<div className="OptionTitle">Title</div>
			<div className="OptionContainer">
				<div tabindex="0" className="Option">
					<div>Name</div>
					<div>Price</div>
				</div>
			</div>
		</div>
	);
}

export default Option;
