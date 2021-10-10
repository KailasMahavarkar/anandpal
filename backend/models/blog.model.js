const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { randomHash } = require("../Improve/encryption");

const blogSchema = new Schema({
	_id: {
		type: String,
		requied: true
	},
	title: {
		type: String,
		requried: true,
	},
	data: {
		type: Object,
        default:  {
			time: Date.now(),
			blocks: [
				{
					id: randomHash(10, 2),
					type: "paragraph",
					data: {},
				},
			],
			version: "2.22.2",
		},
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
    published_status:{
        type: Boolean,
        required: true,
        default: false,
    },
	create_ts: {
		type: Number,
		required: false,
		default: Date.now(),
	},
});

module.exports = mongoose.model("blog", blogSchema);
