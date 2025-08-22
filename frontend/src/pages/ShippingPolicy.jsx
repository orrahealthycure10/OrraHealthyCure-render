import React from 'react';
import '../pageStyles/ShippingPolicy.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const ShippingPolicy = () => {
  return (
    <>
    <Navbar/>
    <section className="shipping-page">
      <div className="static-content">
      <h1 className="shipping-heading">Shipping Policy</h1>
      <div>
         <Link to="/" className="home-link">Home</Link>
      </div>

      <p>orra has partnered with reputed logistic partners for our logistic services, to ensure that all our products reach you in the best of conditions with no damages. We ensure you that we use packaging materials of the best quality, which is sourced from reliable vendors, and ensure thorough testing of package worthiness before using them for shipping and delivery of our products.
</p>
   <p><strong>How does the delivery process work?</strong></p>
<p>Once our system has processed the order that you have placed with us, your products are thoroughly inspected to ensure that they are in a perfect condition. After the products have been subjected to thorough inspection and on passing the final round of quality check, we pack and handover your products to our trusted logistic partner.

</p>

<p>Our logistic partner will then deliver the products to you at the earliest possibility. In case, our logistic partner is unable to reach you at the shipping address or at the suitable time provided by you, then our logistic partner shall contact you to resolve the same. 

</p>
<p>Please note that all products ordered by you (including if any free gifts bundled with the product that you have ordered for) will be shipped to you at the shipping address, provided by you at the time of placing your order, with an invoice. While we strive to ship all products in your order together, this may not always be possible. 

</p>

<p><strong>How are the products packaged?</strong></p>
<p>Each individual product is packaged in bubble wrap while our fragile products like glass bottles are safely secured with an additional layer of bubble wrap. We then package our products in cardboard boxes. After packaging, the products are then handed over to our logistic partners for completing the delivery at the shipping address provided by you. orra hold the responsibility for any damages caused to the product while in transit to you. 

</p>
<p><strong>What is the range of locations to which orra ships their products?

</strong></p>
<p>orra ships throughout India to almost all pin-codes. The list of pin-code serviceability might change from time to time depending on our logistics partners. You can check if we deliver to your shipping address by typing in your pin-code on any of our product pages listed on our Website or by entering your shipping details on the checkout page.

</p>

<p><strong>Is it possible for me to track my order?</strong></p>
<p>As soon as you place your order with us, your order is processed from our concerned warehouse. Once your order has been dispatched from our warehouse, you shall receive a confirmation email, on the email address provided by you at the time of placing your order with us, containing the details of the tracking number and the courier company that is processing your order. Alternatively, if you are a registered user, you can track your order by logging into the “My Account” section of our Website by using the username and password created at the time of your registration, and then clicking on the “Your Orders” tab to view your order details.</p>
<p>You can track the status of your package after your order has been dispatched from our warehouse.</p>

<p><strong>How long will it take for my order to reach me?</strong></p>
<p>At the time of placing your order, depending on your shipping address, an estimated time of delivery would be shared with you. As we maintain inventory of all products that we sell on our Website, you can be rest assured that the products will be dispatched within 24 hours of you placing the order. We aspire to get your product delivered within 2-7 days of you placing your order with us depending on the geography you are ordering from to the shipping address mentioned at the time of placing your order but at times owing to unforeseen circumstances and delays, deliveries can take slightly longer. Please note that orra Ayurveda will try its level best to make sure that you receive your order as soon as possible but orra Ayurveda is not liable for any delay in delivery by our logistics partner.</p>
<p><strong>NOTE:</strong> As such for the time being, we cannot commit on delivery timelines. We do request you to bear with us in the case of slight delays. As per safety protocols while we are currently accepting online orders to ship within India, due to changing nature of the situation, we reserve our right to pause deliveries at any time if so warranted.</p>

<p><strong>What time of the day will my order be delivered?</strong></p>
<p>Our logistic partner will make sure to give you a call before delivering the product at the shipping address provided by you at the time of placing your order with us. Please make sure you are available to receive the calls as usually after 3 (three) failed attempts of trying to deliver the products at the shipping address mentioned, the product shall be returned to our warehouse.</p>

<p><strong>What are the shipping charges applicable on my order?</strong></p>
<p>Shipping and handling charges may vary based on the product ordered, packaging size and other considerations. This amount will be charged to your total bill at the time of placing your order with us on the Website. The shipping and handling charges are given at the time of check out and you will be informed of the same before making payment of the order placed.</p>
<p>Please note that orra does not charge any separate shipping charges in addition to the invoice amount shown at the time of placing the order.</p>

<p><strong>Delivery Information</strong></p>
<p>If no one is available at the address when the delivery of your products is attempted, our logistic partner will make 2 (two) more delivery attempts subsequently. Please note that you can contact our Customer Services hotline for rescheduling the delivery date and we shall try to accommodate your request to the best of our abilities. If the aforementioned 3 delivery attempts are unsuccessful, our logistic partner will return your package to us.</p>

<p><strong>Notification of changes in the Shipping and Delivery Policy</strong></p>
<p>We keep our Shipping and Delivery Policy under review to make sure it is up to date and accurate. Any changes we make to this Policy in the future will be posted on this page. We reserve the right to change or update this Policy at any time without any prior intimation to you. Such changes shall be effective immediately upon posting on our Website. You are required to review the Policy regularly to keep yourself abreast of the changes, if any.</p>

<p><strong>Contact Information</strong></p>
<p>In the rare case that you are not satisfied with the quality of the product delivered to you or with the delivery experience, we welcome you to drop an email to <a href="mailto:contact@orrahealthycure.com">contact@orrahealthycure.com</a> so as to allow us to look into the issue and address the same on a case-by-case basis.</p>








</div>
    </section>
    <Footer/>
    </>
  );
};

export default ShippingPolicy;
