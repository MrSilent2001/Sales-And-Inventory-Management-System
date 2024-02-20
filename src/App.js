import './App.css';
import GeneratedRequest from './pages/Admin_Inventory/generatedRequest/generatedRequest';
import Navbar from "./layout/navbar/navbar";
import Footer from "./layout/footer/footer";
import RefundsManager from './pages/Admin_Inventory/RefundRequestsTable/RefundsManager';
import CustomerRefundRequest from './pages/Admin_Inventory/InventoryRefundRequest/InventoryRefundRequest';
import SalesRefundsManager from './pages/Admin_Sales/Sales_RefundRequestTable/SalesRefundsManager';
import SalesViewRequest from './pages/Admin_Sales/Sales_ViewRequest/SalesViewRequest';
import RefundDenialForm from './pages/Admin_Sales/Sales_RefundDenialForm/RefundDenialForm';
function App() {
  return (
    <div className="App">
        <Navbar></Navbar>
        <RefundDenialForm/>
        <Footer></Footer>

    </div>
  );
}

export default App;
