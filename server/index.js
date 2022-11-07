const express = require("express");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/api/CreateItem", (req, res) => {
  //insert item info into db and send response on sucess/failure
});

app.post("/api/GetItems", (req, res) => {
  //get all items with requirements
});

app.post("/api/OrderItem", (req, res) => {
  //get item id and other user info then add to orders table
});
