// importing models
const { typeMatch, isEmpty } = require("../../Improve/improve");
const OrderModel = require("../../models/order.model");

// importing logger
const { logger } = require("../../Improve/logger");
const log = logger(__filename);


const deleteOrder  = async (req, res, next) => {
	const orderID = req.body.orderID;

	if (!typeMatch(orderID)) {
		return res.status(404).json({
			msg: "order ID cannot be empty",
		});
	}

	try {
		const deletedorder = await OrderModel.deleteOne({ _id: orderID });

		if (deletedorder.deletedCount !== 1) {
			return res.status(400).json({
				msg: `order with ID ${orderID} does not exists`,
			});
		}

		return res.status(200).json({
			msg: `order with ID ${orderID} has been deleted`,
		});
	} catch (error) {
		const [ERROR, STATUS, MESSAGE] = [
			"SE_AUTH_order_DELETE_01",
			500,
			"order Delete Failed",
		];

		log.error(ERROR, STATUS, "dragon", MESSAGE);
		return res.status(STATUS).json({
			msg: "Server Error",
			error: "SE_order_DELETE_ERROR",
		});
	}
};

module.exports = { deleteOrder };
