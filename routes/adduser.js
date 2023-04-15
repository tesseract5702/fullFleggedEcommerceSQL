const express = require("express");
const router = express.Router();
const adduser_controller = require("../controllers/adduserControllerOne");
const adduser_controller_two = require("../controllers/adduserControllerTwo");

router.route("/").post(adduser_controller).get(adduser_controller_two);

module.exports = router;