import React, { useState } from 'react';
import ApprovedRefundsTable from '../../../../admin/Refunds/Customer/Approved Refunds/ApprovedRefundsTable';
import InventoryRefundRequestsTable from './InventoryRefundRequestsTable';
const RefundsManager = () => {
  const [view, setView] = useState('requests'); 

  const showRequests = () => setView('requests');
  const showApproved = () => setView('approved');

  return (
    <div>
      {view === 'requests' && <InventoryRefundRequestsTable onViewApproved={showApproved} />}
      {view === 'approved' && <ApprovedRefundsTable onBack={showRequests} />}
    </div>
  );
};

export default RefundsManager;
