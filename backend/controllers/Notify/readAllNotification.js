// importing models
const { typeMatch, isEmpty } = require("../../Improve/Improve");
const NotificationModel = require("../../models/notification.model");

// importing logger
const { logger } = require("../../Improve/logger");
const log = logger(__filename);


const readAllNotification  = async (req, res, next) => {

	try {
		const result = await NotificationModel.find({});
		return res.status(200).json({
			msg: result
		});
	} catch (error) {
		const [ERROR, STATUS, MESSAGE] = [
			"SE_AUTH_NOTIFICATION_DELETE_01",
			500,
			"NOTIFICATION Delete Failed",
		];

		log.error(ERROR, STATUS, "dragon", MESSAGE);
		return res.status(STATUS).json({
			msg: "Server Error",
			error: "SE_NOTIFICATION_DELETE_ERROR",
		});
	}
};

module.exports = { readAllNotification };
