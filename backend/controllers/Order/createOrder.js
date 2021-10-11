const OrderModel = require("../../models/order.model");
const { typeMatch, isEmpty } = require("../../Improve/Improve");
const {randomHash} = require("../../Improve/encryption")
// with fields { id ,order_name,paid status,amount paid,items ordered(products ordered),address}

const createOrder = async (req, res, next) => {
	const { order_name, paid_status, amount_paid, items_ordered, address } = req.body;


	/* ---------------------  START NULL CHECK ------------------------------- */

	if (isEmpty(order_name)) {
		return res.status(400).json({
			msg: `order_name should not be empty`,
		});
	}

	if (isEmpty(paid_status)) {
		return res.status(400).json({
			msg: `paid status should not be empty`,
		});
	}

	if (isEmpty(amount_paid)) {
		return res.status(400).json({
			msg: `amount paid phone should not be empty`,
		});
	}

	if (isEmpty(items_ordered)) {
		return res.status(400).json({
			msg: `items ordered should not be empty`,
		});
	}

    if (isEmpty(address)) {
		return res.status(400).json({
			msg: `address should not be empty`,
		});
	}

	// /* ---------------------  END NULL CHECK ------------------------------- */

	// /* ---------------------  START TYPE CHECK ------------------------------- */

	if (!typeMatch(order_name)) {
		return res.status(400).json({
			msg: `order_name should be alphanumeric text`,
		});
	}

	if (!typeMatch(paid_status, 'boolean')) {
		return res.status(400).json({
			msg: `paid_status should be boolean`,
		});
	}

	if (!typeMatch(amount_paid, "number")) {
		return res.status(400).json({
			msg: `amount paid should be number only`,
		});
	}

	if (!typeMatch(items_ordered, "number")) {
		return res.status(400).json({
			msg: `items ordered should be number only`,
		});
	}

    if (!typeMatch(address)) {
		return res.status(400).json({
			msg: `address ordered should be text only`,
		});
	}

	// /* ---------------------  END TYPE CHECK ------------------------------- */

	const PAYLOAD = {order_name, paid_status, amount_paid, items_ordered, address};
	const newOrder = new OrderModel(PAYLOAD);
	try {
		const res_save = await newOrder.save();
		if (isEmpty(res_save._id)) {
			return res.status(400).json({
				msg: "unable to send message",
			});
		}

		return res.status(200).json({
            id: res_save.id,
			msg: "new order request created",
		});

	} catch (error) {
		return res.status(500).json({
			msg: "Server error | createOrder ",
		});
	}
};

module.exports = { createOrder };
