import React from 'react';
import '../CartStyles/Payment.css';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CheckoutPath from './CheckoutPath';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function Payment() {
  const orderItem = JSON.parse(sessionStorage.getItem('orderItem'));
  const { user } = useSelector((state) => state.user);
  const { shippingInfo } = useSelector((state) => state.cart);

  const completePayment = async (amount) => {
    try {
      // ✅ Decide values for login vs guest
      const safeName = user?.name || shippingInfo?.name || "Guest User";
      const safeEmail = user?.email || "guest@example.com"; // no shippingInfo.email
      const safePhone = shippingInfo?.phoneNumber || "9999999999";

      // ✅ Call backend to get hash + details
      const { data } = await axios.post('/api/v1/payu/initiate', {
        amount,
        name: safeName,
        email: safeEmail,
        phone: safePhone,
      });

      // ✅ Create and auto-submit PayU form
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://test.payu.in/_payment'; // TEST URL

      Object.entries(data).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      toast.error(error.message, { position: 'top-center', autoClose: 3000 });
    }
  };

  return (
    <>
      <PageTitle title="Payment Processing" />
      <Navbar />
      <CheckoutPath activePath={2} />
      <div className="payment-container">
        <Link to="/order/confirm" className="payment-go-back">
          Go Back
        </Link>
        <button
          className="payment-btn"
          onClick={() => completePayment(orderItem.total)}
        >
          Pay ({orderItem.total.toFixed(2)})/-
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Payment;
