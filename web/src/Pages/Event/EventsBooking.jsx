import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import jsPDF from "jspdf";
import { QRCodeCanvas } from "qrcode.react";

import "./EventsBooking.css";

function EventsBooking() {
  const { eventid } = useParams();
  const [event, setEvent] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const qrRef = useRef(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${eventid}`);
        setEvent(response.data.event);
        setTotalPrice(response.data.event.price);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
    fetchEvent();
  }, [eventid]);

  const handleBooking = async () => {
    if (!selectedDate) {
      Swal.fire({
        title: 'Error!',
        text: 'Please select a booking date.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/events/book", {
        eventId: eventid,
        selectedDate,
        totalPrice,
      });

      setBookingDetails({
        eventName: event.name,
        eventDate: selectedDate,
        totalPrice,
      });

      Swal.fire({
        title: 'Success!',
        text: 'Event booked successfully!',
        icon: 'success',
        confirmButtonText: 'Great!',
      });
    } catch (error) {
      console.error("Error booking event:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Error booking event',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const qrCanvas = qrRef.current.querySelector("canvas");
    const qrImage = qrCanvas.toDataURL("image/png");

    const img = new Image();
    img.src = "/assets/img/Diriyata Athwelak Ticket.jpg";
    img.onload = function () {
      doc.addImage(img, "JPEG", 20, 20, 170, 60);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.text("Booking Details", 20, 90);
      doc.setFontSize(14);
      doc.text(`Event Name: ${bookingDetails.eventName}`, 20, 110);
      doc.text(`Event Date: ${bookingDetails.eventDate}`, 20, 120);
      doc.setFont("helvetica", "bold");
      doc.text(`Total Price: $${bookingDetails.totalPrice}`, 20, 130);
      
      doc.addImage(qrImage, "PNG", 20, 140, 50, 50);
      
      doc.save("booking_details.pdf");
    };
  };

  return (
    <section>
    
      <div className="events-booking-container">
        {event ? (
          <div className="event-details">
            <h1>{event.name}</h1>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Price:</strong> ${event.price}</p>
            <div className="booking-date">
              <label htmlFor="booking-date">Select Booking Date: </label>
              <input 
                type="date"
                id="booking-date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="total-price">
              <h3>Total Price: ${totalPrice}</h3>
            </div>
            <button onClick={handleBooking}>Book Now</button>
          </div>
        ) : (
          <div className="loading-box">
            <h2>Loading event details...</h2>
            <div className="spinner"></div>
          </div>
        )}
        {bookingDetails && (
          <div className="booking-details-box">
            <h2>Booking Confirmed</h2>
            <p><strong>Event Name:</strong> {bookingDetails.eventName}</p>
            <p><strong>Booking Date:</strong> {bookingDetails.eventDate}</p>
            <p><strong>Total Price:</strong> ${bookingDetails.totalPrice}</p>
            <div ref={qrRef}>
              <QRCodeCanvas value={`Event: ${bookingDetails.eventName}\nDate: ${bookingDetails.eventDate}\nPrice: $${bookingDetails.totalPrice}`} size={100} />
            </div>
            <button onClick={generatePDF}>Download Booking Details (PDF)</button>
          </div>
        )}
      </div>
    </section>
  );
}

export default EventsBooking;
