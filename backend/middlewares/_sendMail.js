const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const { fakeID } = require("../improve/encryption");

/*
    CE:   0  
    SE:   0 
    DE:   0

    Error Codes in file:
    CE_AB_1 -> refresh token null or undefined
    DE_AB_1 -> refresh token not in DB
    SE_MAIN -> unknown fatal error
*/

// async..await is not allowed in global scope, must use a wrapper

const transporter = nodemailer.createTransport(
	smtpTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		auth: {
			user: "trailmusic1@gmail.com",
			pass: "299792458",
		},
	})
);

const mailOptions = {
	from: "trailmusic1@gmail.com",
	to: "trailmusic1@gmail.com",
	subject: `Secure transaction OTP`,
	text: `Secure transaction OTP for anandpal is ${fakeID(6)}`,
};

const _sendMail = async (req, res, next) => {
	try {
		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
                console.log(error)
				res.status(400).json({
					msg: "stmp error",
					success: false,
				});
			} else {
				res.status(200).json({
					msg: "mail sent",
					success: true,
				});
				console.log("Email sent: " + info.response);
			}
		});
	} catch (error) {
		return res.status(400).json({ msg: "Mail Sending Failed" });
	}
};

module.exports = { _sendMail };
