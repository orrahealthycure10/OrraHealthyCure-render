import React, { useState } from "react";
import "../pageStyles/ContactUs.css";
import Navbar from "../components/Navbar";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderNumber: "",
    message: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your POST logic here
    console.log(formData);
  };

  return (
    <>
      <Navbar />
    <div className="contact-wrapper">
      <form className="contact-form-new" onSubmit={handleSubmit}>
        <h2>CONTACT US</h2>
        <div className="form-row">
          <div className="form-group">
            <label>Your name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Your email address<span className="required">*</span></label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Contact Number<span className="required">*</span></label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Order Number</label>
            <input
              type="text"
              name="orderNumber"
              value={formData.orderNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group full">
          <label>Message...</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <div className="form-group full attach-group">
          <label htmlFor="fileInput" className="attach-label">
            📎 Attach file <small>(.doc, .pdf, .png, .jpg, .gif, or .jpeg)</small>
          </label>
          <input
            id="fileInput"
            type="file"
            name="file"
            onChange={handleChange}
          />
        </div>

        <div className="form-group full center">
          <button type="submit">
            Send <span className="send-icon">✈️</span>
          </button>
        </div>

      <div className="contact-extra-info">
        <p><strong>For openings and collaboration:</strong><br />careers@orra.in</p>
        <p><strong>For bulk orders and business:</strong><br />sales@orra.in</p>
        <p><strong>Enquiry:</strong> info@orra.in<br />
        <strong>Toll Free No:</strong> 1800 274 0-0-0</p>
      </div>
      </form>
    </div>
    </>
  );
};

export default Contact;
