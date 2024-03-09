const { getEvent, createEvent, updateEvent, deleteEvent, registerEvent } = require("../controllers/event.controller");

const router = require("express").Router();

router.post("",  createEvent);
router.get("/:id",  getEvent);
router.post("/:id/register",  registerEvent);
router.put("/:id",  updateEvent);
router.delete("/:id",  deleteEvent);

module.exports = router;
