import "./Item.css";

function Item(props) {
	return (
		<div
			className="Item"
			onClick={() => {
				props.SetOptionList(props.ItemInfo.options);
				window.location.href =
					"http://localhost:3000/item/" + props.ItemInfo.id;
			}}
		>
			<img
				className="ItemImage"
				src="https://cdn.gardengrocer.com/attachments/photos/big/905.jpg?8318"
				alt="Italian Trulli"
			></img>
			<div id="itemprevname">{props.ItemInfo.name}</div>
			<div id="itemprevprice">${props.ItemInfo.price}</div>
		</div>
	);
}

export default Item;
