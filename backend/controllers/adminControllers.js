const Admins = require("../models/admiModel"); // Assuming you have an adminModel

// Get all admins
const getAllAdmins = async (req, res, next) => {
  let admins;
  try {
    admins = await Admins.find();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to retrieve admins" });
  }

  if (!admins || admins.length === 0) {
    return res.status(404).json({ message: "No admins found" });
  }

  return res.status(200).json({ admins });
};

// Add a new admin (Storing plain text password)
const addAdmin = async (req, res, next) => {
  const { name, email, age, address, password } = req.body;

  let admin;
  try {
    admin = new Admins({ name, email, age, address, password }); // Store plain text password
    await admin.save();
  } catch (err) {
    console.error("Error saving admin:", err);
    return res.status(500).json({ message: "Failed to add admin", error: err.message });
  }

  return res.status(201).json({ message: "Admin added successfully", admin });
};

// Get admin by ID
const getAdminById = async (req, res, next) => {
  const id = req.params.id;

  let admin;
  try {
    admin = await Admins.findById(id);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving admin" });
  }

  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  return res.status(200).json({ admin });
};

// Update admin details
const updateAdmin = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, age, address } = req.body;

  let admin;
  try {
    admin = await Admins.findByIdAndUpdate(id, { name, email, age, address }, { new: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating admin details" });
  }

  if (!admin) {
    return res.status(404).json({ message: "Unable to update admin details" });
  }

  return res.status(200).json({ message: "Admin updated successfully", admin });
};

// Delete admin
const deleteAdmin = async (req, res, next) => {
  const id = req.params.id;

  let admin;
  try {
    admin = await Admins.findByIdAndDelete(id);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting admin" });
  }

  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  return res.status(200).json({ message: "Admin deleted successfully", admin });
};


const adminLogin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const admin = await Admins.findOne({ email });
  
      if (!admin) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      if (admin.password !== password) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      return res.status(200).json({ success: true, message: 'Login successful' });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

module.exports = {
  getAllAdmins,
  addAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  adminLogin,
};
