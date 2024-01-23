import './App.css';
import Navbar from "./layout/navbar/navbar";
import PendingOrders from "./pages/Pending Orders/pendingOrders" ;
import Footer from './layout/footer/footer';

function App() {
  return (
    <div className="App">
        <Navbar/>
        <PendingOrders />
        <Footer/>
    </div>
  );
}

export default App;
