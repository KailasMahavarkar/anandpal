const OrderModel = require("../../models/order.model");

const getNextStatus = (status) => {
	if (status === "order created") {
		return "shipped by seller";
	} else if (status === "shipped by seller") {
		return "delivered to nearest hub";
	} else if (status === "delivered to nearest hub") {
		return "out of delivery";
	} else if (status === "out of delivery") {
		return "delivered to customer";
	} else if (status === "delivered to customer") {
		return "order created";
	}
};

const updateOrder = async (req, res, next) => {
	const { order_id } = req.body;

	try {
		const findResult = await OrderModel.findById({
			_id: order_id,
		});

		if (!isEmpty(findResult)) {
			try {
				const update = await OrderModel.updateOne(
					{ _id: order_id },
					{
						track: getNextStatus(findResult.track),
					}
				);

				if (!isEmpty(update)) {
					return res.status(200).json({
						success: "updated",
						msg: "order updated successfully",
					});
				}

				return res.status(400).json({
					success: "failed",
					msg: "order updated failed",
				});
			} catch (error) {
				return res.status(500).json({
					success: "failed",
					msg: "Could not update order status",
				});
			}
		} else {
			return res.status(404).json({
				success: "not found",
				msg: `Order with order id ${order_id} does not exists`,
			});
		}
	} catch (error) {
		return res.status(500).json({
			msg: "Server error | createOrder ",
			success: "error",
		});
	}
};

module.exports = { updateOrder };
