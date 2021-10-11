// importing models
const { typeMatch, isEmpty } = require("../../Improve/Improve");
const OrderModel = require("../../models/order.model");

// importing logger
const { logger } = require("../../Improve/logger");
const log = logger(__filename);

const readAllOrders = async (req, res, next) => {
	try {
		const orderData = await OrderModel.find({});

		if (isEmpty(orderData)) {
			return res.status(200).json({});
		} else {
			return res.status(200).json({"msg": orderData});
		}
	} catch (error) {
        console.log(error)
		const [ERROR, STATUS, MESSAGE] = [
			"SE_AUTH_BLOG_READ_ALL_FAILED",
			500,
			"ORDER Read Failed",
		];

		log.error(ERROR, STATUS, "dragon", MESSAGE);
		return res.status(STATUS).json({
			msg: "Server Error",
			error: "SE_ORDER_READ_ALL_FAILED",
		});
	}
};

module.exports = { readAllOrders };
