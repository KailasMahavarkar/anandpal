const OrderModel = require("../../models/order.model");
const { typeMatch, isEmpty } = require("../../Improve/improve");
const { randomHash } = require("../../Improve/encryption");
// with fields { id ,order_name,paid status,amount paid,items ordered(products ordered),address}

const createOrder = async (req, res, next) => {
	const { order_name, phone_number, amount_paid, items_ordered, address, paid_status } = req.body;

	// /* ---------------------  END TYPE CHECK ------------------------------- */

	const PAYLOAD = {
		order_name,
		phone_number,
		amount_paid,
		items_ordered,
		address,
        paid_status
	};

	const newOrder = new OrderModel(PAYLOAD);
	try {
		const res_save = await newOrder.save();
		if (isEmpty(res_save._id)) {
			return res.status(400).json({
				msg: "unable to send message",
			});
		}

		return res.status(200).json({
			order_id: res_save.id,
            amount: res_save.amount_paid,
			msg: "new order request created",
		});
	} catch (error) {
        console.log(error);
		return res.status(500).json({
			msg: "Server error | createOrder ",
		});
	}
};

module.exports = { createOrder };
