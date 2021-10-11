const express = require("express");
const router = express.Router();

const multer = require('multer');
const upload = multer({});

const uploadMiddleware = require("../controllers/Helpers/multer")
const _test2 = require("../controllers/Dev/test2").test2

// middlewares
const _authToken = require("../middlewares/_authToken")._authToken;
const _singleFileUpload = require("../middlewares/_singleFileUpload")._singleFileUpload;

// controllers
const blogCreate = require("../controllers/Blog/blogCreate").blogCreate;
const blogDelete = require("../controllers/Blog/blogDelete").blogDelete;


// read route for admin
const xblogRead = require("../controllers/Blog/xblogRead").xblogRead;

// upload route for admin
const insertImage = require("../controllers/Blog/insertImage").insertImage;

router.route("/create").post(blogCreate);
router.route("/delete").delete(blogDelete);

// admin route for reading blog --> for published and unpublished
router.route("/xread/:blogID").get(xblogRead);

// post route to upload image
router.route("/image").post(upload.single('image'), _singleFileUpload, insertImage);


module.exports = router;
