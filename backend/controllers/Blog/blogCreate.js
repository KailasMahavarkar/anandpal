const { typeMatch, isEmpty } = require("../../Improve/Improve");
const BlogModel = require("../../models/blog.model")

const blogCreate = async (req, res, next) => {
	let { title, data, author, id, status }  = req.body;


	/* ---------------------  START NULL CHECK ------------------------------- */


	if (isEmpty(title)) {
		return res.status(400).json({
			msg: `title should not be empty`,
		});
	}

    if (isEmpty(id)) {
		return res.status(400).json({
			msg: `id should not be empty`,
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

    if (typeof status !== 'boolean') {
		return res.status(400).json({
			msg: `status can only be published or unpublished`,
		});
	}


	// /* ---------------------  END NULL CHECK ------------------------------- */



	// /* ---------------------  START TYPE CHECK ------------------------------- */
	if (!typeMatch(title)) {
		return res.status(400).json({
			msg: `title should be alphanumeric sequence`,
		});
	}

    if (!typeMatch(id)) {
		return res.status(400).json({
			msg: `id should be alphanumeric sequence`,
		});
	}

    if (!typeMatch(author)) {
		return res.status(400).json({
			msg: `author should be alphanumeric sequence`,
		});
	}

    if (!typeMatch(data, 'object')) {
		return res.status(400).json({
			msg: `data should an editorjs object block`,
		});
	}

	// /* ---------------------  END TYPE CHECK ------------------------------- */

    const findRes = await BlogModel.findById({_id: id})

    if (isEmpty(findRes)){
        const new_blog = new BlogModel({
            _id: id,
            title: title,
            author: author,
            data: data,
            status: status
        });
        const res_save = await new_blog.save();
        return res.status(200).json({
            id: res_save._id,
            title: title,
            msg: "new blog added",
            author: author,
            data: data,
            status: status
        });
    }else{
        
    try {

        const findBlog = await BlogModel.findById(
			{ _id: id }
		);

        
        if (isEmpty(findBlog)) {
            return res.status(400).json({
                msg: `Blog with ID ${id} does not exists`,
            });
        }

		const updatedBlog = await BlogModel.updateOne(
			{ _id: id },
			{   
                title: title,
                data: data,
                author: author,
                status: status
            },
		);



		if (updatedBlog.nModified !== 1) {
            return res.status(400).json({
                id: id,
                msg: `Blog with ID ${id} was already updated`,
                title: title,
                author: author,
                data: data,
                status: status
            });
		} 

        return res.status(200).json({
            id: id,
            msg: `Blog with ID ${id} was updated`,
            title: title,
            author: author,
            data: data,
            status: status
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
    }

	

    
};

module.exports = { blogCreate };
