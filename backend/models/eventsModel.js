const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrls: { type: [String], required: true },
    description: { type: String, required: true },
    bookings: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        bookedDate: { type: Date, default: Date.now },
        totalPrice: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);