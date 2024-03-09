const eventService = require("../services/event.service");
const { eventSchema } = require("../utils");

async function createEvent(req, res) {
  try {
    const { error } = eventSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const event = await eventService.createEvent(req.body, req.user);
    res.status(201).json(event);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
}

async function getEvent(req, res) {
  try {
    const eventId = req.params.id;
    const event = await eventService.getEvent(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateEvent(req, res) {
  try {
    const eventId = req.params.id;
    const eventData = req.body;
    const updatedEvent = await eventService.updateEvent(eventId, eventData);
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteEvent(req, res) {
  try {
    const eventId = req.params.id;
    await eventService.deleteEvent(eventId);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function registerEvent(req, res) {
  try {
    const eventId = req.params.id;
    const userId = req.user.id;
    await eventService.registerEvent(eventId, userId);
    //email should be triggered
    res.status(200).json({ message: "User registered for event successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  registerEvent,
};