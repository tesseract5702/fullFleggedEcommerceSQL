const express = require("express");
const router = express.Router();

const forgetSubmit_controller = require("../controllers/forgetSubmitController");

router.post("/",forgetSubmit_controller);

module.exports = router;