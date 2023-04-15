const express = require("express");
const router = express.Router();

const admin_controller = require("../controllers/adminController");
const adminDelProduct_controller = require("../controllers/adminDelProductController");
const addProductPage_controller = require("../controllers/addProdPageController");
const updateProduct_controller = require("../controllers/updateProdController");
const addProd_controller = require("../controllers/addProdController");

router.get("/",admin_controller);
router.get("/delete/:prodID",adminDelProduct_controller);
router.route("/addProductPage").get(addProductPage_controller).post(addProductPage_controller);
router.post("/updateProduct",updateProduct_controller);
router.post("/addProduct",addProd_controller);

module.exports = router;