const bodyParser = require("body-parser");
const cors = require("cors");
var http = require("http");
const express = require("express");
const app = express();
const port = 3001;
const multer = require("multer");
const dir = "./uploads";
const storage = multer.diskStorage({
	destination: "./uploads/",
	filename: function (req, file, cb) {
		cb(null, file.originalname + ".png");
		//cb(null, Date.now() + ".png");
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

app.post("/api/uploadImage", upload.single("file"), (req, res) => {
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

app.get("/api/getImage", (req, res) => {
	console.log(req.query);
	res.sendFile("F:/WebDev/Store/server/uploads/" + req.query.id + ".png");
});

app.post("/api/CreateItem", async (req, res) => {
	console.log("create item called");
	//insert item info into db and send response on sucess/failure

	MongoClient.connect(url, async function (err, db) {
		if (err) throw err;
		var dbo = db.db("store");

		var item = req.body;
		item.id = Date.now();

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

app.post("/api/GetItemsWithIds", async (req, res) => {
	MongoClient.connect(url, async function (err, db) {
		var dbo = db.db("store");

		const PromiseFunction = (ID) => {
			return new Promise(async (resolve, reject) => {
				var item = await dbo.collection("items").findOne({ id: parseInt(ID) });
				resolve(item);
			}).then((data) => {
				return data;
			});
		};
		let Promises = [];
		for (let i = 0; i < req.body.ids.length; i++) {
			Promises.push(PromiseFunction(req.body.ids[i]));
		}
		Promise.all(Promises).then((data) => {
			console.log(data);
			res.send(data);
		});
	});
});

app.post("/api/GetItemsWithCategory", async (req, res) => {
	MongoClient.connect(url, async function (err, db) {
		var dbo = db.db("store");
		const items = await dbo.collection("items").find({
			categories: req.body.Category,
		});

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
		console.log("Cleared all items from items collection");
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
					customText: req.body.customText,
					limitedTime: req.body.limitedTime,
					endDate: req.body.endDate,
					categories: req.body.categories,
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

/*
GetCategories
Loop through all the items and check categories and make a list of them and send that list to the client.







*/

async function CullCategories() {
	MongoClient.connect(url, async function (err, db) {
		var dbo = db.db("store");
		let categories = dbo.collection("categories").find();
		var catlist = [];
		await categories.forEach((element) => {
			catlist.push(element);
		});
		console.log("CATLIST:");
		console.log(catlist);

		//let uniqueChars = [...new Set(catlist)];
		//catlist = uniqueChars;

		const ItemCategories = dbo
			.collection("items")
			.find({}, { categories: 1, _id: 0 });

		var categorieslist = [];
		await ItemCategories.forEach((element) => {
			categorieslist.push(element);
		});
		console.log("Categories");
		console.log(categorieslist);
		for (let i = 0; i < catlist.length; i++) {
			let occurances = 0;
			for (let j = 0; j < categorieslist.length; j++) {
				console.log("P: ");
				console.log(categorieslist[j].categories.length);

				for (let k = 0; k < categorieslist[j].categories.length; k++) {
					console.log(
						catlist[i].cat + " :COMPARE: " + categorieslist[j].categories[k]
					);
					if (catlist[i].cat === categorieslist[j].categories[k]) {
						console.log("Occurances++");
						occurances++;
					}
				}
			}
			if (occurances < 1) {
				dbo.collection("categories").deleteOne({ cat: catlist[i].cat });

				console.log("category culled");
				console.log(catlist[i].cat);
			}
			console.log("OCC FINISHED");
		}
	});
}

app.post("/api/GetCategories", async (req, res) => {
	MongoClient.connect(url, async function (err, db) {
		var dbo = db.db("store");
		const categories = dbo.collection("categories").find();

		var catlist = [];
		await categories.forEach((element) => {
			catlist.push(element);
		});
		res.send(catlist);
		console.log(catlist);
	});
});

app.post("/api/AddCategory", async (req, res) => {
	MongoClient.connect(url, async function (err, db) {
		if (err) throw err;
		var dbo = db.db("store");

		var category = req.body;
		console.log("req.body");
		console.log(category);
		dbo.collection("categories").insertOne(category, function (err, result) {
			if (err) throw err;
			console.log("1 document inserted");
			CullCategories();
			res.send("success");
			db.close();
		});
	});
});

app.post("/api/OrderItem", (req, res) => {
	//get item id and other user info then add to orders table

	MongoClient.connect(url, async function (err, db) {
		if (err) throw err;
		var dbo = db.db("store");

		let OrderList = [];
		let orderid = Date.now();
		for (let i = 0; i < req.body.OrderArray.length; i++) {
			var order = {
				id: orderid + ":" + i,
				name: req.body.OrderArray[i].ItemName,
				price: req.body.OrderArray[i].ItemPrice,
				customTextArray: req.body.OrderArray[i].CustomTextArray,
				SelectedOptions: req.body.OrderArray[i].SelectedOptions,
			};
			OrderList.push(order);

			console.log(order);
		}
		dbo.collection("orders").insertMany(OrderList, function (err, result) {
			if (err) {
				res.send("fail");
				throw err;
			}
			console.log(OrderList.length + " documents inserted : orders");
			res.send("success");
		});
		//db.close();
	});
});

app.post("/api/DeleteOrders", async (req, res) => {
	MongoClient.connect(url, async function (err, db) {
		var dbo = db.db("store");
		dbo.collection("orders").deleteMany({});
		console.log("Cleared all items from orders collection");
	});
});

app.post("/api/GetOrders", async (req, res) => {
	MongoClient.connect(url, async function (err, db) {
		var dbo = db.db("store");
		const orders = dbo.collection("orders").find();
		var orderlist = [];
		await orders.forEach((element) => {
			orderlist.push(element);
		});
		res.send(orderlist);
	});
});
