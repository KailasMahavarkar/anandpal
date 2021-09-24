const { typeMatch, isEmpty } = require("../../Improve/Improve");
const BlogModel = require("../../models/blog.model")

// importing logger
const { logger } = require("../../Improve/logger") 
const log = logger(__filename)


const blogUpdate = async (req, res) => {
	let { id, title, data, author }  = req.body;

    // return res.status(200).json({
    //     "success" : 1,
    //     "file": {
    //         "url" : req.singleImage.secure_url,
    //     }            
    // })

    // return res.send(req.singleImage.secure_url)

	/* ---------------------  START NULL CHECK ------------------------------- */
	if (isEmpty(title)) {
		return res.status(400).json({
			msg: `title should not be empty`,
		});
	}

    if (isEmpty(id) ) {
		return res.status(400).json({
			msg: `id should not be empty`,
		});
	}
    if (id.length != 24){
        return res.status(400).json({
			msg: `id should be of 24 length`,
		});
    }


	if (isEmpty(data)) {
		return res.status(400).json({
			msg: `data should not be empty`,
		});
	}

    if (isEmpty(author)) {
		return res.status(400).json({
			msg: `author should not be empty`,
		});
	}

	// /* ---------------------  END NULL CHECK ------------------------------- */



	// /* ---------------------  START TYPE CHECK ------------------------------- */
	if (!typeMatch(title)) {
		return res.status(400).json({
			msg: `title should be alphanumeric sequence`,
		});
	}

	// /* ---------------------  END TYPE CHECK ------------------------------- */


    try {

		const updatedBlog = await BlogModel.updateOne(
			{ _id: id },
			{   
                title: title,
                data: data,
                author: author
            },
		);

        if (updatedBlog.n === 0) {
            return res.status(400).json({
                msg: `Blog with ID ${id} does not exists`,
            });
        } 


		if (updatedBlog.nModified !== 1) {
            return res.status(400).json({
                msg: `Blog with ID ${id} was already updated`,
            });
		} 

        return res.status(200).json({
            msg: `Blog with ID ${id} was updated`,
        });

		
	} catch (error) {
        const [ERROR, STATUS, MESSAGE] = ['SE_BLOG_UPDATE_ERROR', 500,  'BLOG Update Failed']

        console.log(error);
        log.error(ERROR, STATUS, 'dragon', MESSAGE)
		return res.status(STATUS).json({
			msg: "Server Error",
			error: "SE_BLOG_UPDATE_ERROR"
		});
	}

};

module.exports = { blogUpdate };
