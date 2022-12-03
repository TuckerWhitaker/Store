import "./App.css";
import Main from "./pages/Main.js";
import Navbar from "./pages/Navbar";
import AdminPage from "./pages/AdminPage";
import ItemPage from "./pages/components/ItemPage";
function App() {
	return (
		<div className="App">
			<link
				rel="stylesheet"
				href="https://fonts.googleapis.com/css?family=Abhaya Libre"
			/>
			<Navbar></Navbar>
			<Main></Main>
		</div>
	);
}

export default App;
