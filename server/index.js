const bodyParser = require("body-parser");
const cors = require("cors");
var http = require("http");
const express = require("express");
const app = express();
const port = 3001;
const multer = require("multer");
const fs = require("fs");
const dir = "./uploads";
const storage = multer.diskStorage({
	destination: "./uploads/",
	filename: function (req, file, cb) {
		cb(null, Date.now() + ".png");
	},
});

const upload = multer({ storage: storage });
const morgan = require("morgan");

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

server.listen(3001);
console.log("server running on port 3001");

app.post("/image", upload.single("file"), (req, res) => {
	if (!req.file) {
		console.log("No file received");
		return res.send({
			success: false,
		});
	} else {
		console.log("file received");
		return res.send({
			success: true,
		});
	}
});

app.post("/api/CreateItem", async (req, res) => {
	console.log("create item called");
	//insert item info into db and send response on sucess/failure

	MongoClient.connect(url, async function (err, db) {
		if (err) throw err;
		var dbo = db.db("store");
		var item = {
			//id: await dbo.collection("items").countDocuments(),
			id: Date.now(),
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			options: req.body.options,
			limitedTime: req.body.limitedTime,
			endDate: req.body.endDate,
		};

		console.log(item);
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
	});
});

app.post("/api/GetItem", async (req, res) => {
	MongoClient.connect(url, async function (err, db) {
		var dbo = db.db("store");
		const item = dbo.collection("items").findOne({ id: parseInt(req.body.id) });
		res.send(await item);
		console.log(await item);
	});
});
app.post("/api/ClearItems", async (req, res) => {
	MongoClient.connect(url, async function (err, db) {
		var dbo = db.db("store");
		const item = dbo.collection("items").deleteMany({});
		console.log("Cleared all items from db");
	});
});

app.post("/api/UpdateItem", async (req, res) => {
	MongoClient.connect(url, async function (err, db) {
		var dbo = db.db("store");
		dbo.collection("items").updateOne(
			{ id: parseInt(req.body.id) },
			{
				$set: {
					name: req.body.name,
					description: req.body.description,
					price: req.body.price,
					options: req.body.options,
					limitedTime: req.body.limitedTime,
					endDate: req.body.endDate,
				},
			}
		);
		res.send("success");
	});
});

app.post("/api/DeleteItem", async (req, res) => {
	MongoClient.connect(url, async function (err, db) {
		var dbo = db.db("store");
		dbo.collection("items").deleteOne({ id: parseInt(req.body.id) });
		res.send("success");
	});
});

app.post("/api/OrderItem", (req, res) => {
	//get item id and other user info then add to orders table
});
