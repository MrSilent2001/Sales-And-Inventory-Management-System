import './App.css';
import Navbar from "./layout/navbar/navbar";
import PaymentDashboard from "./pages/payment Dashboard/paymentDashboard";

function App() {
  return (
    <div className="App">
        <Navbar></Navbar>
        <PaymentDashboard/>
    </div>
  );
}

export default App;
