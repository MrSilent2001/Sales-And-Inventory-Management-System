import './App.css';
import GeneratedRequest from './pages/generatedRequest/generatedRequest';
import Navbar from "./layout/navbar/navbar";
import Footer from "./layout/footer/footer";
import RefundsManager from './pages/admin/Sales/RefundsManager';
import RefundRequestForm from './pages/refundRequest/refundRequest';
import CustomerRefundRequest from './pages/CustomerRefundRequest/CustomerRefundRequest';
function App() {
  return (
    <div className="App">
        <Navbar></Navbar>
        <RefundsManager/>
        <Footer></Footer>

    </div>
  );
}

export default App;
