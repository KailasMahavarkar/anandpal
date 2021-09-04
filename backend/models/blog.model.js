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
	info: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
    tags: {
        type: String,
        required: false,
        default: 'active'
    },
    header_image_url: {
        type: String,
        required: true,
    },
	create_ts: {
		type: Number,
		required: false,
		default: Date.now(),
	},
});

module.exports = mongoose.model("blog", blogSchema);
