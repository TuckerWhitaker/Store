import "./Main.css";
import Item from "./components/Item";
import ItemPage from "./components/ItemPage";
import axios, { Axios } from "axios";
import ReactDOM from "react-dom/client";
import React, { Children } from "react";

const CreateItem = (ItemInfo) => {
  console.log(typeof (<Item></Item>));

  document
    .getElementById("Main")
    .appendChild(<Item ItemInfo={ItemInfo}></Item>);
};

axios.post("http://localhost:3001/api/GetItems").then((response) => {
  console.log(response.data);
  response.data.map((item) => {
    console.log(item);
    CreateItem(item);
  });
});
// get relevant item list but for now just all items
// loop through those items and add them to the main page

function Main() {
  return (
    <div className="Parent">
      <div className="Main" id="Main"></div>
      <ItemPage />
    </div>
  );
}

export default Main;
