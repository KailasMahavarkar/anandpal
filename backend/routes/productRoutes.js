const express = require("express");
const router = express.Router();


// controllers
const productCreate = require("../controllers/Product/productCreate").productCreate;
const productRead = require("../controllers/Product/productRead").productRead;
const productReadAll = require("../controllers/Product/productRead").productReadAll;
const productDelete = require("../controllers/Product/productDelete").productDelete;

router.route("/create").post(productCreate);
router.route("/read/:productID").get(productRead);
router.route("/read").get(productReadAll);
router.route("/delete").delete(productDelete);

module.exports = router;
