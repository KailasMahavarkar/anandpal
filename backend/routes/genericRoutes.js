const express = require('express');
const router = express.Router();


// create notification
const createNotification = require("../controllers/Notify/createNotification").createNotification;
const deleteNotification = require("../controllers/Notify/deleteNotification").deleteNotification;
const readAllNotification = require("../controllers/Notify/readAllNotification").readAllNotification;
const _authToken = require("../middlewares/_authToken")._authToken;

// public route for reading blog --> only published
router.route("/notify/create").post(createNotification);
router.route("/notify/delete").delete(deleteNotification);
router.route("/notify/read").get(readAllNotification);

module.exports = router;
