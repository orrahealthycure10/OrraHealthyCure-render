import React, { useState, useEffect } from "react";
import "../CartStyles/Shipping.css";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckoutPath from "./CheckoutPath";
import { useDispatch, useSelector } from "react-redux";
import { Country, State, City } from 'country-state-city';
import { toast } from 'react-toastify';
import { saveShippingInfo } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

function Shipping() {
  const { shippingInfo } = useSelector(state => state.cart);

  const dispatch = useDispatch();
  const [name, setName] = useState(shippingInfo.name || "");
  const [address, setAddress] = useState(shippingInfo.address || "");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
  const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const navigate = useNavigate();

  // ✅ Mobile breakpoint (only affects layout, not logic)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 480px)");
    const update = () => setIsMobile(mq.matches);
    update();
    // add/remove listener (both syntaxes for browser compat)
    mq.addEventListener ? mq.addEventListener("change", update) : mq.addListener(update);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", update) : mq.removeListener(update);
    };
  }, []);

  const shippingInfoSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) { toast.error('Please enter your name', { position: 'top-center', autoClose: 3000 }); return; }
    if (!address.trim()) { toast.error('Please enter your address', { position: 'top-center', autoClose: 3000 }); return; }
    if (!pinCode.trim()) { toast.error('Please enter your pin code', { position: 'top-center', autoClose: 3000 }); return; }
    if (!phoneNumber.trim()) { toast.error('Please enter your phone number', { position: 'top-center', autoClose: 3000 }); return; }
    if (!country) { toast.error('Please select a country', { position: 'top-center', autoClose: 3000 }); return; }
    if (!state) { toast.error('Please select a state', { position: 'top-center', autoClose: 3000 }); return; }
    if (!city) { toast.error('Please select a city', { position: 'top-center', autoClose: 3000 }); return; }
    if (phoneNumber.length !== 10) { toast.error('Invalid Phone number! It should be 10 digits', { position: 'top-center', autoClose: 3000 }); return; }

    dispatch(saveShippingInfo({ name, address, pinCode, phoneNumber, country, state, city }));
    navigate('/order/confirm');
  };

  return (
    <>
      <PageTitle title="Shipping Info" />
      <Navbar />
      <CheckoutPath activePath={0} />

      <div className="shipping-form-container">
        <h1 className="shipping-form-header">Shipping Details</h1>

        <form className="shipping-form" onSubmit={shippingInfoSubmit}>

          {/* ✅ Mobile: single column (one under another) */}
          {isMobile ? (
            <div className="shipping-section mobile-stack">
              {/* Name */}
              <div className="shipping-form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your Name Before Proceeding"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Country */}
              <div className="shipping-form-group">
                <label htmlFor="country">Country *</label>
                <select
                  name="country"
                  id="country"
                  value={country}
                  onChange={(e) => { setCountry(e.target.value); setState(""); setCity(""); }}
                  required
                >
                  <option value="">Select a Country</option>
                  {Country && Country.getAllCountries().map((item) => (
                    <option value={item.isoCode} key={item.isoCode}>{item.name}</option>
                  ))}
                </select>
              </div>

              {/* State */}
              {country && (
                <div className="shipping-form-group">
                  <label htmlFor="state">State *</label>
                  <select
                    name="state"
                    id="state"
                    value={state}
                    onChange={(e) => { setState(e.target.value); setCity(""); }}
                    required
                  >
                    <option value="">Select a State</option>
                    {State && State.getStatesOfCountry(country).map((item) => (
                      <option value={item.isoCode} key={item.isoCode}>{item.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* City */}
              {state && (
                <div className="shipping-form-group">
                  <label htmlFor="city">City *</label>
                  <select
                    name="city"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  >
                    <option value="">Select a City</option>
                    {City && City.getCitiesOfState(country, state).map((item) => (
                      <option value={item.name} key={item.name}>{item.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Address */}
              <div className="shipping-form-group">
                <label htmlFor="address">Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              {/* PinCode */}
              <div className="shipping-form-group">
                <label htmlFor="pinCode">PinCode *</label>
                <input
                  type="number"
                  id="pinCode"
                  name="pinCode"
                  placeholder="Enter your pinCode"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="shipping-form-group">
                <label htmlFor="phoneNumber">Phone Number *</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,10}$/.test(value)) setPhoneNumber(value);
                  }}
                  maxLength={10}
                  pattern="[0-9]{10}"
                  required
                />
              </div>
            </div>
          ) : (
            // 💻 Desktop / tablet: your original grouping (unchanged)
            <>
              <div className="shipping-section">
                <div className="shipping-form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your Name Before Proceeding"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="shipping-form-group">
                  <label htmlFor="address">Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="shipping-form-group">
                  <label htmlFor="pinCode">PinCode *</label>
                  <input
                    type="number"
                    id="pinCode"
                    name="pinCode"
                    placeholder="Enter your pinCode"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    required
                  />
                </div>

                <div className="shipping-form-group">
                  <label htmlFor="phoneNumber">Phone Number *</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,10}$/.test(value)) setPhoneNumber(value);
                    }}
                    maxLength={10}
                    pattern="[0-9]{10}"
                    required
                  />
                </div>
              </div>

              <div className="shipping-section">
                <div className="shipping-form-group">
                  <label htmlFor="country">Country *</label>
                  <select
                    name="country"
                    id="country"
                    value={country}
                    onChange={(e) => { setCountry(e.target.value); setState(""); setCity(""); }}
                    required
                  >
                    <option value="">Select a Country</option>
                    {Country && Country.getAllCountries().map((item) => (
                      <option value={item.isoCode} key={item.isoCode}>{item.name}</option>
                    ))}
                  </select>
                </div>

                {country && (
                  <div className="shipping-form-group">
                    <label htmlFor="state">State *</label>
                    <select
                      name="state"
                      id="state"
                      value={state}
                      onChange={(e) => { setState(e.target.value); setCity(""); }}
                      required
                    >
                      <option value="">Select a State</option>
                      {State && State.getStatesOfCountry(country).map((item) => (
                        <option value={item.isoCode} key={item.isoCode}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                {state && (
                  <div className="shipping-form-group">
                    <label htmlFor="city">City *</label>
                    <select
                      name="city"
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    >
                      <option value="">Select a City</option>
                      {City && City.getCitiesOfState(country, state).map((item) => (
                        <option value={item.name} key={item.name}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </>
          )}

          <button type="submit" className="shipping-submit-btnz">Continue</button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Shipping;
