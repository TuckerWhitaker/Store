import "./App.css";
import Main from "./pages/Main.js";
import Navbar from "./pages/Navbar";
import AdminPage from "./pages/AdminPage";
function App() {
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Abhaya Libre"
      />
      <Navbar></Navbar>
      <AdminPage></AdminPage>
    </div>
  );
}

export default App;
