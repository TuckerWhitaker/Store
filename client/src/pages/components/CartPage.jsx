import "./CartPage.css";

function CartPage(props) {
	return (
		<div className="CartParent">
			<div className="ItemList">
				<div className="ItemListChild">
					<div className="ItemColumn">Image</div>
					<div className="ItemColumn">Name/desc</div>
					<div className="ItemColumn">Price</div>
				</div>
			</div>
			<div className="OrderInfo">
				<div>Total</div>
				<button className="OrderBtn">Proceed to Checkout</button>
			</div>
		</div>
	);
}

export default CartPage;
