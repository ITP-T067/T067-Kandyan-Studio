const express = require('express');
const multer = require('multer');
const {index_onOrder, getOrderById_onOrder, create_onOrder, update_onOrder, del_onOrder, send_email_onOrder, index_count_onOrder } = require("../controllers/onlineOrder/onlineOrder.controller.js");
const {index_onOrder, getOrderById_onOrder, create_onOrder, update_onOrder, del_onOrder, send_email_onOrder, find_cusid_data } = require("../controllers/onlineOrder/onlineOrder.controller.js");
const {index_offOrder, create_offOrder, update_offOrder, del_offOrder } = require("../controllers/projectManagement/offlineOrder.controller.js");
const {create_addToCart, index_addToCart, del_addToCart, cart_find_item} = require("../controllers/onlineOrder/addToCart.controller");
const {create_pendingOrder, index_pendingOrder, getOrderById_pendingOrder, update_pendingOrder, del_pendingOrder, updateStatusToPending} = require("../controllers/onlineOrder/pending.controller")

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/OnlineOrder'); // Destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Rename the file with timestamp
    },
});

const upload = multer({ storage: storage });

const router = express.Router();
//online orders
router.get("/on/", index_onOrder);
router.get("/on/:id", getOrderById_onOrder);
router.post("/on/create", create_onOrder);
router.post("/on/send-email", send_email_onOrder);
router.put("/on/update", update_onOrder);
router.delete("/on/delete/:id", del_onOrder);

//online cart handle
router.post("/on/create/cart", upload.single('file'), create_addToCart);
router.get("/on/get/cart", index_addToCart);
router.delete("/on/delete/cart/:id", del_addToCart);
router.get("/on/get/cart/:id", cart_find_item);

//online order pending list
router.post("/on/create/pending", upload.single('file'), create_pendingOrder);
router.get("/on/get/pending", index_pendingOrder);
router.get("/on/get/pending/:id", getOrderById_pendingOrder);
router.put("/on/update/pending/", update_pendingOrder);
router.delete("/on/delete/pending/:id", del_pendingOrder);
router.put("/on/update/pending/:id", updateStatusToPending);
router.get("/on/count/get/order", index_count_onOrder);



//offline orders
router.get("/off/", index_offOrder);
router.post("/off/create", create_offOrder);
router.put("/off/update", update_offOrder);
router.delete("/off/delete/:id", del_offOrder);

module.exports = router;