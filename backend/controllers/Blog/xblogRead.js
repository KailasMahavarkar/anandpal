// importing models
const { typeMatch, isEmpty } = require("../../Improve/Improve");
const BlogModel = require("../../models/blog.model");

// importing logger
const { logger } = require("../../Improve/logger");
const log = logger(__filename);

/*
    DE -> 0
    SE -> 0
    CE -> 0
*/

const xblogRead = async (req, res, next) => {
	const blogID = req.params.blogID;

	if (isEmpty(blogID)) {
		return res.status(404).json({
			msg: "blogID cannot be empty",
		});
	}

	try {
		const readBlog = await BlogModel.findOne({ _id: blogID });

		if (isEmpty(readBlog)) {
			return res.status(400).json({
				msg: `Blog with blogID ${blogID} does not exists`,
			});
		}

		const dataObject = {
			_id: readBlog._id,
			title: readBlog.title,
			status: readBlog.status,
			author: readBlog.author,
			data: readBlog.data,
			create_ts: readBlog.create_ts,
		};

		return res.status(200).json({
			msg: dataObject,
		});
	} catch (error) {
		const [ERROR, STATUS, MESSAGE] = [
			"SE_AUTH_BLOG_READ_01",
			500,
			"BLOG Read Failed",
		];

		log.error(ERROR, STATUS, "dragon", MESSAGE);
		return res.status(STATUS).json({
			msg: "Server Error",
			error: "SE_BLOG_READ_ERROR",
		});
	}
};


const xblogReadAll = async (req, res, next) => {

    try{
        const blogData = await BlogModel.find();

        if (isEmpty(blogData)){
            return res.status(200).json({})
        }else{
            return res.status(200).json(blogData);
        }
    }catch (error) {
		const [ERROR, STATUS, MESSAGE] = [
			"SE_AUTH_BLOG_READ_ALL_FAILED",
			500,
			"BLOG Read Failed",
		];

		log.error(ERROR, STATUS, "dragon", MESSAGE);
		return res.status(STATUS).json({
			msg: "Server Error",
			error: "SE_BLOG_READ_ALL_FAILED",
		});
	}
}

module.exports = { xblogRead, xblogReadAll};
