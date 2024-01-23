import './App.css';
import Navbar from "./layout/navbar/navbar";
import AddDistcounts from "./pages/add Discounts/AddDistcounts";
import AddSupplier from "./pages/add Supplier/addSupplier";
import InventoryLanding from "./pages/inventory landing page/inventoryLanding";
import UpdateSupplier from "./pages/update Supplier/updateSupplier";
import DiscountDashboard from "./pages/discount Dashboard/discountDashboard";

function App() {
  return (
    <div className="App">
        <Navbar/>
        <UpdateSupplier/>
    </div>
  );
}

export default App;
