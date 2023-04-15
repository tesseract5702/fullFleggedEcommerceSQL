const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth")

const logout_controller = require("../controllers/logoutController");

router.get("/",checkAuth,logout_controller);

module.exports = router;