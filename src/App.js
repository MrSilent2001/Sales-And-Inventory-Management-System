import './App.css';
import Footer from "./layout/footer/footer";
import ViewInventory from "./pages/Inventory/View Inventory Page/viewInventory";
import InventoryNavbar from "./layout/navbar/Inventory navbar/Inventory navbar";

function App() {
  return (
    <div className="App">
        <InventoryNavbar></InventoryNavbar>
        <ViewInventory></ViewInventory>
        <Footer></Footer>
    </div>
  );
}

export default App;
