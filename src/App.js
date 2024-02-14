import './App.css';
import CustomerNavbar from "./layout/navbar/Customer navbar/Customer navbar";
import CustomerHome from "./pages/Customer/Home/Customer Home Page";

function App() {
  return (
    <div className="App">
        <CustomerNavbar></CustomerNavbar>
        <CustomerHome></CustomerHome>
    </div>
  );
}

export default App;
