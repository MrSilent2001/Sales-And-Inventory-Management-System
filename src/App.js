import './App.css';
import CustomerNavbar from "./layout/navbar/Customer navbar/Customer navbar";
import Footer from "./layout/footer/footer";
import CustomerRefundRequest from "./pages/Customer/Refund/Customer Refund Request";

function App() {
  return (
    <div className="App">
        <CustomerNavbar></CustomerNavbar>
        <CustomerRefundRequest></CustomerRefundRequest>
        <Footer></Footer>
    </div>
  );
}

export default App;
