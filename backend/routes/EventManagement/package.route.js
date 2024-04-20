const express = require("express")
const {get_packageById, get_packagesByCategory,create_package, update_package, delete_package} = require("../../controllers/EventManagement/package.controller");

const router = express.Router();

//upload image
// const multer = require("multer");

// //multer configuration
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads/EventManagement/'); // Destination folder for uploaded files
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname); // Rename the file with timestamp
//     },
//   });

//   const upload = multer({ storage: storage });

router.get("/", get_packagesByCategory);
router.get("/:id", get_packageById);
router.post("/create",  create_package);  //upload.single('file'),
router.put("/update", update_package);
router.delete("/delete/:id", delete_package);

module.exports = router;