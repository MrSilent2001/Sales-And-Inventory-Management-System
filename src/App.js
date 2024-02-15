import './App.css';
import CustomerNavbar from "./layout/navbar/Customer navbar/Customer navbar";
import CustomerRefunds from "./pages/Customer/Refund/Customer Refunds";
import Footer from "./layout/footer/footer";

function App() {
  return (
    <div className="App">
        <CustomerNavbar></CustomerNavbar>
        <CustomerRefunds></CustomerRefunds>
        <Footer></Footer>
    </div>
  );
}

export default App;
