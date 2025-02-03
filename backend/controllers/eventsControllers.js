const Event = require('../models/eventsModel');

// Get all events
const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find({});
    res.json({ events });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single event by ID
const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create an event
const createEvent = async (req, res, next) => {
  try {
    const newEvent = new Event({
      name: req.body.name,
      location: req.body.location,
      price: req.body.price,
      imageUrls: req.body.imageUrls,
      description: req.body.description,
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully' });
  } catch (error) {
    console.error('Error creating event:', error); // Log the error to console for more details
    res.status(500).json({ message: error.message });
  }
};

// Update an event
const updateEvent = async (req, res, next) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      location: req.body.location,
      price: req.body.price,
      imageUrls: req.body.imageUrls,
      description: req.body.description,
    }, {
      new: true,
    });
    res.status(200).json({ message: 'Event updated successfully', updatedEvent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an event
const deleteEvent = async (req, res,next) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Book an event
const bookEvent = async (req, res,next) => {
  try {
    const { eventId, userId, totalPrice } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    event.bookings.push({
      userId,
      totalPrice,
    });

    await event.save();
    res.status(200).json({ message: 'Event booked successfully', event });
  } catch (error) {
    console.error('Error booking event:', error);
    res.status(500).json({ message: error.message });
  }
};

// Cancel a booking
const cancelBooking = async (req, res, next) => {
  try {
    const { eventId, bookingId } = req.params;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    event.bookings = event.bookings.filter((booking) => booking._id.toString() !== bookingId);
    await event.save();

    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports ={
    cancelBooking,
    bookEvent,
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
};