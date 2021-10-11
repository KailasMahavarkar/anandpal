const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
	_id: {
		type: Schema.ObjectId,
		auto: true,
	},
	order_name: {
		type: String,
		required: true,
	},
    paid_status: {
		type: String,
		required: false,
	},
    amount_paid: {
        type: Number,
        required: true
    },
    items_ordered: {
        type: Number,
        required: false
    },
    address: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("order", orderSchema);
