import './App.css';
import CustomerNavbar from "./layout/navbar/Customer navbar/Customer navbar";
import Footer from "./layout/footer/footer";
import GeneratedCustomerRefundRequest from "./pages/Customer/Refund/Generated Customer Refund Request";

function App() {
  return (
    <div className="App">
        <CustomerNavbar></CustomerNavbar>
        <GeneratedCustomerRefundRequest></GeneratedCustomerRefundRequest>
        <Footer></Footer>
    </div>
  );
}

export default App;
