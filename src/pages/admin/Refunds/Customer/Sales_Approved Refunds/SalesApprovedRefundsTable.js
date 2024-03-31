import React from 'react';
import { Container, Box, Button, Paper } from '@mui/material';
import './SalesApprovedRefundsTable.css'
import {Link} from "react-router-dom";
import InventoryNavbar from "../../../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../../../layout/footer/footer";
import BackArrow from "../../../../../components/Icons/backArrow";
import salesApprovedRefunds from "../../../../../data/data.json";
import CustomizedTable from "../../../../../components/Table/Customized Table/customizedTable";

const SalesApprovedRefundsTable = ({ onBack }) => {

  const columns=[
    { id: 'name', label: 'Name', minWidth: 70,align: 'center'  },
    { id: 'requestId', label: 'Request Id', minWidth: 150,align: 'center'  },
    { id: 'orderId', label: 'Order Id', minWidth: 120,align: 'center'  },
    { id: 'amount', label: 'Amount', minWidth: 100,align: 'center'  },
    { id: 'status', label: 'Status', minWidth: 100,align: 'center'  }
  ];

  const rows = salesApprovedRefunds.salesApprovedRefunds || [];

  const mappedData = rows.map(row => ({
    name: row.name,
    requestId: row.requestId,
    orderId: row.orderId,
    amount: row.amount,
    status: row.status
  }));

  return (
    <>
      <InventoryNavbar/>
      <Container className='inv_inner_container' maxWidth="80%">
        <Box sx={{ my: 4, display: 'flex', flexDirection: 'column' }}>
          <Link to="/InventoryRefundRequestsTable">
            <Button
                startIcon={<BackArrow />}
                size="large"
                style={{ color: "black", fontWeight: 'bold', textTransform: "none" }}
                onClick={onBack} // onBack prop
                sx={{ width: '20%', mt: '2%', mb: '2%', ml:'-87.5%'}}
            >
              Approved Refunds
            </Button>
          </Link>
          <Paper elevation={4} >
            <CustomizedTable
                columns={columns}
                rows={mappedData}
            />
          </Paper>
        </Box>
      </Container>
      <Footer/>
    </>
  );
};

export default SalesApprovedRefundsTable;
