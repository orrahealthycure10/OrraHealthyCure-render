import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  phone: { type: String, required: true },
  orderNumber: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Contact", contactSchema);
