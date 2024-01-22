import './App.css';
import Navbar from "./layout/navbar/navbar";
import AddDistcounts from "./pages/add Discounts/AddDistcounts";
import AddSupplier from "./pages/add Supplier/addSupplier";
import InventoryLanding from "./pages/inventory landing page/inventoryLanding";

function App() {
  return (
    <div className="App">
        <Navbar></Navbar>
        <AddSupplier/>
    </div>
  );
}

export default App;
