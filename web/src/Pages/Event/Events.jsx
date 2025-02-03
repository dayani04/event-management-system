import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./Events.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState(null);  // Store authenticated user ID

  useEffect(() => {
    // Fetch authenticated user ID (you can replace this logic as per your authentication setup)
    const fetchUserId = async () => {
      try {
        const userResponse = await axios.get("http://localhost:5000/api/auth/user"); // Assuming you have a route that gets logged-in user data
        setUserId(userResponse.data.userId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
    fetchUserId();

    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events/getAllEvents");
        setEvents(response.data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const cancelBooking = async (eventId, bookingId) => {
    if (!userId) {
      alert("Please log in to cancel your booking.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/events/cancel/${eventId}/${bookingId}`
      );
      alert(response.data.message);
      // Update events state after successful cancellation
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId
            ? {
                ...event,
                bookings: event.bookings.filter((booking) => booking._id !== bookingId),
              }
            : event
        )
      );
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert("Failed to cancel booking.");
    }
  };

  return (
    <section>
      <Navbar />
      <div className="event-container">
        {events.length === 0 ? (
          <h2>No events available</h2>
        ) : (
          events.map((event) => (
            <div className="event-card" key={event._id}>
              <img
                src={event.imageUrls && event.imageUrls.length > 0 ? event.imageUrls[0] : "https://via.placeholder.com/300"}
                alt={event.name}
                className="event-image"
              />
              <div className="event-details">
                <h3 className="event-title">{event.name}</h3>
                <p className="event-description">{event.description}</p>
                <p className="event-price">Price: ₹{event.price}</p>     
                <Link to={`/book/${event._id}`}>
  <button className="book-now-button">
    Book Event
  </button>
</Link>


                {/* Only show cancel button if event is booked by this user */}
                {event.bookings.some((booking) => booking.userId === userId) && (
                  <>
                    <button
                      className="cancel-booking-button"
                      onClick={() => cancelBooking(event._id, event.bookings.find(booking => booking.userId === userId)._id)}
                    >
                      Cancel Booking
                    </button>
                    <Link to={`/book/${event._id}`}>
                      <button className="view-booking-button">
                        View Booking
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Events;
