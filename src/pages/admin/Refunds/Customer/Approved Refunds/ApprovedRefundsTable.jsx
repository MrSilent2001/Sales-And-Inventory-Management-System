import React from 'react';
import { Container, Box, Paper } from '@mui/material';
import './ApprovedRefundsTable.css';
import SalesNavbar from "../../../../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../../../../layout/footer/footer";
import {Link} from "react-router-dom";
import BackArrow from "../../../../../components/Icons/backArrow";
import approvedRefunds from "../../../../../data/data.json";
import CustomizedTable from "../../../../../components/Table/Customized Table/customizedTable";

const ApprovedRefundsTable = ({ onBack }) => {

  const columns=[
    { id: 'name', label: 'Name', minWidth: 70,align: 'center'  },
    { id: 'requestId', label: 'Request Id', minWidth: 150,align: 'center'  },
    { id: 'orderId', label: 'order Id', minWidth: 120,align: 'center'  },
    { id: 'amount', label: 'Amount', minWidth: 100,align: 'center'  },
    { id: 'date', label: 'Date', minWidth: 100,align: 'center'  }
  ];

  const  rows = approvedRefunds.approvedRefunds || [];

  const mappedData = rows.map(row => ({
    name: row.name,
    requestId: row.requestId,
    orderId: row.orderId,
    amount: row.amount,
    date: row.date
  }));

  return (
      <>
        <SalesNavbar/>
        <Container className='inner_container' maxWidth="90%">
          <Box sx={{pt: 4, display: 'flex', flexDirection: 'column' }}>
            <div style={{display: 'flex',alignItems: 'flex-start', padding: '0.65em 0 0.65em 0', marginTop: '2em 0'}}>

              <Link to="/viewRefundRequests">
                <BackArrow
                    onClick={onBack}
                    style={{marginTop: '-0.1em'}}
                />
              </Link>
              <span style={{fontWeight: "bold", }}>Refund Request</span>
            </div>

            <Paper elevation={4}>
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

export default ApprovedRefundsTable;
