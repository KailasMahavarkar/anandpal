const express = require("express");
const router = express.Router();



// controllers
const productCreate = require("../controllers/Product/productCreate").productCreate;

router.route("/create").post(productCreate);



module.exports = router;
