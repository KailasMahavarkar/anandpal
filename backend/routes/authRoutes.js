const express = require('express');
const router = express.Router();

// middlewares
const _nullCheckRegister = require("../middlewares/auth/_nullCheckRegister")._nullCheckRegister;
const _nullCheckLogin = require("../middlewares/auth/_nullCheckLogin")._nullCheckLogin;
const _apiKeyCheck = require("../middlewares/_apiKeyCheck")._apiKeyCheck;
const _authToken = require("../middlewares/_authToken")._authToken;

// controllers
const adminRegister = require("../controllers/Auth/adminRegister").adminRegister;
const adminLogin = require("../controllers/Auth/adminLogin").adminLogin;
const adminLogout = require("../controllers/Auth/adminLogout").adminLogout;
const adminDelete = require("../controllers/Auth/adminDelete").adminDelete;
const renewToken  = require("../controllers/Auth/auth").renewtoken;
const verifyAccess  = require("../controllers/Auth/verfiyAccess").verfiyAccess;

// routes
// router.route("/register").post(_nullCheckRegister,_apiKeyCheck, adminRegister);
router.route("/login").post(_nullCheckLogin, adminLogin);
router.route("/logout").post(adminLogout);
// router.route("/delete").delete(_apiKeyCheck, adminDelete);
router.route("/refresh").post(renewToken);
// router.route('/verify').post(_authToken, verifyAccess);




module.exports = router;