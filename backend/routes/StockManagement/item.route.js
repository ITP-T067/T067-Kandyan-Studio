const express = require('express')
const {index_item, create_item, update_item, del_item, find_item, send_email} = require("../../controllers/StockManagement/item.controller");

const router = express.Router();

//Upload Image
const multer = require("multer");

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './uploads/StockManagement'); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Rename the file with timestamp
  },
});

const upload = multer({ storage: storage });

//items
router.get("/", index_item);
router.post("/create",upload.single('file'), create_item);
router.put("/update", update_item);
router.delete("/delete/:id", del_item);
router.post("/send-email", send_email);
router.get("/find/:id", find_item);

module.exports = router;