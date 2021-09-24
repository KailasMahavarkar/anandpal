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
const blogUpdate = require("../controllers/Blog/blogUpdate").blogUpdate;
const blogRead = require("../controllers/Blog/blogRead").blogRead;
const blogReadAll = require("../controllers/Blog/blogRead").blogReadAll;

const xblogRead = require("../controllers/Blog/xblogRead").xblogRead;
const xblogReadAll = require("../controllers/Blog/xblogRead").xblogReadAll;


const insertImage = require("../controllers/Blog/insertImage").insertImage;

router.route("/create").post(blogCreate);
router.route("/delete").delete(blogDelete);
router.route("/update").patch(blogUpdate);

// public route for reading blog --> only published
router.route("/read/:blogID").get(blogRead);
router.route("/read").get(blogReadAll);

// admin route for reading blog --> for published and unpublished
router.route("/xread/:blogID").get(xblogRead);
router.route("/xread").get(xblogReadAll);


// post route to upload image
router.route("/image").post(upload.single('image'), _singleFileUpload, insertImage);


module.exports = router;
