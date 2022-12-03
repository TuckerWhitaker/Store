const bodyParser = require("body-parser");
const cors = require("cors");
var http = require("http");
const express = require("express");
const app = express();
const port = 3001;

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
	if (err) throw err;
	var dbo = db.db("store");

	/* dbo.collection("items").findOne({}, function (err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });*/
});

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
	console.log("create item called");
	//insert item info into db and send response on sucess/failure

	MongoClient.connect(url, function (err, db) {
		var item = {
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			options: req.body.options,
			optionNames: req.body.optionNames,
		};

		console.log(item);

		if (err) throw err;
		var dbo = db.db("store");
		dbo.collection("items").insertOne(item, function (err, result) {
			if (err) throw err;
			console.log("1 document inserted");
			res.send("success");
			db.close();
		});
	});
});

app.post("/api/GetItems", async (req, res) => {
	MongoClient.connect(url, async function (err, db) {
		var dbo = db.db("store");
		const items = dbo.collection("items").find();
		var itemlist = [];
		await items.forEach((element) => {
			itemlist.push(element);
		});
		res.send(itemlist);
		console.log(itemlist);
	});
});

app.get("/item/:name", (req, res) => {
	MongoClient.connect(url, async function (err, db) {
		var dbo = db.db("store");
		const item = dbo.collection("items").find({ name: req.params.name });
		res.send(item);
		console.log("got item");
	});
});

app.post("/api/OrderItem", (req, res) => {
	//get item id and other user info then add to orders table
});
