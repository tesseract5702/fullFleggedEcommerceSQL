const express = require("express");
const router = express.Router();

const seller_controller = require("../controllers/sellerController");
const addProductPage_controller = require("../controllers/addProdPageController");
const updateProduct_controller = require("../controllers/updateProdController");
const addProd_controller = require("../controllers/addProdController");
const adminDelProduct_controller = require("../controllers/adminDelProductController");
const {loadmore_controller,loadmoreseller_controller} = require("../controllers/loadmoreController");
const orders_controller = require("../controllers/orderController");
const {addProdcsv_controller} = require("../controllers/addProdUsingcsv");

router.get("/",seller_controller);
router.post("/loadmore",loadmoreseller_controller);
router.route("/addProductPage").get(addProductPage_controller).post(addProductPage_controller);
router.post("/addProduct",addProd_controller);
router.post("/updateProduct",updateProduct_controller);
router.get("/delete/:prodID",adminDelProduct_controller);
router.get("/orderSeller",orders_controller);
router.post("/addProductCSV",addProdcsv_controller);

module.exports = router;