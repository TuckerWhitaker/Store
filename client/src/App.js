import "./App.css";
import AdminPage from "./pages/AdminPage";
import AdminOrder from "./pages/components/AdminOrder";
import CartPage from "./pages/components/CartPage";
import ContactPage from "./pages/components/ContactPage";
import CreateItem from "./pages/components/CreateItem";
import ItemPage from "./pages/components/ItemPage";
import Main from "./pages/Main.js";
import Navbar from "./pages/Navbar";

import {
	BrowserRouter as Router,
	Route,
	Routes,
	useParams,
} from "react-router-dom";

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
					<Route path="/Cart" element={<CartPage />} />
					<Route path="/Contact" element={<ContactPage />} />
					<Route path="/Admin" element={<AdminPage />} />
					<Route path="/Admin/CreateItem" element={<CreateItem />} />
					<Route path="/Admin/ManageOrders" element={<AdminOrder />} />
					<Route path="/item/:ItemId" element={<ItemPage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
