const express = require("express");

const { get_events, get_eventsByPackage, eventStatusById, viewPayment, get_packagesByCategory, create_event, getEventByID, update_event, delete_event, send_email } = require("../../controllers/EventManagement/event.controller");

const router = express.Router();

// upload pdf
const multer = require("multer");

//multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/EventManagement'); // Destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Rename the file with timestamp
    },
});

const upload = multer({ storage: storage });

router.get("/", get_events);
router.get("/:file", viewPayment);
router.get("/package/:id", get_eventsByPackage);
router.get("/category", get_packagesByCategory);
router.post("/create", upload.single('file'), create_event);  //upload.single('file'),
router.put("/:id", eventStatusById);
router.put("/update", update_event);
router.get("/getEventByID/:id", getEventByID);
router.post("/send-email", send_email);
router.delete("/delete/:id", delete_event);

module.exports = router;