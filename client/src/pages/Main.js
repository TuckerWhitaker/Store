import "./Main.css";
import Item from "./components/Item";
import ItemPage from "./components/ItemPage";
import axios, { Axios } from "axios";

axios.post("http://localhost:3001/api/GetItems").then((response) => {
  console.log(response.data.length);
  for (let i = 0; i < response.data.length; i++) {
    //document.getElementById("Main");   append item to main after create
  }
});
// get relevant item list but for now just all items
// loop through those items and add them to the main page

function Main() {
  return (
    <div className="Parent">
      <div className="Main" id="Main">
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
      </div>
      <ItemPage />
    </div>
  );
}

export default Main;
