// RefundsManager.js
import React, { useState } from 'react';
import ApprovedRefundsTable from './ApprovedRefundsTable';
import RefundRequestsTable from './RefundRequestsTable'; // You'll need to create this component if you haven't already

const RefundsManager = () => {
  const [view, setView] = useState('requests'); // This state determines which view to show

  const showRequests = () => setView('requests');
  const showApproved = () => setView('approved');

  return (
    <div>
      {view === 'requests' && <RefundRequestsTable onViewApproved={showApproved} />}
      {view === 'approved' && <ApprovedRefundsTable onBack={showRequests} />}
    </div>
  );
};

export default RefundsManager;
