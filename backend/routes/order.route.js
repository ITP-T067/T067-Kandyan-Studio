const express = require('express')
<<<<<<< Updated upstream
const {index_onOrder, create_onOrder, update_onOrder, del_onOrder } = require("../controllers/onlineOrder/onlineOrder.controller.js");
const {index_offOrder, create_offOrder, update_offOrder, del_offOrder } = require("../controllers/offlineOrder.controller.js");
const {create_addToCart, index_addToCart, del_addToCart} = require("../controllers/onlineOrder/addToCart.controller");
=======
const {index_onOrder, getOrderById_onOrder, create_onOrder, update_onOrder, del_onOrder, send_email_onOrder } = require("../controllers/onlineOrder/onlineOrder.controller.js");
const {index_offOrder, create_offOrder, update_offOrder, del_offOrder } = require("../controllers/projectManagement/offlineOrder.controller.js");
>>>>>>> Stashed changes

const router = express.Router();
//online orders
router.get("/on/", index_onOrder);
router.get("/on/:id", getOrderById_onOrder);
router.post("/on/create", create_onOrder);
router.post("/on/send-email", send_email_onOrder);
router.put("/on/update", update_onOrder);
router.delete("/on/delete/:id", del_onOrder);

//online cart handle
router.post("/on/create/cart", create_addToCart);
router.get("/on/get/cart", index_addToCart);
router.delete("/on/delete/cart/:id", del_addToCart);


//offline orders
router.get("/off/", index_offOrder);
router.post("/off/create", create_offOrder);
router.put("/off/update", update_offOrder);
router.delete("/off/delete/:id", del_offOrder);

module.exports = router;