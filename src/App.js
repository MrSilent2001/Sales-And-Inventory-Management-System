import './App.css';
import InventoryLanding from "./pages/inventory landing page/inventoryLanding";
import Navbar from "./layout/navbar/navbar";
import Footer from "./layout/footer/footer";

function App() {
  return (
    <div className="App">
        <Navbar></Navbar>
        <InventoryLanding></InventoryLanding>
        <Footer></Footer>
    </div>
  );
}

export default App;
