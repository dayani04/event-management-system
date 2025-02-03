const express = require('express');
const router = express.Router();
const eventControllers = require('../controllers/eventsControllers');

router.get('/getAllEvents', eventControllers.getAllEvents);
router.get('/:id', eventControllers.getEventById);
router.post('/', eventControllers.createEvent);
router.put('/:id', eventControllers.updateEvent); // Updated route
router.delete('/:id', eventControllers.deleteEvent);

// Booking Routes
router.post('/book', eventControllers.bookEvent);
router.delete('/cancel/:eventId/:bookingId', eventControllers.cancelBooking);

module.exports = router;