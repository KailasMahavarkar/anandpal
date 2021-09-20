const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
	_id: {
		type: Schema.ObjectId,
		auto: true,
	},
	title: {
		type: String,
		requried: true,
	},
	data: {
		type: String,
		required: false,
	},
	author: {
		type: String,
		required: true,
	},
    status:{
        type: String,
        required: false,
        default: "unpublished"
    },
	create_ts: {
		type: Number,
		required: false,
		default: Date.now(),
	},
});

module.exports = mongoose.model("blog", blogSchema);
