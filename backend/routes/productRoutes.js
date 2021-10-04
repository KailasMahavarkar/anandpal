const express = require("express");
const router = express.Router();

const multer = require('multer');
const upload = multer({});


// controllers
const productCreate = require("../controllers/Product/productCreate").productCreate;
const productRead = require("../controllers/Product/productRead").productRead;
const productReadAll = require("../controllers/Product/productRead").productReadAll;
const productDelete = require("../controllers/Product/productDelete").productDelete;
const productUpload = require("../controllers/Product/productUpload").productUpload;
const _singleFileUpload = require("../middlewares/_singleFileUpload")._singleFileUpload;
const insertImage = require("../controllers/Blog/insertImage").insertImage;

router.route("/create").post(productCreate);
router.route("/read/:productID").get(productRead);
router.route("/read").get(productReadAll);
router.route("/delete").delete(productDelete);
router.route("/upload").post(upload.single('file'), _singleFileUpload, insertImage);

module.exports = router;
