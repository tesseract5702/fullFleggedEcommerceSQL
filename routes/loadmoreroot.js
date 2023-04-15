const express = require("express");
const router = express.Router();
const loadmoreroot_controller = require("../controllers/loadmorerootController");

router.post("/",loadmoreroot_controller);

module.exports=router;