const express = require("express");

const{ get_events,get_packagesByCategory, create_event, getEventByID, update_event, delete_event} = require("../../controllers/EventManagement/event.controller");

const router = express.Router();

//upload pdf
// const multer = require("multer");

// //multer configuration
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads/EventManagement'); // Destination folder for uploaded files
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname); // Rename the file with timestamp
//     },
//   });

//   const upload = multer({ storage: storage });

router.get("/",get_events);
router.get("/category", get_packagesByCategory);
router.post("/create",  create_event);  //upload.single('file'),
router.get("/:id", getEventByID);
router.put("/update", update_event);
router.delete("/delete/:id", delete_event);

module.exports = router;