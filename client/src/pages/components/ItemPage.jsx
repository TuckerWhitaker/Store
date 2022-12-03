import "./ItemPage.css";
import Option from "./Option";
function ItemPage() {
	return (
		<div className="ItemPage">
			<div className="Iteminfo">
				<div className="ItemName">Name</div>
				<div className="ItemPrice">Price</div>
			</div>
			<img
				className="ItemPageImage"
				src="https://m.media-amazon.com/images/I/71BnqTCnBRL._AC_UX679_.jpg"
				alt="Italian Trulli"
			/>
			<div>
				<Option />
			</div>
		</div>
	);
}

export default ItemPage;
