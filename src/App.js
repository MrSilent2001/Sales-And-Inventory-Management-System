import './App.css';
import GeneratedRequest from './pages/Admin_Inventory/Refund/generatedRequest/generatedRequest';
import Navbar from "./layout/navbar/navbar";
import Footer from "./layout/footer/footer";
import RefundsManager from './pages/Admin_Inventory/Refund/RefundRequestsTable/RefundsManager';
import SalesRefundsManager from './pages/Admin_Sales/Sales_RefundRequestTable/SalesRefundsManager';
import SalesViewRequest from './pages/Admin_Sales/Sales_ViewRequest/SalesViewRequest';
import PurchaseOrderDashboard from './pages/Admin_Inventory/purchaseorders/PurchaseOrderDashboard';
import PlaceOrder from './pages/Admin_Inventory/purchaseorders/PlaceOrder/PlaceOrder';
import RefundDenialForm from './pages/Admin_Sales/Sales_RefundDenialForm/RefundDenialForm';
import InventoryRefundRequest from './pages/Admin_Inventory/Refund/InventoryRefundRequest/InventoryRefundRequest';
function App() {
  return (
    <div className="App">
        <Navbar></Navbar>
        <PlaceOrder/>
        <Footer></Footer>

    </div>
  );
}

export default App;
