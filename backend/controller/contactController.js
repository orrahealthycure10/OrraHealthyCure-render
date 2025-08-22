import Contact from "../models/contactModel.js";

export const submitContactForm = async (req, res, next) => {
  try {
    const { name, email, phone, orderNumber, message } = req.body;

    if (!email || !phone) {
      return res.status(400).json({ message: "Email and phone are required" });
    }

    await Contact.create({ name, email, phone, orderNumber, message });
    res.status(201).json({ message: "Your message has been received!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit message", error: err.message });
  }
};
