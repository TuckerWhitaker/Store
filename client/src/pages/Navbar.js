import "./Navbar.css";

function Navbar() {
	return (
		<div className="Navbar">
			
			<button
				className="NavBarButton"
				onClick={() => {
					window.location.href = "http://localhost:3000/";
				}}
			>
				Home
			</button>
			<button
				className="NavBarButton"
				onClick={() => {
					window.location.href = "http://localhost:3000/cart";
				}}
			>
				Cart
			</button>
		</div>
	);
}

export default Navbar;
