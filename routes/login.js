const express = require("express");
const router = express.Router();

const login_controller = require("../controllers/loginControllerOne");
const login_controller_two = require("../controllers/loginControllerTwo");

router.route("/").post(login_controller).get(login_controller_two);

module.exports = router;