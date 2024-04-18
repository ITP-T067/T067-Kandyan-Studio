const express = require("express");

const{ get_events, create_event, getEventByID, update_event, delete_event} = require("../../controllers/EventManagement/event.controller");

const router = express.Router();

router.get("/",get_events);
router.post("/create", create_event);
router.get("/:id", getEventByID);
router.put("/update", update_event);
router.delete("/delete/:id", delete_event);

module.exports = router;