const Admins = require("../models/admiModel"); // Assuming you have an adminModel
const bcrypt = require("bcryptjs");

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admins.find();
    if (!admins || admins.length === 0) {
      return res.status(404).json({ message: "No admins found" });
    }
    return res.status(200).json({ admins });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to retrieve admins" });
  }
};

// Add a new admin (Hashing password)
const addAdmin = async (req, res) => {
  const { name, email, age, address, password } = req.body;

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admins({ 
      name, 
      email, 
      age, 
      address, 
      password: hashedPassword 
    });

    await admin.save();
    return res.status(201).json({ message: "Admin added successfully", admin });
  } catch (err) {
    console.error("Error saving admin:", err);
    return res.status(500).json({ message: "Failed to add admin", error: err.message });
  }
};

// Get admin by ID
const getAdminById = async (req, res) => {
  try {
    const admin = await Admins.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    return res.status(200).json({ admin });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving admin" });
  }
};

// Update admin details
const updateAdmin = async (req, res) => {
  try {
    const updatedAdmin = await Admins.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Unable to update admin details" });
    }
    return res.status(200).json({ message: "Admin updated successfully", updatedAdmin });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating admin details" });
  }
};

// Delete admin
const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admins.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    return res.status(200).json({ message: "Admin deleted successfully", admin });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting admin" });
  }
};

// Secure Admin Login
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin by email
    const admin = await Admins.findOne({ email });

    if (!admin) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    return res.status(200).json({ success: true, message: "Login successful" });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ success: false, message: "Server error" });
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