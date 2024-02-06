import './App.css';
import Navbar from "./layout/navbar/navbar";
import Footer from "./layout/footer/footer";
import InventoryLanding from "./pages/inventory landing page/inventoryLanding";

function App() {
  return (
    <div className="App">
        <Navbar/>
        <InventoryLanding/>
        <Footer/>
    </div>
  );
}

export default App;
