// importing models
const { typeMatch, isEmpty } = require("../../Improve/Improve");
const BlogModel = require("../../models/blog.model")

// importing logger
const { logger } = require("../../Improve/logger") 
const log = logger(__filename)

/*
    DE -> 0
    SE -> 0
    CE -> 0
*/

const blogRead = async (req, res, next) => {
	const { blogID } = req.body;

    if (!typeMatch(blogID)){
        return res.status(404).json({
            msg: 'BlogID cannot be empty',
        });
    }
    
	try {

		const readBlog = await BlogModel.findOne(
			{ _id: blogID },
		);

		if (isEmpty(readBlog)) {
            return res.status(400).json({
                msg: `Blog with ID ${blogID} does not exists`,
            });
		} 

    
        const dataObject = {
            '_id': readBlog._id,
            "status": readBlog._status,
            'create_ts': readBlog.create_ts,
            'title': readBlog.title,
            'author': readBlog.author,
            'data': readBlog.data
        }


        

        return res.status(200).json({
            msg: dataObject
        });

		
	} catch (error) {
        const [ERROR, STATUS, MESSAGE] = ['SE_AUTH_BLOG_READ_01', 500,  'BLOG Read Failed']

        log.error(ERROR, STATUS, 'dragon', MESSAGE)
		return res.status(STATUS).json({
			msg: "Server Error",
			error: "SE_BLOG_READ_ERROR"
		});
	}
};

module.exports = { blogRead };
