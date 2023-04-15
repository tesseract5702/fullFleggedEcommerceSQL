const express = require("express");
const router = express.Router();
const root_controller = require("../controllers/rootController");
const loadmoreroot_controller = require("../controllers/loadmorerootController");

router.get("/",root_controller);
router.post("/loadmoreroot",loadmoreroot_controller);

module.exports = router;