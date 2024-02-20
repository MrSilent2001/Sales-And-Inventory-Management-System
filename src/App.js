import './App.css';
import GeneratedRequest from './pages/Admin_Inventory/generatedRequest/generatedRequest';
import Navbar from "./layout/navbar/navbar";
import Footer from "./layout/footer/footer";
import RefundsManager from './pages/Admin_Inventory/RefundRequestsTable/RefundsManager';
import CustomerRefundRequest from './pages/Admin_Inventory/InventoryRefundRequest/InventoryRefundRequest';
function App() {
  return (
    <div className="App">
        <Navbar></Navbar>
        <GeneratedRequest/>
        <Footer></Footer>

    </div>
  );
}

export default App;
