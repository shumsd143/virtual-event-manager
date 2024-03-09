const User = require("../models/user.model");
const Event = require("../models/event.model");

async function createEvent(event, user) {
  try {
    event.organizer = user._id;
    const newEvent = await Event.create(event);
    return newEvent;
  } catch (error) {
    throw new Error("Error creating event");
  }
}

async function getEvent(id) {
  try {
    const event = await Event.findOne({ _id: id });
    return event;
  } catch (error) {
    throw new Error("Error getting event");
  }
}

async function updateEvent(id, eventData) {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, eventData, { new: true });
    return updatedEvent;
  } catch (error) {
    throw new Error("Error updating event");
  }
}

async function deleteEvent(id) {
  try {
    await Event.findByIdAndDelete(id);
    return { message: "Event deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting event");
  }
}

async function registerEvent(eventId, userId) {
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    if (event.participants.includes(userId)) {
      throw new Error("User is already registered for this event");
    }
    event.participants.push(userId);
    await event.save();
    return { message: "User registered for event successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  registerEvent,
};