import "./App.css";
import Main from "./pages/Main.js";
import Navbar from "./pages/Navbar";
import AdminPage from "./pages/AdminPage";
import ItemPage from "./pages/components/ItemPage";
import CartPage from "./pages/components/CartPage";

function App() {
	return (
		<div className="App">
			<link
				rel="stylesheet"
				href="https://fonts.googleapis.com/css?family=Abhaya Libre"
			/>
			<Navbar></Navbar>
			<ItemPage></ItemPage>
		</div>
	);
}

export default App;
