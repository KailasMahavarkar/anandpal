const cors = require("cors");
const dotenv = require("dotenv");
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


const rootPath = path.join(__dirname, "./Astatic");
// const cron = require("./cron");





// setting up cors config
app.use(
	cors({
		origin: ["http://localhost:4000", "http://localhost:3000"]
	})
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb", extended: true }));


// set a static folder
app.use(express.static(rootPath));
app.set("json spaces", 2);

// auth api handlers
app.use("/api",  publicHandlers);
app.use("/auth", authHandlers);
app.use("/blog", blogHandlers);
app.use("/product", productHandlers);
app.use("/generic", genericHandlers);
app.use("/order", orderHandlers);

// Assume 404 since no middleware responded
// app.use(function (req, res, next)  {
//     console.log('error (404)');
//     return res.status(404).json({
//         url: req.url,
//         error: 'Not found'
//     });
// });
  


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
