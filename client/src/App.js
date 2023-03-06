import "./App.css";
import Main from "./pages/Main.js";
import Navbar from "./pages/Navbar";
import AdminPage from "./pages/AdminPage";
import CreateItem from "./pages/components/CreateItem";
import ItemPage from "./pages/components/ItemPage";
import CartPage from "./pages/components/CartPage";
import ContactPage from "./pages/components/ContactPage";
import AdminOrder from "./pages/components/AdminOrder";
import Categories from "./pages/components/Categories";

import {
	useParams,
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";

function App() {
	return (
		<div className="App">
			<link
				rel="stylesheet"
				href="https://fonts.googleapis.com/css?family=Abhaya Libre"
			/>

			<Navbar></Navbar>
			<Categories></Categories>
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
