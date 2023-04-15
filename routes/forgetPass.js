const express = require("express");
const router = express.Router();

const forgetPass_controller = require("../controllers/forgetPassController");

router.get("/",forgetPass_controller);

module.exports = router;