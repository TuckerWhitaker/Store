import "./AdminPage.css";
import React, { useState } from "react";

let CurrentOptionValues = [];
let CurrentOption;

function AdminPage() {
  const [OptionName, SetOptionName] = useState("");
  const [ValueName, SetValueName] = useState("");

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
      <div className="AdminInParent">
        <label className="AdminLabel">Name: </label>
        <input className="AdminInput"></input>
      </div>
      <div className="AdminInParent">
        <label className="AdminLabel">Description: </label>
        <textarea className="AdminInput" id="description"></textarea>
      </div>
      <div className="AdminInParent">
        <label className="AdminLabel">Price: </label>
        <input type="number" className="AdminInput"></input>
      </div>
      <div className="AdminInParent">
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
        >
          Add Option
        </button>
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
        >
          Add Value to Selected Option
        </button>
        <h5>CurrentOption Values:</h5>
        <div id="CurrentValues"></div>
      </div>
    </div>
  );
}

export default AdminPage;
