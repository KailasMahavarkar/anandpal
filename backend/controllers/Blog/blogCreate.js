const { typeMatch, isEmpty } = require("../../Improve/Improve");
const BlogModel = require("../../models/blog.model")


const blogCreate = async (req, res) => {
	let { title, data, author }  = req.body;

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


	const new_blog = new BlogModel({
        title: title,
        author: author,
        data: data,
    });

    const res_save = await new_blog.save();
	return res.status(200).json({
        msg: "new blog added",
        id: res_save._id
    });
};

module.exports = { blogCreate };
