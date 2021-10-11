const cors = require("cors");


const allowPublicCORS = function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
};

const allowPrivateCORS = function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization" //to give access to all the headers provided
	);
	if (req.method === "OPTIONS") {
		res.header(
			"Access-Control-Allow-Methods",
			"PUT, POST, PATCH, DELETE, GET"
		); //to give access to all the methods provided
		return res.status(200).json({});
	}
	next(); //so that other routes can take over
};

module.exports = { allowPrivateCORS, allowPublicCORS };
