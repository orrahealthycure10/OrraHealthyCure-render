import React from 'react';
import { useLocation } from 'react-router-dom';

function PaymentSuccess() {
  const query = new URLSearchParams(useLocation().search);
  const txnid = query.get("txnid");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Payment Successful 🎉</h1>
      <p>Transaction ID: {txnid}</p>
    </div>
  );
}

export default PaymentSuccess;
