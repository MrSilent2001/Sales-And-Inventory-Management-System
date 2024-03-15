import React, { useState } from 'react';
import SalesRefundRequestsTable from './SalesRefundRequestsTable';
import SalesApprovedRefundsTable from '../Sales_ApprovedRefundsTable/SalesApprovedRefundsTable';
const SalesRefundsManager = () => {
  const [view, setView] = useState('requests'); 

  const showRequests = () => setView('requests');
  const showApproved = () => setView('approved');

  return (
    <div>
      {view === 'requests' && <SalesRefundRequestsTable onViewApproved={showApproved} />}
      {view === 'approved' && <SalesApprovedRefundsTable onBack={showRequests} />}
    </div>
  );
};

export default SalesRefundsManager;
