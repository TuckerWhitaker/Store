import "./Item.css";

function Item(props) {
	return (
		<div
			className="Item"
			onClick={() => {
				//document.getElementById("ItemPageParent").style.display = "flex";
				//document.getElementById("ItemPageName").innerHTML = props.ItemInfo.name;
				//document.getElementById("ItemPageDescription").innerHTML = props.ItemInfo.description;

				props.SetOptionList(props.ItemInfo.options);
			}}
		>
			<div id="itemprevname">{props.ItemInfo.name}</div>
			<div id="itemprevprice">${props.ItemInfo.price}</div>
			<img
				className="ItemImage"
				src="https://cdn.gardengrocer.com/attachments/photos/big/905.jpg?8318"
				alt="Italian Trulli"
			></img>
		</div>
	);
}

export default Item;
