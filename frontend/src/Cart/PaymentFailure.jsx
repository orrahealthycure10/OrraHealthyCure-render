import React from 'react';
import { useNavigate } from 'react-router-dom';


function PaymentFailure() {
      const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Payment Failed ❌</h1>
      <p>Something went wrong. Please try again.</p>
                  {/* Return button centered under box */}
  <div className="return-btn-container">
    <button
      type="button"
      className="rbtn"
      onClick={() => navigate('/')}
    >
      Return to Home Page
    </button>
  </div>
    </div>
  );
}

export default PaymentFailure;
