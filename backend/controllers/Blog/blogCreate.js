const { typeMatch, isEmpty } = require("../../Improve/Improve");
const BlogModel = require("../../models/blog.model")


const blogCreate = async (req, res) => {
	let { title, info, author } = req.body;

    return res.status(200).json({
        "success" : 1,
        "file": {
            "url" : req.singleImage.secure_url,
        }            
    })

    // title = 'kai'
    // info = 'kai is awesome'
    // author = 'kai' 

    // return res.send(req.singleImage.secure_url)

	// /* ---------------------  START NULL CHECK ------------------------------- */
	// if (isEmpty(title)) {
	// 	return res.status(400).json({
	// 		msg: `title should not be empty`,
	// 	});
	// }

	// if (isEmpty(info)) {
	// 	return res.status(400).json({
	// 		msg: `info should not be empty`,
	// 	});
	// }

	// if (isEmpty(author)) {
	// 	return res.status(400).json({
	// 		msg: `author should not be empty`,
	// 	});
	// }

	// /* ---------------------  END NULL CHECK ------------------------------- */



	// /* ---------------------  START TYPE CHECK ------------------------------- */
	// if (!typeMatch(title)) {
	// 	return res.status(400).json({
	// 		msg: `title should be alphanumeric sequence`,
	// 	});
	// }

	// if (!typeMatch(info)) {
	// 	return res.status(400).json({
	// 		msg: `info should be alphanumeric sequence`,
	// 	});
	// }

	// if (!typeMatch(author)) {
	// 	return res.status(400).json({
	// 		msg: `author should be alphanumeric sequence`,
	// 	});
	// }
	// /* ---------------------  END TYPE CHECK ------------------------------- */

	// const new_blog = new BlogModel({
    //     title: title,
    //     author: author,
    //     info: info,
    //     header_image_url: headerImageUrl
    // });
    // const res_save = await new_blog.save();



	// return res.send("new blog added to db");
};

module.exports = { blogCreate };
