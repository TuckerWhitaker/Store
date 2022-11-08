const bodyParser = require("body-parser");
const cors = require("cors");
var http = require("http");
const express = require("express");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = http.createServer(app);

server.listen(3001);
console.log("server running on port 3001");

app.get("/", (req, res) => {
  res.send("hello world");
  console.log("hello world");
});

app.post("/test", (req, res) => {
  res.send("Test");
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
