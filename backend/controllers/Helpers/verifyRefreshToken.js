const { isEmpty } = require("../../Improve/Improve");

const verifyRefreshToken = async (token) => {
	try {
		const result = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        if (isEmpty(result)){
            return true
        }
		return false;
	} catch {
		return false;
	}
};

module.exports = { verifyRefreshToken };
