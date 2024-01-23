import './App.css';
import Navbar from "./layout/navbar/navbar";
import Footer from "./layout/footer/footer";
import ViewInventory from "./pages/view inventory page/viewInventory";
import CustomizedTables from "./pages/table";

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
