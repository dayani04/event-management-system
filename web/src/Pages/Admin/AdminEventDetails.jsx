import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import Swal from 'sweetalert2';

const EventsManagement = () => {
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({
    name: '',
    location: '',
    price: '',
    imageUrls: '',
    description: ''
  });
  const [isAddMode, setIsAddMode] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);

  const navigate = useNavigate(); // Define navigate

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios.get('http://localhost:5000/api/events/getAllEvents')
      .then((response) => {
        setEvents(response.data.events);
      })
      .catch((error) => console.error(error));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const eventData = {
      ...event,
      imageUrls: event.imageUrls.split(',')
    };

    axios.post('http://localhost:5000/api/events', eventData)
      .then(() => {
        setIsAddMode(false);
        resetForm();
        fetchEvents();
        Swal.fire({
          icon: 'success',
          title: 'Event Added',
          text: 'The event has been successfully added.',
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while adding the event.',
        });
        console.error(error);
      });
  };

  const handleEditEvent = (eventId) => {
    const eventToEdit = events.find((e) => e._id === eventId);
    if (eventToEdit) {
      setEvent({
        ...eventToEdit,
        imageUrls: eventToEdit.imageUrls.join(',')
      });
      setEditingEventId(eventId);
      setIsUpdateMode(true);
    }
  };

  const handleUpdateEvent = (e) => {
    e.preventDefault();
    const updatedEventData = {
      ...event,
      imageUrls: event.imageUrls.split(',')
    };

    axios.put(`http://localhost:5000/api/events/${editingEventId}`, updatedEventData)
      .then(() => {
        setIsUpdateMode(false);
        resetForm();
        fetchEvents();
        Swal.fire({
          icon: 'success',
          title: 'Event Updated',
          text: 'The event has been successfully updated.',
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while updating the event.',
        });
        console.error(error);
      });
  };

  const handleDeleteEvent = (eventId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the event!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6453e0',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/api/events/${eventId}`)
          .then(() => {
            setEvents(events.filter((event) => event._id !== eventId));
            Swal.fire({
              icon: 'success',
              title: 'Event Deleted',
              text: 'The event has been successfully deleted.',
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong while deleting the event.',
            });
            console.error(error);
          });
      }
    });
  };

  const resetForm = () => {
    setEvent({
      name: '',
      location: '',
      price: '',
      imageUrls: '',
      description: ''
    });
    setEditingEventId(null);
    setIsAddMode(false);
    setIsUpdateMode(false);
  };

  return (
    <section className="container py-5">
      <h1 className="text-center mb-4">Event Management</h1> 
      <br />

      <button onClick={() => navigate("/AdminRegister")} className="btn btn-secondary">
        Register Admin
      </button>
<br></br>  <br></br>
      {!isAddMode && !isUpdateMode && (
        <div className="d-flex justify-content-between mb-4">
          <button className="btn btn-primary" onClick={() => setIsAddMode(true)}>Add New Event</button>
        </div>
      )}

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {events.map((event) => (
          <div key={event._id} className="col">
            <div className="card shadow-sm border h-100">
              <img src={event.imageUrls[0]} className="card-img-top" alt={event.name} />
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">{event.description}</p>
                <p className="text-muted">Price: ${event.price}</p>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditEvent(event._id)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteEvent(event._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(isAddMode || isUpdateMode) && (
        <div className="border p-4 rounded">
          <h2 className="mb-4">{isUpdateMode ? 'Update Event' : 'Add Event'}</h2>
          <form onSubmit={isUpdateMode ? handleUpdateEvent : handleAddEvent} className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control border"
                placeholder="Event Name"
                value={event.name}
                onChange={(e) => setEvent({ ...event, name: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control border"
                placeholder="Event Location"
                value={event.location}
                onChange={(e) => setEvent({ ...event, location: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                className="form-control border"
                placeholder="Price"
                value={event.price}
                onChange={(e) => setEvent({ ...event, price: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control border"
                placeholder="Image URLs (comma-separated)"
                value={event.imageUrls}
                onChange={(e) => setEvent({ ...event, imageUrls: e.target.value })}
              />
            </div>
            <div className="col-12">
              <textarea
                className="form-control border"
                placeholder="Description"
                value={event.description}
                onChange={(e) => setEvent({ ...event, description: e.target.value })}
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">{isUpdateMode ? 'Update Event' : 'Add Event'}</button>
              <button type="button" className="btn btn-secondary ms-2" onClick={() => resetForm()}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default EventsManagement;
