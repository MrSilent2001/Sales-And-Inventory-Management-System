import './App.css';
import InventoryLanding from "./pages/inventory landing page/inventoryLanding";
import Navbar from "./layout/navbar/navbar";

function App() {
  return (
    <div className="App">
        <Navbar></Navbar>
      <InventoryLanding></InventoryLanding>
    </div>
  );
}

export default App;
