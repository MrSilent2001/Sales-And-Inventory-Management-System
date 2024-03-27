import React, {useState} from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  TableContainer,
  Paper,
  Modal
} from '@mui/material';
import ReusableTable from '../../../../components/Reusable Table/Reusable Table';
import InventoryNavbar from "../../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../../layout/footer/footer";
import PlaceOrder from "../../../Orders/Inventory/Modals/Place Order/placeOrder";
import ViewOrder from "../../../Orders/Inventory/Modals/View Order/viewOrder";

const PurchaseOrderDashboard = () => {

  const [placeOrderVisible, setPlaceOrderVisible] = useState(false);
  const [viewOrderVisible, setViewOrderVisible] = useState(false);


  // Sample data array
  const tableData = [
    { supplierId: 'S0001', address: 'xxxxxxxxxxxxxx', email: 'xxxx@gmail.com', contact: '0771112223', category: 'Primary', actions: 'View/Cancel' },
    { supplierId: 'S0001', address: 'xxxxxxxxxxxxxx', email: 'xxxx@gmail.com', contact: '0771112223', category: 'Primary', actions: 'View/Cancel' },
    { supplierId: 'S0001', address: 'xxxxxxxxxxxxxx', email: 'xxxx@gmail.com', contact: '0771112223', category: 'Primary', actions: 'View/Cancel' },
    { supplierId: 'S0001', address: 'xxxxxxxxxxxxxx', email: 'xxxx@gmail.com', contact: '0771112223', category: 'Primary', actions: 'View/Cancel' },
    { supplierId: 'S0001', address: 'xxxxxxxxxxxxxx', email: 'xxxx@gmail.com', contact: '0771112223', category: 'Primary', actions: 'View/Cancel' },
    { supplierId: 'S0001', address: 'xxxxxxxxxxxxxx', email: 'xxxx@gmail.com', contact: '0771112223', category: 'Primary', actions: 'View/Cancel' },
    { supplierId: 'S0001', address: 'xxxxxxxxxxxxxx', email: 'xxxx@gmail.com', contact: '0771112223', category: 'Primary', actions: 'View/Cancel' },
    { supplierId: 'S0001', address: 'xxxxxxxxxxxxxx', email: 'xxxx@gmail.com', contact: '0771112223', category: 'Primary', actions: 'View/Cancel' },
    { supplierId: 'S0001', address: 'xxxxxxxxxxxxxx', email: 'xxxx@gmail.com', contact: '0771112223', category: 'Primary', actions: 'View/Cancel' },
    // ... more data objects
  ];

  // Map your data to the format ReusableTable expects
  const mappedData = tableData.map(item => ({
    supplierId: item.supplierId,
    address: item.address,
    email: item.email,
    contact: item.contact,
    category: item.category,
    actions: (
      <>
        <Button variant="outlined" color="primary"  onClick={() => setViewOrderVisible(true)}  sx={{ mr: 1 }}>
          View
        </Button>
        <Button variant="outlined" color="secondary" onClick={()=>{alert("Order Cancelled")}}>
          Cancel
        </Button>
      </>
    )
  }));


  return (
      <>
        <InventoryNavbar/>
        <Box sx={{ display: 'flex', height: '100vh' }}>
          {/* Sidebar */}
          <Box sx={{ width: '15%',height:'auto', bgcolor: '#646FD4', color: 'white', p: 2 }}>
            <Button variant="contained" onClick={() => setPlaceOrderVisible(true)} sx={{ width: '100%', mt:12,mb: 2, bgcolor: 'green', '&:hover': { bgcolor: 'green.700' } }}>
              Place Order
            </Button>
            <Card sx={{ mb: 2, bgcolor: '#B4D4FF', color: 'black', p:1}}>
              <CardContent>
                <Typography variant="subtitle1" sx={{color:'#E74646',fontWeight:'bold',mr:6}}>December</Typography>
                <Typography variant="h6">Total Orders</Typography>
                <Typography variant="h6" sx={{textAlign:'center'}}>15</Typography>
              </CardContent>
            </Card>
            <Card sx={{ mb: 2, bgcolor: '#B4D4FF', color: 'black', p:1}}>
              <CardContent>
                <Typography variant="subtitle1" sx={{color:'#E74646',fontWeight:'bold',mr:6}}>December</Typography>
                <Typography variant="h6">In-Progress</Typography>
                <Typography variant="h6"sx={{textAlign:'center'}}>5</Typography>
              </CardContent>
            </Card>
            <Card sx={{ mb: 2, bgcolor: '#B4D4FF', color: 'black', p:1}}>
              <CardContent>
                <Typography variant="subtitle1" sx={{color:'#E74646',fontWeight:'bold',mr:6}}>December</Typography>
                <Typography variant="h6">Completed</Typography>
                <Typography variant="h6"sx={{textAlign:'center'}}>10</Typography>
              </CardContent>
            </Card>

            <Modal open={placeOrderVisible}>
              <PlaceOrder onClose={(value) => { setPlaceOrderVisible(false)}}/>
            </Modal>

          </Box>

          {/* Main Content */}
          <Container maxWidth="xl" sx={{ bgcolor: 'white', flexGrow: 1, p: 4 }}>
            <Box sx={{ mb: 4}}>
              <input type="text" placeholder="Search" style={{ padding: '10px', borderRadius: '20px', border: '1px solid #ccc', width: '17%'}} />
            </Box>
            <TableContainer component={Paper}>
              <ReusableTable data={mappedData} />
            </TableContainer>

            <Modal open={viewOrderVisible}>
              <ViewOrder onClose={(value) => { setViewOrderVisible(false)}}/>
            </Modal>

          </Container>
        </Box>
        <Footer/>
      </>

  );
};

export default PurchaseOrderDashboard;
