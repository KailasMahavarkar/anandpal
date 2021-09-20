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
// router.route("/create").post(upload.single('image'), _singleFileUpload, blogCreate);


router.route("/create").post(blogCreate);
router.route("/delete").delete(blogDelete);
router.route("/update").patch(blogUpdate);
router.route("/read").get(blogRead);


module.exports = router;
