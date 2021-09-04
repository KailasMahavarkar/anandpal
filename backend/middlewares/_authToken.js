const jwt = require('jsonwebtoken')
const { isEmpty } = require('../Improve/Improve')


const _authToken = async (req, res, next) => {
	const authHeader = req.headers["authorization"];

    // return on empty
    if (isEmpty(authHeader)){
        return res.status(401).json({
            msg: "Authentication token invalid or expired",
            error: "SE_AUTH_TOKEN_ERROR_1",
            errorfile: "CONTROL AUTHTOKEN"
        })
    }

    token = authHeader.split(' ')[1]
    if (isEmpty(token)){
        return res.status(401).json({
            msg: "Authentication token invalid or expired",
            error: "SE_AUTH_TOKEN_ERROR_2",
            errorfile: "CONTROL AUTHTOKEN"
        })
    }
    
    try{
        req.tokenData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        next()
    }catch(error){
        return res.status(401).json({
            msg: "Authentication token invalid or expired",
            error: "SE_AUTH_TOKEN_MAIN",
            errorfile: "CONTROL AUTHTOKEN"
        })
    }

};

module.exports = { _authToken }