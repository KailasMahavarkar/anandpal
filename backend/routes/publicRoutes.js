const express = require("express");
const router = express.Router();

// product public routes
const productRead = require("../controllers/Product/productRead").productRead;
const productReadAll = require("../controllers/Product/productRead").productReadAll;
router.route("/product/read/:productID").get(productRead);
router.route("/product/read").get(productReadAll);


// blog public routes 
// only published blogs are fetched
const { blogRead, blogReadAll } = require("../controllers/Blog/blogRead");
router.route("/blog/read/:blogID").get(blogRead);
router.route("/blog/read").get(blogReadAll);


// contact us post
const createContact = require("../controllers/Contact/createContact").createContact;
router.route("/contact/create").post(createContact);


module.exports = router;