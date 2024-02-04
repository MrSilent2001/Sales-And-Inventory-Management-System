import './App.css';
import Footer from "./layout/footer/footer";
import ViewInventory from "./pages/Inventory/View Inventory Page/viewInventory";;
import CustomerNavbar from "./layout/navbar/Customer navbar/Customer navbar";

function App() {
  return (
    <div className="App">
        <CustomerNavbar></CustomerNavbar>
        <ViewInventory></ViewInventory>
        <Footer></Footer>
    </div>
  );
}

export default App;
