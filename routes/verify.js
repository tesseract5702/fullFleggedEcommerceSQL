const express = require("express");
const router = express.Router();

const verify_controller = require("../controllers/verifyController");

router.get("/:token",verify_controller);

module.exports = router;