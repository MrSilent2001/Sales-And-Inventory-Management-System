import React from 'react';
import './generatedRequest.css';

function GeneratedRequest() {
  return (
    <div className="generated-request">
      <div className="request-container">
        <h2>Generated Request</h2>
        <div className="request-info">
          <div className="info-row">
            <span className="label">Supplier</span>
            <span className="value">Silva Construction Suppliers (PVT) LTD.</span>
          </div>
          <div className="info-row">
            <span className="label">Item</span>
            <span className="value">1001</span>
          </div>
          <div className="info-row">
            <span className="label">Quantity</span>
            <span className="value">250</span>
          </div>
          <div className="info-row">
            <span className="label">Reason</span>
            <span className="value">Manufacturing Defects of the items and cannot be repaired</span>
          </div>
          <div className="info-row">
            <span className="label">Total Price</span>
            <span className="value">Rs.450,000.00</span>
          </div>
        </div>
        <button type="button" className="go-back-button">Go Back</button>
      </div>
    </div>
  );
}

export default GeneratedRequest;
