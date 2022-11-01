import "./App.css";
import Main from "./pages/Main.js";
import Navbar from "./pages/Navbar";

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
