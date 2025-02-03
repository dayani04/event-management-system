import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; 
import "./AdminRegister.css";


function AdminRegister() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    age: '',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/admins', userData); // Updated endpoint

      Swal.fire({
        title: 'Success!',
        text: 'User added successfully!',
        icon: 'success',
        confirmButtonText: 'Okay'
      });

      console.log('Admin added:', response.data);
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Error adding user!',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });

      console.error('Error adding user:', error);
    }
  };

  return (
    <section>
   
    <div className="add-admin-container">
      <h2>Add New Admin</h2> {/* Updated text */}
      <form onSubmit={handleSubmit} className="add-admin-form"> {/* Updated class name */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={userData.age}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Add Admin</button> {/* Updated button text */}
      </form>
    </div>
    </section>
  );
}

export default AdminRegister;
