import './App.css';
import GeneratedRequest from './pages/admin/Sales/generatedRequest/generatedRequest';
import Navbar from "./layout/navbar/navbar";
import Footer from "./layout/footer/footer";
import RefundsManager from './pages/admin/Sales/RefundsManager';
import CustomerRefundRequest from './pages/admin/Sales/InventoryRefundRequest/InventoryRefundRequest';
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
