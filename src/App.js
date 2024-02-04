import './App.css';
import Navbar from "./layout/navbar/Inventory navbar/navbar";
import Footer from "./layout/footer/footer";
import ViewInventory from "./pages/Inventory/View Inventory Page/viewInventory";

function App() {
  return (
    <div className="App">
        <Navbar></Navbar>
        <ViewInventory></ViewInventory>
        <Footer></Footer>
    </div>
  );
}

export default App;
