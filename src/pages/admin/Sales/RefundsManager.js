import React, { useState } from 'react';
import ApprovedRefundsTable from './ApprovedRefundsTable';
import RefundRequestsTable from './RefundRequestsTable'; 
const RefundsManager = () => {
  const [view, setView] = useState('requests'); 

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
