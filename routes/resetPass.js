const express = require("express");
const router = express.Router();

const resetPass_controller = require("../controllers/resetPassController");

router.get("/",resetPass_controller);

module.exports = router;