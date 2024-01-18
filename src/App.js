import './App.css';
import Navbar from "./layout/navbar/navbar";
import PaymentDashboard from "./pages/payment Dashboard/paymentDashboard";
import DiscountDashboard from "./pages/discount Dashboard/discountDashboard";

function App() {
  return (
    <div className="App">
        <Navbar></Navbar>
        <DiscountDashboard/>
    </div>
  );
}

export default App;
