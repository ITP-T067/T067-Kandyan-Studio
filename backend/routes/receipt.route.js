const express = require('express');
const multer = require('multer');
const { index_receipt, create_receipt, update_receipt, del_receipt} = require("../controllers/receipt.controller.js")

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Files/Receipts'); // Destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Rename the file with timestamp
    },
});

const upload = multer({ storage: storage });


router.get("/", index_receipt);
// router.get("/:id", getReceiptById_receipt);
router.post("/create", upload.single('file'), create_receipt);
router.put("/update", update_receipt);
router.delete("/delete/:id", del_receipt);

module.exports = router;
