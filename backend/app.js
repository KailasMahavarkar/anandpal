const cors = require("cors");
const dotenv = require("dotenv");

const { allowPublicCORS, allowPrivateCORS } = require("./improve/helper");
dotenv.config();

const express = require("express");
const app = express();
const path = require("path");
const mongo = require("./middlewares/_connect");

const authHandlers = require("./routes/authRoutes");
const blogHandlers = require("./routes/blogRoutes");
const productHandlers = require("./routes/productRoutes");
const genericHandlers = require("./routes/genericRoutes");
const orderHandlers = require("./routes/orderRoutes");
const publicHandlers = require("./routes/publicRoutes");
const uploadHandlers = require("./routes/uploadRoutes");
const { _authToken } = require("./middlewares/_authToken");

const rootPath = path.join(__dirname, "./Astatic");
// const cron = require("./cron");

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb", extended: true }));

// set a static folder
app.use(express.static(rootPath));
app.set("json spaces", 2);

// public api routes
app.use("/api", cors(allowPublicCORS), publicHandlers);

// private api routes
app.use("/auth", cors(allowPrivateCORS), authHandlers);
app.use("/blog", cors(allowPrivateCORS), _authToken, blogHandlers);
app.use("/product", cors(allowPrivateCORS), _authToken, productHandlers);
app.use("/generic", cors(allowPrivateCORS), _authToken, genericHandlers);
app.use("/order", cors(allowPrivateCORS), _authToken, orderHandlers);
app.use("/upload", cors(allowPublicCORS), uploadHandlers);

// Assume 404 since no middleware responded
app.use(function (req, res, next) {
	console.log("error (404)");
	return res.status(404).json({
		url: req.url,
		error: "Not found",
	});
});

// run cron
// cron.runCrons();

app.listen(1000, (err) => {
	if (err) {
		console.log("could not connect to node");
	} else {
		console.log("connected to NodeJS");

		mongo.connect();
	}
});
