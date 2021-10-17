// importing models
const { typeMatch, isEmpty } = require("../../Improve/Improve");
const BlogModel = require("../../models/blog.model");

// importing logger
const { logger } = require("../../Improve/logger");
const log = logger(__filename);


const blogRead = async (req, res, next) => {
	const blogID = req.params.blogID;


	if (isEmpty(blogID)) {
		return res.status(404).json({
			msg: "blogID cannot be empty",
		});
	}

	try {
		const readBlog = await BlogModel.findOne(
            { _id: blogID }
        );


		if (isEmpty(readBlog)) {
			return res.status(400).json({
				msg: `Blog with blogID ${blogID} does not exists`,
			});
		}

        
        if (!readBlog.published_status) {
			return res.status(400).json({
				msg: `Blog with blogID ${blogID} is unpublished`,
			});
		}

		const dataObject = {
			_id: readBlog._id,
			title: readBlog.title,
			author: readBlog.author,
			published_status: readBlog.published_status,
			create_ts: readBlog.create_ts,
			data: readBlog.data,
            header_image: readBlog.header_image,
            category: readBlog.category,
            create_ts: readBlog.create_ts,
            published_time: readBlog.published_time,
            short_info: readBlog.short_info
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


const blogReadAll = async (req, res, next) => {

    try{
        const blogData = await BlogModel.find({}, {
            _id: true, title: true,
            published_status: true,
            create_ts: true
        });


        if (isEmpty(blogData)){
            return res.status(200).json({});
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

module.exports = { blogRead, blogReadAll };
