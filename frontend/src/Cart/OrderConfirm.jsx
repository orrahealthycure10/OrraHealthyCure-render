import React from 'react';
import '../CartStyles/OrderConfirm.css'
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import CheckoutPath from './CheckoutPath';
import { useNavigate } from 'react-router-dom';

function OrderConfirm() {
    // ✅ Added default empty objects/arrays to avoid "Cannot read property of null" errors
    const { shippingInfo = {}, cartItems = [] } = useSelector(state => state.cart || {});
    const { user } = useSelector(state => state.user || {}); // ✅ Prevents crash if state.user is undefined

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.12; // Assuming 18% GST
    const shippingCharges = subtotal > 500 ? 0 : 0;
    const total = subtotal  + shippingCharges;
    const navigate = useNavigate();

    const proceedToPayment = () => {
        const data = {
            subtotal,
            tax,
            shippingCharges,
            total
        };
        // ✅ Store order summary so guest users can still continue to payment
        sessionStorage.setItem('orderItem', JSON.stringify(data));
        navigate('/process/payment');
    };

    return (
        <>
            <PageTitle title="Order Confirm" />
            <Navbar />
            <CheckoutPath activePath={1} />
            <div className="confirm-container">
                <h1 className="confirm-header">Order Confirmation</h1>
                <div className="confirm-table-container">
                    <table className="confirm-table">
                        <caption>Shipping Details</caption>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {/* ✅ Added optional chaining and fallbacks for guest users */}
                                <td>{user?.name || shippingInfo?.name || "Guest"}</td>
                                <td>{shippingInfo?.phoneNumber || "Not Provided"}</td>
                                <td>
                                    {shippingInfo?.address || "No Address"},{" "}
                                    {shippingInfo?.city || ""},{" "}
                                    {shippingInfo?.state || ""},{" "}
                                    {shippingInfo?.country || ""}{" "}
                                    {shippingInfo?.pinCode || ""}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="confirm-table cart-table">
                        <caption>Cart Items</caption>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.product}>
                                    <td>
                                        <img src={item.images} alt={item.name} className="order-product-image" />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.price}/-</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.quantity * item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <table className="confirm-table">
                        <caption>Order Summary</caption>
                        <thead>
                            <tr>
                                <th>Subtotal</th>
                                <th>Shipping Charges</th>
                                <th>GST (Included)</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{subtotal.toFixed(2)}/-</td>
                                <td>{shippingCharges.toFixed(2)}/-</td>
                                <td>{tax.toFixed(2)}/-</td>
                                <td>{total.toFixed(2)}/-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button className="proceed-button" onClick={proceedToPayment}>
                    Proceed to Payment
                </button>
            </div>
            <Footer />
        </>
    );
}

export default OrderConfirm;
