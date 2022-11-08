import "./AdminPage.css";
import React, { useState } from "react";
import axios, { Axios } from "axios";
let CurrentOptionValues = [];
let CurrentOption;

function AdminPage() {
  const [OptionName, SetOptionName] = useState("");
  const [ValueName, SetValueName] = useState("");
  const [ItemName, SetItemName] = useState("");
  const [ItemDescription, SetDescription] = useState("");
  const [Price, SetPrice] = useState();

  const SetValueList = (OptionID) => {
    OptionID = OptionID.id;
    let parent = document.getElementById("CurrentValues");
    if (parent.childElementCount > 0) {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    }
    if (CurrentOptionValues[OptionID] != undefined) {
      for (let i = 0; i < CurrentOptionValues[OptionID].length; i++) {
        let v = document.createElement("div");
        v.innerHTML = CurrentOptionValues[OptionID][i];
        v.className = "AdminOption";
        document.getElementById("CurrentValues").appendChild(v);
      }
    }
  };

  const AddToValueList = (OptionID) => {
    OptionID = OptionID.id;
    console.log(CurrentOptionValues);
    CurrentOptionValues[OptionID].push(ValueName);
    let v = document.createElement("div");
    v.innerHTML = ValueName;
    v.className = "AdminOption";
    document.getElementById("CurrentValues").appendChild(v);
  };

  const AddOption = () => {
    console.log(CurrentOptionValues);
    var option = document.createElement("button");
    option.className = "AdminOption";
    option.innerHTML = OptionName;
    option.id = document.getElementById(
      "AdminOptionContainer"
    ).childElementCount;
    option.addEventListener("click", () => {
      if (CurrentOption != undefined) {
        CurrentOption.style.backgroundColor = "rgb(200, 200, 200)";
      }
      option.style.backgroundColor = "#FBFBFB";
      CurrentOption = option;

      SetValueList(CurrentOption);
      console.log(option.id);
    });
    CurrentOptionValues.push([]);
    document.getElementById("AdminOptionContainer").appendChild(option);
  };

  return (
    <div className="AdminPage">
      <div className="AdminColumn">
        <div className="AdminInParent">
          <label className="AdminLabel">Name: </label>
          <input
            className="AdminInput"
            onChange={(e) => {
              SetItemName(e.target.value);
            }}
          ></input>
        </div>
        <div className="AdminInParent">
          <label className="AdminLabel">Description: </label>
          <textarea
            className="AdminInput"
            id="description"
            onChange={(e) => {
              SetDescription(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="AdminInParent">
          <label className="AdminLabel">Price: </label>
          <input
            type="number"
            className="AdminInput"
            onChange={(e) => {
              SetPrice(e.target.value);
            }}
          ></input>
        </div>
        <button
          className="AdminBtn"
          onClick={() => {
            axios.post("http://localhost:3001/test").then((response) => {
              alert(response.data);
            });
          }}
        >
          Create Item
        </button>
      </div>
      <div className="AdminColumn">
        <div className="AdminOptionContainer" id="AdminOptionContainer"></div>
        <input
          className="AdminInput"
          onChange={(e) => {
            SetOptionName(e.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            AddOption();
          }}
          className="AdminBtn"
        >
          Add Option
        </button>
        <div className="AdminValueContainer" id="CurrentValues"></div>
        <input
          className="AdminInput"
          onChange={(e) => {
            SetValueName(e.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            AddToValueList(CurrentOption);
          }}
          className="AdminBtn"
        >
          Add Value to Selected Option
        </button>
      </div>
    </div>
  );
}

export default AdminPage;
