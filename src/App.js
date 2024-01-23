import './App.css';
import Navbar from "./layout/navbar/navbar";
import Footer from "./layout/footer/footer";
import ViewInventory from "./pages/view inventory page/viewInventory";
import CustomizedTables from "./pages/table";
import AddItem from "./pages/view inventory page/Models/Add Item/Add Item";

function App() {
  return (
    <div className="App">
        <Navbar></Navbar>
        <AddItem></AddItem>
        <Footer></Footer>
    </div>
  );
}

export default App;
