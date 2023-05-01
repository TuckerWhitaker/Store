import {
	Route,
	BrowserRouter as Router,
	Routes,
	useParams,
} from "react-router-dom";
import "./App.css";
import Main from "./pages/Main.js";
import Navbar from "./pages/Navbar";
import AdminCreateItem from "./pages/components/AdminCreateItem";
import AdminOrder from "./pages/components/AdminOrder";
import AdminPage from "./pages/components/AdminPage";
import CartPage from "./pages/components/CartPage";
import Checkout from "./pages/components/Checkout";
import ContactPage from "./pages/components/ContactPage";
import ItemPage from "./pages/components/ItemPage";

function App() {
	return (
		<div className="App">
			<link
				rel="stylesheet"
				href="https://fonts.googleapis.com/css?family=Abhaya Libre"
			/>

			<Navbar></Navbar>

			<Router>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/Checkout" element={<Checkout />} />
					<Route path="/Cart" element={<CartPage />} />
					<Route path="/Contact" element={<ContactPage />} />
					<Route path="/Admin" element={<AdminPage />} />
					<Route path="/Admin/CreateItem" element={<AdminCreateItem />} />
					<Route path="/Admin/ManageOrders" element={<AdminOrder />} />
					<Route path="/item/:ItemId" element={<ItemPage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
