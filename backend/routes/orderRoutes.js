const express = require('express');
const router = express.Router();

// create notification
const createOrder = require("../controllers/Order/createOrder").createOrder;
const readAllOrders = require("../controllers/Order/readAllOrders").readAllOrders;
const deleteOrder = require("../controllers/Order/deleteOrder").deleteOrder;

// public route for reading blog --> only published
router.route("/create").post(createOrder);
router.route("/readall").get(readAllOrders);
router.route("/delete").delete(deleteOrder);


module.exports = router;
