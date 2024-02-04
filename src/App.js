import './App.css';
import Navbar from "./layout/navbar/navbar";
import UpdateSupplier from "./pages/update Supplier/updateSupplier";
import Footer from "./layout/footer/footer";
import PaymentDashboard from "./pages/payment Dashboard/paymentDashboard";
import InventoryLanding from "./pages/inventory landing page/inventoryLanding";
import DiscountDashboard from "./pages/discount Dashboard/discountDashboard";
import AddSupplier from "./pages/add Supplier/addSupplier";

function App() {
  return (
    <div className="App">
        <Navbar/>
        <AddSupplier/>
        <Footer/>
    </div>
  );
}

export default App;
